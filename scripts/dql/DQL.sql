/* ============================================================
   TEAM 7 – MUSIC STREAMING PLATFORM
   DQL SCRIPT (Queries + PostgreSQL Functions)
   ============================================================ */

------------------------------------------------------------
-- 1. USER REGISTRATION VERIFICATION (recent users)
------------------------------------------------------------
SELECT user_id, name, email, created_at
FROM users
WHERE created_at >= CURRENT_DATE - INTERVAL '1 day';

------------------------------------------------------------
-- 2. USER PROFILE AND ENGAGEMENT REPORT
------------------------------------------------------------
SELECT u.user_id, u.name, u.email,
       COUNT(DISTINCT p.playlist_id) AS total_playlists,
       COUNT(DISTINCT l.song_id) AS total_liked_songs
FROM users u
LEFT JOIN playlists p ON u.user_id = p.user_id
LEFT JOIN likes l ON u.user_id = l.user_id
GROUP BY u.user_id, u.name, u.email
ORDER BY total_playlists DESC;

------------------------------------------------------------
-- 3. PLAYLIST CONTENTS DISPLAY
------------------------------------------------------------
SELECT pl.playlist_id, pl.title AS playlist_name,
       s.song_id, s.title AS song_title,
       a.name AS artist_name, ps.position
FROM playlists pl
JOIN playlist_songs ps ON pl.playlist_id = ps.playlist_id
JOIN songs s ON ps.song_id = s.song_id
JOIN artist_songs ars ON s.song_id = ars.song_id
JOIN artists a ON ars.artist_id = a.artist_id
WHERE pl.playlist_id = :playlist_id
ORDER BY ps.position;

------------------------------------------------------------
-- 4. ARTIST POPULARITY REPORT
------------------------------------------------------------
SELECT a.artist_id, a.name AS artist_name,
       s.song_id, s.title AS song_title,
       COUNT(lh.history_id) AS total_streams
FROM artists a
JOIN artist_songs ars ON a.artist_id = ars.artist_id
JOIN songs s ON ars.song_id = s.song_id
LEFT JOIN listening_histories lh ON s.song_id = lh.song_id
GROUP BY a.artist_id, a.name, s.song_id, s.title
ORDER BY a.name, total_streams DESC;

------------------------------------------------------------
-- 5. MOST PLAYED SONGS (DATE RANGE)
------------------------------------------------------------
SELECT s.song_id, s.title,
       COUNT(lh.history_id) AS total_plays,
       COUNT(DISTINCT lh.user_id) AS unique_listeners
FROM songs s
JOIN listening_histories lh ON s.song_id = lh.song_id
WHERE lh.streamed_at BETWEEN :start_date AND :end_date
GROUP BY s.song_id, s.title
ORDER BY total_plays DESC;

------------------------------------------------------------
-- 6. SONG COMPLETION RATE ANALYSIS
------------------------------------------------------------
SELECT s.song_id, s.title,
       ROUND(AVG(lh.duration_played::DECIMAL / s.duration), 2)
           AS avg_completion_rate
FROM songs s
JOIN listening_histories lh ON s.song_id = lh.song_id
GROUP BY s.song_id, s.title
ORDER BY avg_completion_rate DESC;

------------------------------------------------------------
-- 7. ADVERTISEMENT PERFORMANCE REPORT
------------------------------------------------------------
SELECT a.ad_id, a.title, a.target_audience,
       COUNT(asu.user_id) AS total_impressions,
       SUM(a.duration) * COUNT(asu.user_id) AS estimated_revenue
FROM advertisements a
LEFT JOIN ad_shown_to_users asu ON a.ad_id = asu.ad_id
GROUP BY a.ad_id, a.title, a.target_audience
ORDER BY total_impressions DESC;

------------------------------------------------------------
-- 8. SUBSCRIPTION OVERVIEW & REVENUE TRACKING
------------------------------------------------------------
SELECT plan_type,
       COUNT(subscription_id) AS total_subscriptions,
       COUNT(CASE WHEN status = 'Active' THEN 1 END) AS active_subscriptions
FROM subscriptions
GROUP BY plan_type;

------------------------------------------------------------
-- 9. ARTIST COLLABORATION INSIGHTS
------------------------------------------------------------
SELECT s.song_id, s.title AS song_title,
       STRING_AGG(DISTINCT a.name, ', ') AS collaborating_artists
FROM songs s
JOIN artist_songs ars ON s.song_id = ars.song_id
JOIN artists a ON ars.artist_id = a.artist_id
GROUP BY s.song_id, s.title
HAVING COUNT(DISTINCT a.artist_id) > 1;

------------------------------------------------------------
-- 10. STAKEHOLDER CONTRIBUTION OVERVIEW
------------------------------------------------------------
SELECT st.name AS stakeholder_name, st.role,
       STRING_AGG(s.title, ', ') AS songs_contributed_to
FROM stakeholders st
JOIN song_stakeholders ss ON st.stakeholder_id = ss.stakeholder_id
JOIN songs s ON ss.song_id = s.song_id
GROUP BY st.name, st.role;

------------------------------------------------------------
-- 11. SONG RECOMMENDATIONS (GENRE-BASED)
------------------------------------------------------------
SELECT DISTINCT s2.song_id, s2.title, g.name AS genre
FROM likes l
JOIN songs s1 ON l.song_id = s1.song_id
JOIN song_genres sg1 ON s1.song_id = sg1.song_id
JOIN genres g ON sg1.genre_id = g.genre_id
JOIN song_genres sg2 ON sg2.genre_id = g.genre_id
JOIN songs s2 ON sg2.song_id = s2.song_id
WHERE l.user_id = :user_id
  AND s2.song_id NOT IN (
        SELECT song_id FROM likes WHERE user_id = :user_id
  );

------------------------------------------------------------
-- 12. CONTENT MANAGEMENT
------------------------------------------------------------
SELECT s.song_id, s.title
FROM songs s
LEFT JOIN albums a ON s.album_id = a.album_id
LEFT JOIN artist_songs ars ON s.song_id = ars.song_id
WHERE a.album_id IS NULL OR ars.artist_id IS NULL;

------------------------------------------------------------
-- 13. INACTIVE USER DETECTION
------------------------------------------------------------
SELECT u.user_id, u.name,
       MAX(lh.streamed_at) AS last_stream
FROM users u
LEFT JOIN listening_histories lh ON u.user_id = lh.user_id
GROUP BY u.user_id, u.name
HAVING MAX(lh.streamed_at) < (CURRENT_DATE - INTERVAL '90 days')
    OR MAX(lh.streamed_at) IS NULL;

------------------------------------------------------------
-- 14. GENRE POPULARITY ANALYSIS
------------------------------------------------------------
SELECT g.name AS genre_name,
       COUNT(lh.history_id) AS total_plays
FROM genres g
JOIN song_genres sg ON g.genre_id = sg.genre_id
JOIN listening_histories lh ON sg.song_id = lh.song_id
GROUP BY g.name
ORDER BY total_plays DESC;

------------------------------------------------------------
-- 15. AD TARGETING EFFECTIVENESS
------------------------------------------------------------
SELECT a.ad_id, a.title,
       COUNT(DISTINCT asu.user_id) AS reached_users
FROM advertisements a
JOIN ad_shown_to_users asu ON a.ad_id = asu.ad_id
JOIN users u ON asu.user_id = u.user_id
LEFT JOIN listening_histories lh ON u.user_id = lh.user_id
LEFT JOIN song_genres sg ON lh.song_id = sg.song_id
GROUP BY a.ad_id, a.title
ORDER BY reached_users DESC;

------------------------------------------------------------
-- 16. PLAYLIST POPULARITY & ENGAGEMENT
------------------------------------------------------------
SELECT p.playlist_id, p.title,
       COUNT(ps.song_id) AS total_songs,
       COUNT(lh.history_id) AS total_streams
FROM playlists p
JOIN playlist_songs ps ON p.playlist_id = ps.playlist_id
LEFT JOIN listening_histories lh ON ps.song_id = lh.song_id
GROUP BY p.playlist_id, p.title
ORDER BY total_streams DESC;

------------------------------------------------------------
-- 17. REVENUE BREAKDOWN BY ARTIST & GENRE
------------------------------------------------------------
SELECT a.name AS artist_name,
       g.name AS genre_name,
       COUNT(lh.history_id) AS total_streams
FROM listening_histories lh
JOIN songs s ON lh.song_id = s.song_id
JOIN artist_songs ars ON s.song_id = ars.song_id
JOIN artists a ON ars.artist_id = a.artist_id
JOIN song_genres sg ON s.song_id = sg.song_id
JOIN genres g ON sg.genre_id = g.genre_id
GROUP BY a.name, g.name
ORDER BY total_streams DESC;

------------------------------------------------------------
-- 18. FIND SUBSCRIPTIONS EXPIRING TODAY
------------------------------------------------------------
SELECT user_id, plan_type, end_date
FROM subscriptions
WHERE end_date::date = CURRENT_DATE
  AND status = 'Active';


/* ============================================================
   FUNCTIONS SECTION
   ============================================================ */

------------------------------------------------------------
-- REGISTER USER
------------------------------------------------------------
CREATE OR REPLACE FUNCTION register_user(
    p_name VARCHAR,
    p_email VARCHAR,
    p_password_hash VARCHAR,
    p_birth_date DATE DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    new_user_id INT;
BEGIN
    INSERT INTO users(name, email, password_hash, birth_date)
    VALUES (p_name, p_email, p_password_hash, p_birth_date)
    RETURNING user_id INTO new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------
-- MOST PLAYED SONGS (DATE RANGE)
------------------------------------------------------------
CREATE OR REPLACE FUNCTION most_played_songs(
    p_start TIMESTAMP,
    p_end TIMESTAMP
)
RETURNS TABLE(
    song_id INT,
    title VARCHAR,
    total_plays INT,
    unique_listeners INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.song_id, s.title,
           COUNT(lh.history_id) AS total_plays,
           COUNT(DISTINCT lh.user_id) AS unique_listeners
    FROM songs s
    JOIN listening_histories lh ON s.song_id = lh.song_id
    WHERE lh.streamed_at BETWEEN p_start AND p_end
    GROUP BY s.song_id, s.title
    ORDER BY total_plays DESC;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------
-- GENRE-BASED SONG RECOMMENDATIONS
------------------------------------------------------------
CREATE OR REPLACE FUNCTION recommend_songs_for_user(
    p_user_id INT
)
RETURNS TABLE(song_id INT, title VARCHAR, genre VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT s2.song_id, s2.title, g.name
    FROM likes l
    JOIN songs s1 ON l.song_id = s1.song_id
    JOIN song_genres sg1 ON s1.song_id = sg1.song_id
    JOIN genres g ON sg1.genre_id = g.genre_id
    JOIN song_genres sg2 ON g.genre_id = sg2.genre_id
    JOIN songs s2 ON sg2.song_id = s2.song_id
    WHERE l.user_id = p_user_id
      AND s2.song_id NOT IN (
            SELECT song_id FROM likes WHERE user_id = p_user_id
      );
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------
-- POPULAR SONGS FOR ARTIST
------------------------------------------------------------
CREATE OR REPLACE FUNCTION artist_popular_songs(p_artist_id INT)
RETURNS TABLE(song_id INT, title VARCHAR, total_streams INT) AS $$
BEGIN
    RETURN QUERY
    SELECT s.song_id, s.title,
           COUNT(lh.history_id)
    FROM songs s
    JOIN artist_songs ars ON s.song_id = ars.song_id
    LEFT JOIN listening_histories lh ON lh.song_id = s.song_id
    WHERE ars.artist_id = p_artist_id
    GROUP BY s.song_id, s.title
    ORDER BY COUNT(lh.history_id) DESC;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------
-- INACTIVE USERS
------------------------------------------------------------
CREATE OR REPLACE FUNCTION inactive_users(p_days INT)
RETURNS TABLE(user_id INT, name VARCHAR, last_stream TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    SELECT u.user_id, u.name,
           MAX(lh.streamed_at) AS last_stream
    FROM users u
    LEFT JOIN listening_histories lh ON u.user_id = lh.user_id
    GROUP BY u.user_id, u.name
    HAVING MAX(lh.streamed_at) < (CURRENT_DATE - (p_days || ' days')::INTERVAL)
       OR MAX(lh.streamed_at) IS NULL;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------
-- SUBSCRIPTIONS EXPIRING TODAY
------------------------------------------------------------
CREATE OR REPLACE FUNCTION expiring_subscriptions()
RETURNS TABLE(user_id INT, plan_type VARCHAR, end_date DATE) AS $$
BEGIN
    RETURN QUERY
    SELECT user_id, plan_type, end_date
    FROM subscriptions
    WHERE end_date::date = CURRENT_DATE
      AND status = 'Active';
END;
$$ LANGUAGE plpgsql;
------------------------------------------------------------
-- 1. BASE TABLES
------------------------------------------------------------

-- ARTISTS 
INSERT INTO "artists" ("name", "bio", "country", "debut_year", "profile_image_url")
VALUES
('Aurora Echo', 'Indie pop band known for dreamy synths and emotional lyrics.', 'USA', 2015, 'https://example.com/images/aurora_echo.jpg'),
('Neon Pulse', 'Electronic duo producing upbeat synthwave and EDM tracks.', 'UK', 2018, 'https://example.com/images/neon_pulse.jpg'),
('Midnight Lo-fi', 'Producer focused on chill lo-fi beats for studying and relaxing.', 'Japan', 2020, 'https://example.com/images/midnight_lofi.jpg'),
('Global Beats Collective', 'International group blending hip-hop, pop, and world music.', 'Germany', 2012, 'https://example.com/images/global_beats.jpg'),
('Skyline Stories', 'Indie band inspired by city life and rooftops.', 'Canada', 2017, 'https://example.com/images/skyline_stories.jpg'),
('Desert Bloom', 'Alternative rock band with desert vibes.', 'Australia', 2014, 'https://example.com/images/desert_bloom.jpg'),
('Ocean Drive', 'Producer duo making coastal electronic tracks.', 'Portugal', 2019, 'https://example.com/images/ocean_drive.jpg'),
('Retro Waves', '80s-inspired synth-pop project.', 'France', 2011, 'https://example.com/images/retro_waves.jpg');

-- GENRES 
INSERT INTO "genres" ("name", "description")
VALUES
('Pop', 'Popular mainstream music with catchy melodies.'),
('Rock', 'Guitar-driven music with strong rhythms.'),
('Electronic', 'Music produced primarily using electronic instruments.'),
('Hip-Hop', 'Rhythmic music with rapping and beats.'),
('Lo-fi', 'Low-fidelity, chill and relaxed music for focus and study.'),
('Jazz', 'Improvisational music with complex harmonies.'),
('Acoustic', 'Unplugged, stripped-down sound.'),
('Indie', 'Independent, alternative styles across genres.');

-- STAKEHOLDERS 
INSERT INTO "stakeholders" ("name", "role", "country", "bio")
VALUES
('Alice Rivers', 'singer', 'USA', 'Vocalist with a background in pop and R&B.'),
('Ben Carter', 'composer', 'Canada', 'Composer specializing in cinematic and pop music.'),
('Carla Gomez', 'producer', 'Spain', 'Music producer focusing on electronic and dance tracks.'),
('Daniel Lee', 'songwriter', 'South Korea', 'Songwriter known for catchy hooks and emotional lyrics.'),
('Elena Novak', 'engineer', 'Germany', 'Audio engineer with experience in mixing and mastering.');

-- ADVERTISEMENTS 
INSERT INTO "advertisements" ("title", "content", "duration", "target_audience", "start_date", "end_date")
VALUES
('Premium Upgrade', 'Go ad-free and download songs for offline listening.', 30, 'Free users', '2024-01-01', '2024-12-31'),
('Family Plan Offer', 'Get up to 6 accounts with one subscription.', 25, 'Existing premium users', '2024-03-01', NULL),
('New Headphones', 'Experience your music with high-fidelity wireless headphones.', 20, 'Music enthusiasts', '2024-02-10', '2024-08-10');

-- USERS 
INSERT INTO "users" ("name", "email", "password_hash", "role", "birth_date", "profile_image_url", "is_verified")
VALUES
('Emma Johnson', 'emma@example.com', 'hashed_password_1', 'user', '2000-05-14', 'https://example.com/avatars/emma.jpg', TRUE),
('Liam Brown', 'liam@example.com', 'hashed_password_2', 'user', '1998-11-02', 'https://example.com/avatars/liam.jpg', FALSE),
('Sofia Martinez', 'sofia@example.com', 'hashed_password_3', 'user', '1995-03-22', 'https://example.com/avatars/sofia.jpg', TRUE),
('Noah Kim', 'noah@example.com', 'hashed_password_4', 'user', '1999-07-30', 'https://example.com/avatars/noah.jpg', TRUE),
('Ava Rossi', 'ava@example.com', 'hashed_password_5', 'user', '2001-09-10', 'https://example.com/avatars/ava.jpg', FALSE),
('Admin User', 'admin@example.com', 'hashed_password_admin', 'admin', '1990-01-01', NULL, TRUE);

------------------------------------------------------------
-- 2. DEPENDENT TABLES
------------------------------------------------------------

-- ALBUMS 
INSERT INTO "albums" ("title", "artist_id", "release_date", "cover_image_url")
VALUES
('City Lights', 1, '2021-09-10', 'https://example.com/covers/city_lights.jpg'),           -- 1
('Acoustic Sessions', 1, '2019-03-05', 'https://example.com/covers/acoustic_sessions.jpg'), -- 2
('Night Drive', 2, '2022-06-01', 'https://example.com/covers/night_drive.jpg'),             -- 3
('Neon Dreams', 2, '2023-02-14', 'https://example.com/covers/neon_dreams.jpg'),             -- 4
('Lo-fi Study Sessions', 3, '2023-01-15', 'https://example.com/covers/lofi_study.jpg'),     -- 5
('Rainy Evenings', 3, '2023-10-01', 'https://example.com/covers/rainy_evenings.jpg'),       -- 6
('Global Party', 4, '2020-07-20', 'https://example.com/covers/global_party.jpg'),           -- 7
('World Tapes', 4, '2021-04-11', 'https://example.com/covers/world_tapes.jpg'),             -- 8
('Skyline Stories Vol.1', 5, '2022-09-09', 'https://example.com/covers/skyline_vol1.jpg'),  -- 9
('Desert Roads', 6, '2021-06-21', 'https://example.com/covers/desert_roads.jpg'),           -- 10
('Ocean Drive EP', 7, '2022-05-05', 'https://example.com/covers/ocean_drive_ep.jpg'),       -- 11
('Retro Night', 8, '2020-11-11', 'https://example.com/covers/retro_night.jpg');             -- 12

-- SONGS 
INSERT INTO "songs" ("title", "album_id", "duration", "release_date", "language", "lyrics")
VALUES
-- City Lights (album_id = 1)
('Intro (City Lights)', 1, 120, '2021-09-10', 'English', NULL),
('City Lights', 1, 215, '2021-09-10', 'English', 'Lyrics for City Lights...'),
('Downtown Echoes', 1, 205, '2021-09-10', 'English', 'Lyrics for Downtown Echoes...'),
('Midnight Windows', 1, 198, '2021-09-10', 'English', 'Lyrics for Midnight Windows...'),

-- Acoustic Sessions (album_id = 2)
('Quiet Morning', 2, 210, '2019-03-05', 'English', 'Lyrics for Quiet Morning...'),
('Unplugged Dreams', 2, 195, '2019-03-05', 'English', 'Lyrics for Unplugged Dreams...'),
('Living Room Sessions', 2, 220, '2019-03-05', 'English', NULL),
('Soft Echo', 2, 200, '2019-03-05', 'English', 'Lyrics for Soft Echo...'),

-- Night Drive (album_id = 3)
('Midnight Streets', 3, 200, '2022-06-01', 'English', 'Lyrics for Midnight Streets...'),
('Neon Highway', 3, 230, '2022-06-01', 'English', 'Lyrics for Neon Highway...'),
('Late Night Walk', 3, 205, '2022-06-01', 'English', 'Lyrics for Late Night Walk...'),
('Afterhours Drive', 3, 215, '2022-06-01', 'English', 'Lyrics for Afterhours Drive...'),

-- Neon Dreams (album_id = 4)
('City Neon', 4, 210, '2023-02-14', 'English', 'Lyrics for City Neon...'),
('Pixel Heart', 4, 190, '2023-02-14', 'English', 'Lyrics for Pixel Heart...'),
('Arcade Nights', 4, 225, '2023-02-14', 'English', 'Lyrics for Arcade Nights...'),
('Synthwave Skyline', 4, 240, '2023-02-14', 'English', 'Lyrics for Synthwave Skyline...'),

-- Lo-fi Study Sessions (album_id = 5)
('Rainy Window', 5, 180, '2023-01-15', 'Instrumental', NULL),
('Coffee Break', 5, 190, '2023-01-15', 'Instrumental', NULL),
('Study Flow', 5, 175, '2023-01-15', 'Instrumental', NULL),
('Notebook Pages', 5, 185, '2023-01-15', 'Instrumental', NULL),

-- Rainy Evenings (album_id = 6)
('Umbrella Lights', 6, 178, '2023-10-01', 'Instrumental', NULL),
('Street Reflections', 6, 188, '2023-10-01', 'Instrumental', NULL),
('Late Night Tram', 6, 192, '2023-10-01', 'Instrumental', NULL),
('City in the Rain', 6, 200, '2023-10-01', 'Instrumental', NULL),

-- Global Party (album_id = 7)
('Around the World', 7, 240, '2020-07-20', 'English', 'Lyrics for Around the World...'),
('Festival Night', 7, 260, '2020-07-20', 'English', 'Lyrics for Festival Night...'),
('Global Anthem', 7, 250, '2020-07-20', 'English', 'Lyrics for Global Anthem...'),
('City Parade', 7, 230, '2020-07-20', 'English', 'Lyrics for City Parade...'),

-- World Tapes (album_id = 8)
('Desert Sunrise', 8, 225, '2021-04-11', 'English', 'Lyrics for Desert Sunrise...'),
('Mountain Train', 8, 215, '2021-04-11', 'English', 'Lyrics for Mountain Train...'),
('Harbor Lights', 8, 210, '2021-04-11', 'English', 'Lyrics for Harbor Lights...'),
('Foreign Skies', 8, 235, '2021-04-11', 'English', 'Lyrics for Foreign Skies...'),

-- Skyline Stories Vol.1 (album_id = 9)
('Rooftop Stories', 9, 205, '2022-09-09', 'English', 'Lyrics for Rooftop Stories...'),
('Skyline at Dawn', 9, 215, '2022-09-09', 'English', 'Lyrics for Skyline at Dawn...'),
('City Sketches', 9, 198, '2022-09-09', 'English', 'Lyrics for City Sketches...'),
('Elevator Music', 9, 190, '2022-09-09', 'Instrumental', NULL),

-- Desert Roads (album_id = 10)
('Dusty Roads', 10, 230, '2021-06-21', 'English', 'Lyrics for Dusty Roads...'),
('Campfire Stories', 10, 220, '2021-06-21', 'English', 'Lyrics for Campfire Stories...'),
('Endless Highway', 10, 240, '2021-06-21', 'English', 'Lyrics for Endless Highway...'),
('Night in the Desert', 10, 250, '2021-06-21', 'English', 'Lyrics for Night in the Desert...'),

-- Ocean Drive EP (album_id = 11)
('Seaside Drive', 11, 210, '2022-05-05', 'English', 'Lyrics for Seaside Drive...'),
('Boardwalk Lights', 11, 205, '2022-05-05', 'English', 'Lyrics for Boardwalk Lights...'),

-- Retro Night (album_id = 12)
('Retro Intro', 12, 130, '2020-11-11', 'English', NULL),
('Cassette Dreams', 12, 220, '2020-11-11', 'English', 'Lyrics for Cassette Dreams...'),

-- Singles (no album)
('Single: Midnight Message', NULL, 210, '2024-01-01', 'English', 'Lyrics for Single: Midnight Message...'),
('Single: Ocean Air', NULL, 200, '2024-01-15', 'English', 'Lyrics for Single: Ocean Air...'),
('Single: Lo-fi Break', NULL, 180, '2024-02-01', 'Instrumental', NULL),
('Single: Rooftop Rain', NULL, 190, '2024-02-10', 'English', 'Lyrics for Single: Rooftop Rain...'),
('Single: City Bicycle', NULL, 175, '2024-02-20', 'English', 'Lyrics for Single: City Bicycle...'),
('Single: Night Bus Home', NULL, 220, '2024-03-01', 'English', 'Lyrics for Single: Night Bus Home...');


-- PLAYLISTS 
INSERT INTO "playlists" ("user_id", "title", "description", "is_public")
VALUES
(1, 'Focus Mode', 'Lo-fi and chill tracks for deep work.', TRUE),             -- 1
(2, 'Workout Mix', 'High-energy songs for the gym.', TRUE),                   -- 2
(3, 'Party Starters', 'Upbeat songs to start the party.', FALSE),             -- 3
(4, 'Night Drive Playlist', 'Electronic tracks for late-night driving.', TRUE), -- 4
(5, 'Chill Evenings', 'Relaxed songs for evenings.', TRUE);                   -- 5

-- SUBSCRIPTIONS 
INSERT INTO "subscriptions" ("user_id", "plan_type", "start_date", "end_date", "status")
VALUES
-- base ones
(1, 'Premium', '2024-02-01 10:00:00', NULL, 'Active'),
(2, 'Free', '2023-10-01 09:00:00', NULL, 'Active'),
(3, 'Family', '2023-01-15 12:00:00', '2024-06-01 12:00:00', 'Paused'),
(4, 'Premium', '2023-05-01 08:30:00', NULL, 'Active'),
(5, 'Free', '2022-11-20 15:00:00', NULL, 'Active'),
(6, 'Premium', '2022-05-01 08:30:00', '2023-05-01 08:30:00', 'Cancelled'),

-- Active ending TODAY
(1, 'Premium', now() - interval '29 days', CURRENT_DATE, 'Active'),
(3, 'Family',  now() - interval '1 month', CURRENT_DATE, 'Active'),
(5, 'Free',    now() - interval '14 days', CURRENT_DATE, 'Active'),

-- Active ending soon
(2, 'Premium', now() - interval '20 days', CURRENT_DATE + interval '3 days', 'Active'),
(4, 'Premium', now() - interval '1 month', CURRENT_DATE + interval '5 days', 'Active'),

-- Paused
(6, 'Family',  now() - interval '3 months', CURRENT_DATE - interval '10 days', 'Paused'),
(3, 'Free',    now() - interval '6 months', CURRENT_DATE - interval '30 days', 'Paused'),

-- Cancelled
(2, 'Family',  now() - interval '2 months', CURRENT_DATE - interval '20 days', 'Cancelled'),
(5, 'Premium', now() - interval '1 year',   CURRENT_DATE - interval '300 days', 'Cancelled');

------------------------------------------------------------
-- 3. JUNCTION & OTHER TABLES
------------------------------------------------------------

-- ARTIST_SONGS
INSERT INTO "artist_songs" ("song_id", "artist_id", "role")
VALUES
-- Aurora Echo (1) – songs 1–8
(1, 1, 'main'), (2, 1, 'main'), (3, 1, 'main'), (4, 1, 'main'),
(5, 1, 'main'), (6, 1, 'main'), (7, 1, 'main'), (8, 1, 'main'),

-- Neon Pulse (2) – songs 9–16
(9, 2, 'main'), (10, 2, 'main'), (11, 2, 'main'), (12, 2, 'main'),
(13, 2, 'main'), (14, 2, 'main'), (15, 2, 'main'), (16, 2, 'main'),

-- Midnight Lo-fi (3) – songs 17–24
(17, 3, 'main'), (18, 3, 'main'), (19, 3, 'main'), (20, 3, 'main'),
(21, 3, 'main'), (22, 3, 'main'), (23, 3, 'main'), (24, 3, 'main'),

-- Global Beats Collective (4) – songs 25–32
(25, 4, 'main'), (26, 4, 'main'), (27, 4, 'main'), (28, 4, 'main'),
(29, 4, 'main'), (30, 4, 'main'), (31, 4, 'main'), (32, 4, 'main'),

-- Skyline Stories (5) – songs 33–36
(33, 5, 'main'), (34, 5, 'main'), (35, 5, 'main'), (36, 5, 'main'),

-- Desert Bloom (6) – songs 37–40
(37, 6, 'main'), (38, 6, 'main'), (39, 6, 'main'), (40, 6, 'main'),

-- Ocean Drive (7) – songs 41–42
(41, 7, 'main'), (42, 7, 'main'),

-- Retro Waves (8) – songs 43–44
(43, 8, 'main'), (44, 8, 'main'),

-- Singles assigned to artists
(45, 1, 'main'),
(46, 2, 'main'),
(47, 3, 'main'),
(48, 4, 'main'),
(49, 1, 'main'),
(50, 2, 'main'),

-- some featured collabs
(27, 2, 'featured'),
(31, 5, 'featured'),
(41, 4, 'featured'),
(48, 8, 'featured');

-- FOLLOWERS
INSERT INTO "followers" ("user_id", "artist_id", "followed_at")
VALUES
(1, 1, '2024-01-10 10:00:00'),
(1, 3, '2024-01-11 11:00:00'),
(1, 4, '2024-01-12 12:00:00'),
(2, 2, '2024-01-12 12:30:00'),
(2, 4, '2024-01-13 13:00:00'),
(3, 1, '2024-01-14 14:00:00'),
(3, 5, '2024-01-15 15:00:00'),
(4, 2, '2024-01-16 16:00:00'),
(4, 7, '2024-01-16 16:10:00'),
(5, 3, '2024-01-17 17:00:00'),
(5, 6, '2024-01-17 17:10:00'),
(6, 1, '2024-01-18 18:00:00');

-- SONG_GENRES
INSERT INTO "song_genres" ("song_id", "genre_id")
VALUES
-- City Lights (Pop)
(1, 1), (2, 1), (3, 1), (4, 1),
-- Acoustic Sessions (Acoustic)
(5, 7), (6, 7), (7, 7), (8, 7),
-- Night Drive (Electronic)
(9, 3), (10, 3), (11, 3), (12, 3),
-- Neon Dreams (Electronic)
(13, 3), (14, 3), (15, 3), (16, 3),
-- Lo-fi Study Sessions (Lo-fi)
(17, 5), (18, 5), (19, 5), (20, 5),
-- Rainy Evenings (Lo-fi)
(21, 5), (22, 5), (23, 5), (24, 5),
-- Global Party (Electronic)
(25, 3), (26, 3), (27, 3), (28, 3),
-- World Tapes (Indie)
(29, 8), (30, 8), (31, 8), (32, 8),
-- Skyline Stories (Indie/Pop/Jazzish)
(33, 8), (34, 1), (35, 8), (36, 6),
-- Desert Roads (Rock)
(37, 2), (38, 2), (39, 2), (40, 2),
-- Ocean Drive EP (Electronic)
(41, 3), (42, 3),
-- Retro Night (Electronic / synth-pop)
(43, 3), (44, 3),
-- Singles
(45, 1),  -- Midnight Message - Pop
(46, 3),  -- Ocean Air - Electronic
(47, 5),  -- Lo-fi Break - Lo-fi
(48, 8),  -- Rooftop Rain - Indie
(49, 1),  -- City Bicycle - Pop
(50, 3);  -- Night Bus Home - Electronic

-- ALBUM_GENRES
INSERT INTO "album_genres" ("album_id", "genre_id")
VALUES
(1, 1),
(2, 7),
(3, 3),
(4, 3),
(5, 5),
(6, 5),
(7, 3), 
(7, 4),
(8, 8),
(9, 8),
(10, 2),
(11, 3),
(12, 3);

-- SONG_STAKEHOLDERS
INSERT INTO "song_stakeholders" ("song_id", "stakeholder_id")
VALUES
-- vocal pop/electronic
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 2), (3, 3),
(4, 1), (4, 2), (4, 3),
(5, 1), (5, 2), (5, 3),
(6, 1), (6, 2), (6, 3),
(9, 1), (9, 2), (9, 3),
(10, 1), (10, 2), (10, 3),
(13, 1), (13, 2), (13, 3),
(14, 1), (14, 2), (14, 3),
(15, 1), (15, 2), (15, 3),
(25, 1), (25, 2), (25, 3),
(26, 1), (26, 2), (26, 3),
(27, 1), (27, 2), (27, 3),

-- lo-fi / instrumental
(17, 2), (17, 3), (17, 5),
(18, 2), (18, 3), (18, 5),
(19, 2), (19, 3), (19, 5),
(20, 2), (20, 3), (20, 5),
(21, 2), (21, 3), (21, 5),
(22, 2), (22, 3), (22, 5),
(36, 2), (36, 3), (36, 5),
(47, 2), (47, 3), (47, 5);

-- 3.6 LIKES
INSERT INTO "likes" ("user_id", "song_id", "liked_at")
VALUES
(1, 19, '2024-03-01 12:05:00'),
(1, 20, '2024-03-01 12:10:00'),
(1, 33, '2024-03-02 09:05:00'),
(2, 9,  '2024-03-02 18:20:00'),
(2, 10, '2024-03-02 18:25:00'),
(2, 27, '2024-03-03 19:00:00'),
(3, 25, '2024-03-03 20:10:00'),
(3, 26, '2024-03-03 20:15:00'),
(3, 41, '2024-03-03 20:20:00'),
(4, 11, '2024-03-04 21:00:00'),
(4, 12, '2024-03-04 21:05:00'),
(4, 42, '2024-03-04 21:10:00'),
(5, 5,  '2024-03-05 07:50:00'),
(5, 6,  '2024-03-05 07:55:00'),
(5, 47, '2024-03-05 08:00:00'),
(6, 2,  '2024-03-06 10:00:00'),
(6, 15, '2024-03-06 10:05:00'),
(6, 48, '2024-03-06 10:10:00');

-- PLAYLIST_SONGS
INSERT INTO "playlist_songs" ("playlist_id", "song_id", "position")
VALUES
-- Focus Mode
(1, 17, 1),
(1, 18, 2),
(1, 19, 3),
(1, 20, 4),
(1, 21, 5),
(1, 36, 6),
(1, 47, 7),

-- Workout Mix
(2, 9,  1),
(2, 10, 2),
(2, 11, 3),
(2, 13, 4),
(2, 15, 5),
(2, 25, 6),
(2, 27, 7),
(2, 40, 8),
(2, 50, 9),

-- Party Starters
(3, 25, 1),
(3, 26, 2),
(3, 27, 3),
(3, 28, 4),
(3, 29, 5),
(3, 30, 6),
(3, 41, 7),
(3, 48, 8),

-- Night Drive Playlist
(4, 9,  1),
(4, 11, 2),
(4, 12, 3),
(4, 13, 4),
(4, 16, 5),
(4, 41, 6),
(4, 46, 7),
(4, 50, 8),

-- Chill Evenings
(5, 5,  1),
(5, 6,  2),
(5, 8,  3),
(5, 17, 4),
(5, 18, 5),
(5, 33, 6),
(5, 34, 7),
(5, 49, 8);

-- LISTENING_HISTORIES
INSERT INTO "listening_histories" ("user_id", "song_id", "streamed_at", "duration_played")
VALUES
(1, 17, '2024-03-01 12:00:00', 180),
(1, 18, '2024-03-01 12:30:00', 190),
(1, 19, '2024-03-01 13:00:00', 175),
(1, 33, '2024-03-02 09:00:00', 205),

(2, 9,  '2024-03-02 18:10:00', 200),
(2, 10, '2024-03-02 18:15:00', 230),
(2, 27, '2024-03-03 19:10:00', 250),
(2, 40, '2024-03-03 19:20:00', 240),

(3, 25, '2024-03-03 20:00:00', 240),
(3, 26, '2024-03-03 20:05:00', 260),
(3, 41, '2024-03-03 20:10:00', 210),
(3, 42, '2024-03-03 20:15:00', 205),

(4, 11, '2024-03-04 21:00:00', 205),
(4, 12, '2024-03-04 21:05:00', 215),
(4, 41, '2024-03-04 21:10:00', 210),
(4, 46, '2024-03-04 21:15:00', 200),

(5, 5,  '2024-03-05 07:30:00', 210),
(5, 6,  '2024-03-05 07:35:00', 195),
(5, 36, '2024-03-05 07:45:00', 190),
(5, 47, '2024-03-05 08:00:00', 180),

(6, 2,  '2024-03-06 10:00:00', 215),
(6, 15, '2024-03-06 10:05:00', 225),
(6, 25, '2024-03-06 10:10:00', 240),
(6, 48, '2024-03-06 10:15:00', 190),
(6, 50, '2024-03-06 10:20:00', 220);

-- AD_SHOWN_TO_USERS
INSERT INTO "ad_shown_to_users" ("ad_id", "user_id", "created_at")
VALUES
(1, 2, '2024-03-01 10:00:00'),
(1, 3, '2024-03-01 10:05:00'),
(1, 5, '2024-03-01 10:10:00'),
(2, 1, '2024-03-02 11:00:00'),
(2, 3, '2024-03-02 11:10:00'),
(2, 4, '2024-03-02 11:15:00'),
(3, 1, '2024-03-03 12:00:00'),
(3, 2, '2024-03-03 12:05:00'),
(3, 6, '2024-03-03 12:10:00');


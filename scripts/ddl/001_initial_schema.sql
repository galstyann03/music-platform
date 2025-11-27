-- Music Platform Database - Initial Schema DDL

-- 0. DROP EXISTING TABLES AND TYPES

-- Drop junction tables
DROP TABLE IF EXISTS "ad_shown_to_users" CASCADE;
DROP TABLE IF EXISTS "playlist_songs" CASCADE;
DROP TABLE IF EXISTS "likes" CASCADE;
DROP TABLE IF EXISTS "song_stakeholders" CASCADE;
DROP TABLE IF EXISTS "album_genres" CASCADE;
DROP TABLE IF EXISTS "song_genres" CASCADE;
DROP TABLE IF EXISTS "followers" CASCADE;
DROP TABLE IF EXISTS "artist_songs" CASCADE;

-- Drop dependent tables
DROP TABLE IF EXISTS "listening_histories" CASCADE;
DROP TABLE IF EXISTS "subscriptions" CASCADE;
DROP TABLE IF EXISTS "playlists" CASCADE;
DROP TABLE IF EXISTS "songs" CASCADE;
DROP TABLE IF EXISTS "albums" CASCADE;

-- Drop base tables
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "advertisements" CASCADE;
DROP TABLE IF EXISTS "stakeholders" CASCADE;
DROP TABLE IF EXISTS "genres" CASCADE;
DROP TABLE IF EXISTS "artists" CASCADE;

-- Drop ENUM types
DROP TYPE IF EXISTS "users_role_enum" CASCADE;
DROP TYPE IF EXISTS "subscriptions_status_enum" CASCADE;
DROP TYPE IF EXISTS "subscriptions_plan_type_enum" CASCADE;
DROP TYPE IF EXISTS "stakeholders_role_enum" CASCADE;
DROP TYPE IF EXISTS "artist_songs_role_enum" CASCADE;

-- 1. CREATE ENUM TYPES

CREATE TYPE "artist_songs_role_enum" AS ENUM('main', 'featured');

CREATE TYPE "stakeholders_role_enum" AS ENUM('singer', 'composer', 'producer', 'songwriter', 'engineer');

CREATE TYPE "subscriptions_plan_type_enum" AS ENUM('Free', 'Premium', 'Family');

CREATE TYPE "subscriptions_status_enum" AS ENUM('Active', 'Paused', 'Cancelled');

CREATE TYPE "users_role_enum" AS ENUM('user', 'admin');

-- 2. CREATE BASE TABLES

CREATE TABLE "artists" (
    "artist_id" SERIAL PRIMARY KEY,
    "name" character varying(150) NOT NULL,
    "bio" text,
    "country" character varying(100),
    "debut_year" integer,
    "profile_image_url" character varying(500),
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "genres" (
    "genre_id" SERIAL PRIMARY KEY,
    "name" character varying(100) NOT NULL,
    "description" text,
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "stakeholders" (
    "stakeholder_id" SERIAL PRIMARY KEY,
    "name" character varying(150) NOT NULL,
    "role" "stakeholders_role_enum" NOT NULL,
    "country" character varying(100),
    "bio" text,
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "advertisements" (
    "ad_id" SERIAL PRIMARY KEY,
    "title" character varying(200) NOT NULL,
    "content" text NOT NULL,
    "duration" integer NOT NULL,
    "target_audience" character varying(100),
    "start_date" date NOT NULL,
    "end_date" date,
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "users" (
    "user_id" SERIAL PRIMARY KEY,
    "name" character varying(100) NOT NULL,
    "email" character varying(255) NOT NULL UNIQUE,
    "password_hash" character varying(255) NOT NULL,
    "role" "users_role_enum" NOT NULL DEFAULT 'user',
    "birth_date" date,
    "profile_image_url" character varying(500),
    "is_verified" boolean NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

-- 3. CREATE DEPENDENT TABLES

CREATE TABLE "albums" (
    "album_id" SERIAL PRIMARY KEY,
    "title" character varying(200) NOT NULL,
    "artist_id" integer NOT NULL,
    "release_date" date,
    "cover_image_url" character varying(500),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_albums_artist_id" ON "albums" ("artist_id");

CREATE TABLE "songs" (
    "song_id" SERIAL PRIMARY KEY,
    "title" character varying(200) NOT NULL,
    "album_id" integer,
    "duration" integer NOT NULL,
    "release_date" date,
    "language" character varying(50),
    "lyrics" text,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY ("album_id") REFERENCES "albums"("album_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_songs_album_id" ON "songs" ("album_id");

CREATE TABLE "playlists" (
    "playlist_id" SERIAL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "title" character varying(100) NOT NULL,
    "description" text,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "is_public" boolean NOT NULL DEFAULT false,
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_playlists_user_id" ON "playlists" ("user_id");

CREATE TABLE "subscriptions" (
    "subscription_id" SERIAL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "plan_type" "subscriptions_plan_type_enum" NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP,
    "status" "subscriptions_status_enum" NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_subscriptions_user_id" ON "subscriptions" ("user_id");

CREATE TABLE "listening_histories" (
    "history_id" SERIAL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "song_id" integer NOT NULL,
    "streamed_at" TIMESTAMP NOT NULL DEFAULT now(),
    "duration_played" integer,
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_listening_histories_user_id" ON "listening_histories" ("user_id");
CREATE INDEX "idx_listening_histories_song_id" ON "listening_histories" ("song_id");

-- Junction tables

CREATE TABLE "artist_songs" (
    "song_id" integer NOT NULL,
    "artist_id" integer NOT NULL,
    "role" "artist_songs_role_enum" NOT NULL DEFAULT 'main',
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("song_id", "artist_id"),
    FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "followers" (
    "user_id" integer NOT NULL,
    "artist_id" integer NOT NULL,
    "followed_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("user_id", "artist_id"),
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "song_genres" (
    "song_id" integer NOT NULL,
    "genre_id" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("song_id", "genre_id"),
    FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "album_genres" (
    "album_id" integer NOT NULL,
    "genre_id" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("album_id", "genre_id"),
    FOREIGN KEY ("album_id") REFERENCES "albums"("album_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "song_stakeholders" (
    "song_id" integer NOT NULL,
    "stakeholder_id" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("song_id", "stakeholder_id"),
    FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("stakeholder_id") REFERENCES "stakeholders"("stakeholder_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "likes" (
    "user_id" integer NOT NULL,
    "song_id" integer NOT NULL,
    "liked_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("user_id", "song_id"),
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "playlist_songs" (
    "playlist_id" integer NOT NULL,
    "song_id" integer NOT NULL,
    "position" integer,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("playlist_id", "song_id"),
    FOREIGN KEY ("playlist_id") REFERENCES "playlists"("playlist_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "ad_shown_to_users" (
    "ad_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("ad_id", "user_id"),
    FOREIGN KEY ("ad_id") REFERENCES "advertisements"("ad_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

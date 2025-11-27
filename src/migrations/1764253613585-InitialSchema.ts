import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1764253613585 implements MigrationInterface {
    name = 'InitialSchema1764253613585';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Types
        await queryRunner.query('CREATE TYPE "public"."artist_songs_role_enum" AS ENUM(\'main\', \'featured\')');
        await queryRunner.query('CREATE TYPE "public"."stakeholders_role_enum" AS ENUM(\'singer\', \'composer\', \'producer\', \'songwriter\', \'engineer\')');
        await queryRunner.query('CREATE TYPE "public"."subscriptions_plan_type_enum" AS ENUM(\'Free\', \'Premium\', \'Family\')');
        await queryRunner.query('CREATE TYPE "public"."subscriptions_status_enum" AS ENUM(\'Active\', \'Paused\', \'Cancelled\')');
        await queryRunner.query('CREATE TYPE "public"."users_role_enum" AS ENUM(\'user\', \'admin\')');

        // Tables
        await queryRunner.query(`
            CREATE TABLE "artists" (
                "artist_id" SERIAL NOT NULL,
                "name" character varying(150) NOT NULL,
                "bio" text,
                "country" character varying(100),
                "debut_year" integer,
                "profile_image_url" character varying(500),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_51fb94826a5db1782cefcad31a1" PRIMARY KEY ("artist_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "genres" (
                "genre_id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "description" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9e2b149997e3b7d938f563c6fa2" PRIMARY KEY ("genre_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "stakeholders" (
                "stakeholder_id" SERIAL NOT NULL,
                "name" character varying(150) NOT NULL,
                "role" "public"."stakeholders_role_enum" NOT NULL,
                "country" character varying(100),
                "bio" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_eb91958671d10131ae2ecef25e7" PRIMARY KEY ("stakeholder_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "advertisements" (
                "ad_id" SERIAL NOT NULL,
                "title" character varying(200) NOT NULL,
                "content" text NOT NULL,
                "duration" integer NOT NULL,
                "target_audience" character varying(100),
                "start_date" date NOT NULL,
                "end_date" date,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_87c0bd0f1852900631c2c3f00f0" PRIMARY KEY ("ad_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password_hash" character varying(255) NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
                "birth_date" date,
                "profile_image_url" character varying(500),
                "is_verified" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "albums" (
                "album_id" SERIAL NOT NULL,
                "title" character varying(200) NOT NULL,
                "artist_id" integer NOT NULL,
                "release_date" date,
                "cover_image_url" character varying(500),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6d21b668e81f4be7445062b024a" PRIMARY KEY ("album_id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_b6465bf462c2ffef5f066bc6f2" ON "albums" ("artist_id")
        `);

        await queryRunner.query(`
            CREATE TABLE "songs" (
                "song_id" SERIAL NOT NULL,
                "title" character varying(200) NOT NULL,
                "album_id" integer,
                "duration" integer NOT NULL,
                "release_date" date,
                "language" character varying(50),
                "lyrics" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2d6edad8a9d0148b88f54668ca2" PRIMARY KEY ("song_id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_944f44ec5e875219d05bb81d96" ON "songs" ("album_id")
        `);

        await queryRunner.query(`
            CREATE TABLE "playlists" (
                "playlist_id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "title" character varying(100) NOT NULL,
                "description" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_public" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_d44fd950fca1f672db64f855a59" PRIMARY KEY ("playlist_id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_a3ea169575c25e5c55494d7f38" ON "playlists" ("user_id")
        `);

        await queryRunner.query(`
            CREATE TABLE "subscriptions" (
                "subscription_id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "plan_type" "public"."subscriptions_plan_type_enum" NOT NULL,
                "start_date" TIMESTAMP NOT NULL,
                "end_date" TIMESTAMP,
                "status" "public"."subscriptions_status_enum" NOT NULL,
                CONSTRAINT "PK_33b940ef52faaafc3d05f95719f" PRIMARY KEY ("subscription_id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_d0a95ef8a28188364c546eb65c" ON "subscriptions" ("user_id")
        `);

        await queryRunner.query(`
            CREATE TABLE "listening_histories" (
                "history_id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "song_id" integer NOT NULL,
                "streamed_at" TIMESTAMP NOT NULL DEFAULT now(),
                "duration_played" integer,
                CONSTRAINT "PK_e2125d97b046332ab5c05290cb7" PRIMARY KEY ("history_id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_37b7a707280194aa42783a1b84" ON "listening_histories" ("user_id")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_bc7d9ab601068823e0115ced08" ON "listening_histories" ("song_id")
        `);

        await queryRunner.query(`
            CREATE TABLE "artist_songs" (
                "song_id" integer NOT NULL,
                "artist_id" integer NOT NULL,
                "role" "public"."artist_songs_role_enum" NOT NULL DEFAULT 'main',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7970d7658bf74e4f34d5f3cc25a" PRIMARY KEY ("song_id", "artist_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "followers" (
                "user_id" integer NOT NULL,
                "artist_id" integer NOT NULL,
                "followed_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f7b4b77ffd08c20516ed76e9750" PRIMARY KEY ("user_id", "artist_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "song_genres" (
                "song_id" integer NOT NULL,
                "genre_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e7bb356590d4c924cb6c5572a83" PRIMARY KEY ("song_id", "genre_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "album_genres" (
                "album_id" integer NOT NULL,
                "genre_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ddd2a5846e5ffd21d333966d045" PRIMARY KEY ("album_id", "genre_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "song_stakeholders" (
                "song_id" integer NOT NULL,
                "stakeholder_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c345e4cfaec3fe3744b399d493f" PRIMARY KEY ("song_id", "stakeholder_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "likes" (
                "user_id" integer NOT NULL,
                "song_id" integer NOT NULL,
                "liked_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_29a93772b6703b5b49b1fdb7f9f" PRIMARY KEY ("user_id", "song_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "playlist_songs" (
                "playlist_id" integer NOT NULL,
                "song_id" integer NOT NULL,
                "position" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8ef73d96d410d8dcdf5210d5a31" PRIMARY KEY ("playlist_id", "song_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "ad_shown_to_users" (
                "ad_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4192d5e7374b4b63e03a5c70812" PRIMARY KEY ("ad_id", "user_id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "albums" 
            ADD CONSTRAINT "FK_b6465bf462c2ffef5f066bc6f21" 
            FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "songs" 
            ADD CONSTRAINT "FK_944f44ec5e875219d05bb81d966" 
            FOREIGN KEY ("album_id") REFERENCES "albums"("album_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "playlists" 
            ADD CONSTRAINT "FK_a3ea169575c25e5c55494d7f382" 
            FOREIGN KEY ("user_id") REFERENCES "users"("user_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "subscriptions" 
            ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" 
            FOREIGN KEY ("user_id") REFERENCES "users"("user_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "listening_histories" 
            ADD CONSTRAINT "FK_37b7a707280194aa42783a1b847" 
            FOREIGN KEY ("user_id") REFERENCES "users"("user_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "listening_histories" 
            ADD CONSTRAINT "FK_bc7d9ab601068823e0115ced08f" 
            FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "artist_songs" 
            ADD CONSTRAINT "FK_ae8250a9ef0b740c6eb59f2244d" 
            FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "artist_songs" 
            ADD CONSTRAINT "FK_72e29322d83b35770506756c8ed" 
            FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "followers" 
            ADD CONSTRAINT "FK_d6e6e6be11ffefd40e60bffbebd" 
            FOREIGN KEY ("user_id") REFERENCES "users"("user_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "followers" 
            ADD CONSTRAINT "FK_4ab7f350bc31f39d69d4590629d" 
            FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "song_genres" 
            ADD CONSTRAINT "FK_de404f71e84126a4c84b405d4a6" 
            FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "song_genres" 
            ADD CONSTRAINT "FK_40fd43fbac798c136dc175fc75c" 
            FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "album_genres" 
            ADD CONSTRAINT "FK_4082b00f72bab6f0a580b3c3b9f" 
            FOREIGN KEY ("album_id") REFERENCES "albums"("album_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "album_genres" 
            ADD CONSTRAINT "FK_a145db8221e96da0270465e6482" 
            FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "song_stakeholders" 
            ADD CONSTRAINT "FK_ef70a0c6e57c9a7bfc7af42234a" 
            FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "song_stakeholders" 
            ADD CONSTRAINT "FK_15754cefb8226067295ed412709" 
            FOREIGN KEY ("stakeholder_id") REFERENCES "stakeholders"("stakeholder_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "likes" 
            ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" 
            FOREIGN KEY ("user_id") REFERENCES "users"("user_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "likes" 
            ADD CONSTRAINT "FK_a58d82ed704546adc3752fc1dc8" 
            FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "playlist_songs" 
            ADD CONSTRAINT "FK_ec0cee5a4454b6788c2900cd9c3" 
            FOREIGN KEY ("playlist_id") REFERENCES "playlists"("playlist_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "playlist_songs" 
            ADD CONSTRAINT "FK_1f378aefd539d23bfda7d4dd138" 
            FOREIGN KEY ("song_id") REFERENCES "songs"("song_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "ad_shown_to_users" 
            ADD CONSTRAINT "FK_37e911aa79ec16dc8b9f3ab66b8" 
            FOREIGN KEY ("ad_id") REFERENCES "advertisements"("ad_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "ad_shown_to_users" 
            ADD CONSTRAINT "FK_e6fe86ca13aa45ecca9d9a0e77e" 
            FOREIGN KEY ("user_id") REFERENCES "users"("user_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ad_shown_to_users" DROP CONSTRAINT "FK_e6fe86ca13aa45ecca9d9a0e77e"
        `);

        await queryRunner.query(`
            ALTER TABLE "ad_shown_to_users" DROP CONSTRAINT "FK_37e911aa79ec16dc8b9f3ab66b8"
        `);

        await queryRunner.query(`
            ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"
        `);

        await queryRunner.query(`
            ALTER TABLE "playlists" DROP CONSTRAINT "FK_a3ea169575c25e5c55494d7f382"
        `);

        await queryRunner.query(`
            ALTER TABLE "playlist_songs" DROP CONSTRAINT "FK_1f378aefd539d23bfda7d4dd138"
        `);

        await queryRunner.query(`
            ALTER TABLE "playlist_songs" DROP CONSTRAINT "FK_ec0cee5a4454b6788c2900cd9c3"
        `);

        await queryRunner.query(`
            ALTER TABLE "songs" DROP CONSTRAINT "FK_944f44ec5e875219d05bb81d966"
        `);

        await queryRunner.query(`
            ALTER TABLE "listening_histories" DROP CONSTRAINT "FK_bc7d9ab601068823e0115ced08f"
        `);

        await queryRunner.query(`
            ALTER TABLE "listening_histories" DROP CONSTRAINT "FK_37b7a707280194aa42783a1b847"
        `);

        await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_a58d82ed704546adc3752fc1dc8"
        `);

        await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"
        `);

        await queryRunner.query(`
            ALTER TABLE "song_stakeholders" DROP CONSTRAINT "FK_15754cefb8226067295ed412709"
        `);

        await queryRunner.query(`
            ALTER TABLE "song_stakeholders" DROP CONSTRAINT "FK_ef70a0c6e57c9a7bfc7af42234a"
        `);

        await queryRunner.query(`
            ALTER TABLE "albums" DROP CONSTRAINT "FK_b6465bf462c2ffef5f066bc6f21"
        `);

        await queryRunner.query(`
            ALTER TABLE "album_genres" DROP CONSTRAINT "FK_a145db8221e96da0270465e6482"
        `);

        await queryRunner.query(`
            ALTER TABLE "album_genres" DROP CONSTRAINT "FK_4082b00f72bab6f0a580b3c3b9f"
        `);

        await queryRunner.query(`
            ALTER TABLE "song_genres" DROP CONSTRAINT "FK_40fd43fbac798c136dc175fc75c"
        `);

        await queryRunner.query(`
            ALTER TABLE "song_genres" DROP CONSTRAINT "FK_de404f71e84126a4c84b405d4a6"
        `);

        await queryRunner.query(`
            ALTER TABLE "followers" DROP CONSTRAINT "FK_4ab7f350bc31f39d69d4590629d"
        `);

        await queryRunner.query(`
            ALTER TABLE "followers" DROP CONSTRAINT "FK_d6e6e6be11ffefd40e60bffbebd"
        `);

        await queryRunner.query(`
            ALTER TABLE "artist_songs" DROP CONSTRAINT "FK_72e29322d83b35770506756c8ed"
        `);

        await queryRunner.query(`
            ALTER TABLE "artist_songs" DROP CONSTRAINT "FK_ae8250a9ef0b740c6eb59f2244d"
        `);

        // Drop indexes
        await queryRunner.query('DROP INDEX "public"."IDX_d0a95ef8a28188364c546eb65c"');
        await queryRunner.query('DROP INDEX "public"."IDX_a3ea169575c25e5c55494d7f38"');
        await queryRunner.query('DROP INDEX "public"."IDX_944f44ec5e875219d05bb81d96"');
        await queryRunner.query('DROP INDEX "public"."IDX_37b7a707280194aa42783a1b84"');
        await queryRunner.query('DROP INDEX "public"."IDX_bc7d9ab601068823e0115ced08"');
        await queryRunner.query('DROP INDEX "public"."IDX_b6465bf462c2ffef5f066bc6f2"');

        // Drop tables
        await queryRunner.query('DROP TABLE "ad_shown_to_users"');
        await queryRunner.query('DROP TABLE "advertisements"');
        await queryRunner.query('DROP TABLE "subscriptions"');
        await queryRunner.query('DROP TYPE "public"."subscriptions_status_enum"');
        await queryRunner.query('DROP TYPE "public"."subscriptions_plan_type_enum"');
        await queryRunner.query('DROP TABLE "playlists"');
        await queryRunner.query('DROP TABLE "playlist_songs"');
        await queryRunner.query('DROP TABLE "songs"');
        await queryRunner.query('DROP TABLE "listening_histories"');
        await queryRunner.query('DROP TABLE "likes"');
        await queryRunner.query('DROP TABLE "song_stakeholders"');
        await queryRunner.query('DROP TABLE "stakeholders"');
        await queryRunner.query('DROP TYPE "public"."stakeholders_role_enum"');
        await queryRunner.query('DROP TABLE "albums"');
        await queryRunner.query('DROP TABLE "album_genres"');
        await queryRunner.query('DROP TABLE "genres"');
        await queryRunner.query('DROP TABLE "song_genres"');
        await queryRunner.query('DROP TABLE "artists"');
        await queryRunner.query('DROP TABLE "followers"');
        await queryRunner.query('DROP TABLE "artist_songs"');
        await queryRunner.query('DROP TYPE "public"."artist_songs_role_enum"');
        await queryRunner.query('DROP TABLE "users"');
        await queryRunner.query('DROP TYPE "public"."users_role_enum"');
    }
}

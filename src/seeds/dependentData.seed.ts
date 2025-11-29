import AppDataSource from '../configs/data-source';
import { logger } from '../configs/winston.config';
import { Artist, Album, Song, Genre, AlbumGenre, SongGenre, ArtistSong, ArtistRole } from '../entities';

export async function seedDependentData(): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const artistRepo = queryRunner.manager.getRepository(Artist);
        const albumRepo = queryRunner.manager.getRepository(Album);
        const songRepo = queryRunner.manager.getRepository(Song);
        const genreRepo = queryRunner.manager.getRepository(Genre);
        const albumGenreRepo = queryRunner.manager.getRepository(AlbumGenre);
        const songGenreRepo = queryRunner.manager.getRepository(SongGenre);
        const artistSongRepo = queryRunner.manager.getRepository(ArtistSong);

        const existingAlbums = await albumRepo.count();
        if (existingAlbums > 0) {
            logger.info('Dependent data already exists. Skipping seed.');
            await queryRunner.rollbackTransaction();
            return;
        }

        const artists = await artistRepo.find({ order: { artistId: 'ASC' } });
        const genres = await genreRepo.find({ order: { genreId: 'ASC' } });

        if (artists.length === 0 || genres.length === 0) {
            throw new Error('Base data (artists/genres) must be seeded first!');
        }

        const genreMap: Record<string, number> = {};
        genres.forEach(g => { genreMap[g.name] = g.genreId; });

        logger.info('Seeding albums...');
        const albumsData = [
            { title: 'City Lights', artistId: artists[0].artistId, releaseDate: new Date('2021-09-10'), coverImageUrl: 'https://example.com/covers/city_lights.jpg' },
            { title: 'Acoustic Sessions', artistId: artists[0].artistId, releaseDate: new Date('2019-03-05'), coverImageUrl: 'https://example.com/covers/acoustic_sessions.jpg' },
            { title: 'Night Drive', artistId: artists[1].artistId, releaseDate: new Date('2022-06-01'), coverImageUrl: 'https://example.com/covers/night_drive.jpg' },
            { title: 'Neon Dreams', artistId: artists[1].artistId, releaseDate: new Date('2023-02-14'), coverImageUrl: 'https://example.com/covers/neon_dreams.jpg' },
            { title: 'Lo-fi Study Sessions', artistId: artists[2].artistId, releaseDate: new Date('2023-01-15'), coverImageUrl: 'https://example.com/covers/lofi_study.jpg' },
            { title: 'Rainy Evenings', artistId: artists[2].artistId, releaseDate: new Date('2023-10-01'), coverImageUrl: 'https://example.com/covers/rainy_evenings.jpg' },
            { title: 'Global Party', artistId: artists[3].artistId, releaseDate: new Date('2020-07-20'), coverImageUrl: 'https://example.com/covers/global_party.jpg' },
            { title: 'World Tapes', artistId: artists[3].artistId, releaseDate: new Date('2021-04-11'), coverImageUrl: 'https://example.com/covers/world_tapes.jpg' },
            { title: 'Skyline Stories Vol.1', artistId: artists[4].artistId, releaseDate: new Date('2022-09-09'), coverImageUrl: 'https://example.com/covers/skyline_vol1.jpg' },
            { title: 'Desert Roads', artistId: artists[5].artistId, releaseDate: new Date('2021-06-21'), coverImageUrl: 'https://example.com/covers/desert_roads.jpg' },
            { title: 'Ocean Drive EP', artistId: artists[6].artistId, releaseDate: new Date('2022-05-05'), coverImageUrl: 'https://example.com/covers/ocean_drive_ep.jpg' },
            { title: 'Retro Night', artistId: artists[7].artistId, releaseDate: new Date('2020-11-11'), coverImageUrl: 'https://example.com/covers/retro_night.jpg' },
        ];

        const savedAlbums = await albumRepo.save(albumsData);
        logger.info(`Seeded ${savedAlbums.length} albums`);

        logger.info('Seeding album genres...');
        const albumGenresData = [
            { albumId: savedAlbums[0].albumId, genreId: genreMap['Pop'] },
            { albumId: savedAlbums[1].albumId, genreId: genreMap['Acoustic'] },
            { albumId: savedAlbums[2].albumId, genreId: genreMap['Electronic'] },
            { albumId: savedAlbums[3].albumId, genreId: genreMap['Electronic'] },
            { albumId: savedAlbums[4].albumId, genreId: genreMap['Lo-fi'] },
            { albumId: savedAlbums[5].albumId, genreId: genreMap['Lo-fi'] },
            { albumId: savedAlbums[6].albumId, genreId: genreMap['Electronic'] },
            { albumId: savedAlbums[6].albumId, genreId: genreMap['Hip-Hop'] },
            { albumId: savedAlbums[7].albumId, genreId: genreMap['Indie'] },
            { albumId: savedAlbums[8].albumId, genreId: genreMap['Indie'] },
            { albumId: savedAlbums[9].albumId, genreId: genreMap['Rock'] },
            { albumId: savedAlbums[10].albumId, genreId: genreMap['Electronic'] },
            { albumId: savedAlbums[11].albumId, genreId: genreMap['Electronic'] },
        ];
        await albumGenreRepo.save(albumGenresData);
        logger.info(`Seeded ${albumGenresData.length} album-genre relationships`);

        logger.info('Seeding songs...');
        const songsData = [
            { title: 'Intro (City Lights)', albumId: savedAlbums[0].albumId, duration: 120, releaseDate: new Date('2021-09-10'), language: 'English', lyrics: undefined },
            { title: 'City Lights', albumId: savedAlbums[0].albumId, duration: 215, releaseDate: new Date('2021-09-10'), language: 'English', lyrics: 'Lyrics for City Lights...' },
            { title: 'Downtown Echoes', albumId: savedAlbums[0].albumId, duration: 205, releaseDate: new Date('2021-09-10'), language: 'English', lyrics: 'Lyrics for Downtown Echoes...' },
            { title: 'Midnight Windows', albumId: savedAlbums[0].albumId, duration: 198, releaseDate: new Date('2021-09-10'), language: 'English', lyrics: 'Lyrics for Midnight Windows...' },
            { title: 'Quiet Morning', albumId: savedAlbums[1].albumId, duration: 210, releaseDate: new Date('2019-03-05'), language: 'English', lyrics: 'Lyrics for Quiet Morning...' },
            { title: 'Unplugged Dreams', albumId: savedAlbums[1].albumId, duration: 195, releaseDate: new Date('2019-03-05'), language: 'English', lyrics: 'Lyrics for Unplugged Dreams...' },
            { title: 'Living Room Sessions', albumId: savedAlbums[1].albumId, duration: 220, releaseDate: new Date('2019-03-05'), language: 'English', lyrics: undefined },
            { title: 'Soft Echo', albumId: savedAlbums[1].albumId, duration: 200, releaseDate: new Date('2019-03-05'), language: 'English', lyrics: 'Lyrics for Soft Echo...' },
            { title: 'Midnight Streets', albumId: savedAlbums[2].albumId, duration: 200, releaseDate: new Date('2022-06-01'), language: 'English', lyrics: 'Lyrics for Midnight Streets...' },
            { title: 'Neon Highway', albumId: savedAlbums[2].albumId, duration: 230, releaseDate: new Date('2022-06-01'), language: 'English', lyrics: 'Lyrics for Neon Highway...' },
            { title: 'Late Night Walk', albumId: savedAlbums[2].albumId, duration: 205, releaseDate: new Date('2022-06-01'), language: 'English', lyrics: 'Lyrics for Late Night Walk...' },
            { title: 'Afterhours Drive', albumId: savedAlbums[2].albumId, duration: 215, releaseDate: new Date('2022-06-01'), language: 'English', lyrics: 'Lyrics for Afterhours Drive...' },
            { title: 'City Neon', albumId: savedAlbums[3].albumId, duration: 210, releaseDate: new Date('2023-02-14'), language: 'English', lyrics: 'Lyrics for City Neon...' },
            { title: 'Pixel Heart', albumId: savedAlbums[3].albumId, duration: 190, releaseDate: new Date('2023-02-14'), language: 'English', lyrics: 'Lyrics for Pixel Heart...' },
            { title: 'Arcade Nights', albumId: savedAlbums[3].albumId, duration: 225, releaseDate: new Date('2023-02-14'), language: 'English', lyrics: 'Lyrics for Arcade Nights...' },
            { title: 'Synthwave Skyline', albumId: savedAlbums[3].albumId, duration: 240, releaseDate: new Date('2023-02-14'), language: 'English', lyrics: 'Lyrics for Synthwave Skyline...' },
            { title: 'Rainy Window', albumId: savedAlbums[4].albumId, duration: 180, releaseDate: new Date('2023-01-15'), language: 'Instrumental', lyrics: undefined },
            { title: 'Coffee Break', albumId: savedAlbums[4].albumId, duration: 190, releaseDate: new Date('2023-01-15'), language: 'Instrumental', lyrics: undefined },
            { title: 'Study Flow', albumId: savedAlbums[4].albumId, duration: 175, releaseDate: new Date('2023-01-15'), language: 'Instrumental', lyrics: undefined },
            { title: 'Notebook Pages', albumId: savedAlbums[4].albumId, duration: 185, releaseDate: new Date('2023-01-15'), language: 'Instrumental', lyrics: undefined },
            { title: 'Umbrella Lights', albumId: savedAlbums[5].albumId, duration: 178, releaseDate: new Date('2023-10-01'), language: 'Instrumental', lyrics: undefined },
            { title: 'Street Reflections', albumId: savedAlbums[5].albumId, duration: 188, releaseDate: new Date('2023-10-01'), language: 'Instrumental', lyrics: undefined },
            { title: 'Late Night Tram', albumId: savedAlbums[5].albumId, duration: 192, releaseDate: new Date('2023-10-01'), language: 'Instrumental', lyrics: undefined },
            { title: 'City in the Rain', albumId: savedAlbums[5].albumId, duration: 200, releaseDate: new Date('2023-10-01'), language: 'Instrumental', lyrics: undefined },
            { title: 'Around the World', albumId: savedAlbums[6].albumId, duration: 240, releaseDate: new Date('2020-07-20'), language: 'English', lyrics: 'Lyrics for Around the World...' },
            { title: 'Festival Night', albumId: savedAlbums[6].albumId, duration: 260, releaseDate: new Date('2020-07-20'), language: 'English', lyrics: 'Lyrics for Festival Night...' },
            { title: 'Global Anthem', albumId: savedAlbums[6].albumId, duration: 250, releaseDate: new Date('2020-07-20'), language: 'English', lyrics: 'Lyrics for Global Anthem...' },
            { title: 'City Parade', albumId: savedAlbums[6].albumId, duration: 230, releaseDate: new Date('2020-07-20'), language: 'English', lyrics: 'Lyrics for City Parade...' },
            { title: 'Desert Sunrise', albumId: savedAlbums[7].albumId, duration: 225, releaseDate: new Date('2021-04-11'), language: 'English', lyrics: 'Lyrics for Desert Sunrise...' },
            { title: 'Mountain Train', albumId: savedAlbums[7].albumId, duration: 215, releaseDate: new Date('2021-04-11'), language: 'English', lyrics: 'Lyrics for Mountain Train...' },
            { title: 'Harbor Lights', albumId: savedAlbums[7].albumId, duration: 210, releaseDate: new Date('2021-04-11'), language: 'English', lyrics: 'Lyrics for Harbor Lights...' },
            { title: 'Foreign Skies', albumId: savedAlbums[7].albumId, duration: 235, releaseDate: new Date('2021-04-11'), language: 'English', lyrics: 'Lyrics for Foreign Skies...' },
            { title: 'Rooftop Stories', albumId: savedAlbums[8].albumId, duration: 205, releaseDate: new Date('2022-09-09'), language: 'English', lyrics: 'Lyrics for Rooftop Stories...' },
            { title: 'Skyline at Dawn', albumId: savedAlbums[8].albumId, duration: 215, releaseDate: new Date('2022-09-09'), language: 'English', lyrics: 'Lyrics for Skyline at Dawn...' },
            { title: 'City Sketches', albumId: savedAlbums[8].albumId, duration: 198, releaseDate: new Date('2022-09-09'), language: 'English', lyrics: 'Lyrics for City Sketches...' },
            { title: 'Elevator Music', albumId: savedAlbums[8].albumId, duration: 190, releaseDate: new Date('2022-09-09'), language: 'Instrumental', lyrics: undefined },
            { title: 'Dusty Roads', albumId: savedAlbums[9].albumId, duration: 230, releaseDate: new Date('2021-06-21'), language: 'English', lyrics: 'Lyrics for Dusty Roads...' },
            { title: 'Campfire Stories', albumId: savedAlbums[9].albumId, duration: 220, releaseDate: new Date('2021-06-21'), language: 'English', lyrics: 'Lyrics for Campfire Stories...' },
            { title: 'Endless Highway', albumId: savedAlbums[9].albumId, duration: 240, releaseDate: new Date('2021-06-21'), language: 'English', lyrics: 'Lyrics for Endless Highway...' },
            { title: 'Night in the Desert', albumId: savedAlbums[9].albumId, duration: 250, releaseDate: new Date('2021-06-21'), language: 'English', lyrics: 'Lyrics for Night in the Desert...' },
            { title: 'Seaside Drive', albumId: savedAlbums[10].albumId, duration: 210, releaseDate: new Date('2022-05-05'), language: 'English', lyrics: 'Lyrics for Seaside Drive...' },
            { title: 'Boardwalk Lights', albumId: savedAlbums[10].albumId, duration: 205, releaseDate: new Date('2022-05-05'), language: 'English', lyrics: 'Lyrics for Boardwalk Lights...' },
            { title: 'Retro Intro', albumId: savedAlbums[11].albumId, duration: 130, releaseDate: new Date('2020-11-11'), language: 'English', lyrics: undefined },
            { title: 'Cassette Dreams', albumId: savedAlbums[11].albumId, duration: 220, releaseDate: new Date('2020-11-11'), language: 'English', lyrics: 'Lyrics for Cassette Dreams...' },
            { title: 'Single: Midnight Message', albumId: undefined, duration: 210, releaseDate: new Date('2024-01-01'), language: 'English', lyrics: 'Lyrics for Single: Midnight Message...' },
            { title: 'Single: Ocean Air', albumId: undefined, duration: 200, releaseDate: new Date('2024-01-15'), language: 'English', lyrics: 'Lyrics for Single: Ocean Air...' },
            { title: 'Single: Lo-fi Break', albumId: undefined, duration: 180, releaseDate: new Date('2024-02-01'), language: 'Instrumental', lyrics: undefined },
            { title: 'Single: Rooftop Rain', albumId: undefined, duration: 190, releaseDate: new Date('2024-02-10'), language: 'English', lyrics: 'Lyrics for Single: Rooftop Rain...' },
            { title: 'Single: City Bicycle', albumId: undefined, duration: 175, releaseDate: new Date('2024-02-20'), language: 'English', lyrics: 'Lyrics for Single: City Bicycle...' },
            { title: 'Single: Night Bus Home', albumId: undefined, duration: 220, releaseDate: new Date('2024-03-01'), language: 'English', lyrics: 'Lyrics for Single: Night Bus Home...' },
        ];

        const savedSongs = await songRepo.save(songsData);
        logger.info(`Seeded ${savedSongs.length} songs`);

        logger.info('Seeding song genres...');
        const songGenresData: Array<{ songId: number; genreId: number }> = [];
        
        for (let i = 0; i < 4; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Pop'] });
        }
        for (let i = 4; i < 8; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Acoustic'] });
        }
        for (let i = 8; i < 12; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Electronic'] });
        }
        for (let i = 12; i < 16; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Electronic'] });
        }
        for (let i = 16; i < 20; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Lo-fi'] });
        }
        for (let i = 20; i < 24; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Lo-fi'] });
        }
        for (let i = 24; i < 28; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Electronic'] });
        }
        for (let i = 28; i < 32; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Indie'] });
        }
        if (savedSongs[32]?.songId) songGenresData.push({ songId: savedSongs[32].songId, genreId: genreMap['Indie'] });
        if (savedSongs[33]?.songId) songGenresData.push({ songId: savedSongs[33].songId, genreId: genreMap['Pop'] });
        if (savedSongs[34]?.songId) songGenresData.push({ songId: savedSongs[34].songId, genreId: genreMap['Indie'] });
        if (savedSongs[35]?.songId) songGenresData.push({ songId: savedSongs[35].songId, genreId: genreMap['Jazz'] });
        for (let i = 36; i < 40; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Rock'] });
        }
        for (let i = 40; i < 42; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Electronic'] });
        }
        for (let i = 42; i < 44; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) songGenresData.push({ songId, genreId: genreMap['Electronic'] });
        }
        if (savedSongs[44]?.songId) songGenresData.push({ songId: savedSongs[44].songId, genreId: genreMap['Pop'] });
        if (savedSongs[45]?.songId) songGenresData.push({ songId: savedSongs[45].songId, genreId: genreMap['Electronic'] });
        if (savedSongs[46]?.songId) songGenresData.push({ songId: savedSongs[46].songId, genreId: genreMap['Lo-fi'] });
        if (savedSongs[47]?.songId) songGenresData.push({ songId: savedSongs[47].songId, genreId: genreMap['Indie'] });
        if (savedSongs[48]?.songId) songGenresData.push({ songId: savedSongs[48].songId, genreId: genreMap['Pop'] });
        if (savedSongs[49]?.songId) songGenresData.push({ songId: savedSongs[49].songId, genreId: genreMap['Electronic'] });

        await songGenreRepo.save(songGenresData);
        logger.info(`Seeded ${songGenresData.length} song-genre relationships`);

        logger.info('Seeding artist-song relationships...');
        const artistSongsData: Array<{ songId: number; artistId: number; role: ArtistRole }> = [];
        
        for (let i = 0; i < 8; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[0].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 8; i < 16; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[1].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 16; i < 24; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[2].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 24; i < 32; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[3].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 32; i < 36; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[4].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 36; i < 40; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[5].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 40; i < 42; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[6].artistId, role: ArtistRole.MAIN });
        }
        for (let i = 42; i < 44; i++) {
            const songId = savedSongs[i]?.songId;
            if (songId) artistSongsData.push({ songId, artistId: artists[7].artistId, role: ArtistRole.MAIN });
        }
        if (savedSongs[44]?.songId) artistSongsData.push({ songId: savedSongs[44].songId, artistId: artists[0].artistId, role: ArtistRole.MAIN });
        if (savedSongs[45]?.songId) artistSongsData.push({ songId: savedSongs[45].songId, artistId: artists[1].artistId, role: ArtistRole.MAIN });
        if (savedSongs[46]?.songId) artistSongsData.push({ songId: savedSongs[46].songId, artistId: artists[2].artistId, role: ArtistRole.MAIN });
        if (savedSongs[47]?.songId) artistSongsData.push({ songId: savedSongs[47].songId, artistId: artists[3].artistId, role: ArtistRole.MAIN });
        if (savedSongs[48]?.songId) artistSongsData.push({ songId: savedSongs[48].songId, artistId: artists[0].artistId, role: ArtistRole.MAIN });
        if (savedSongs[49]?.songId) artistSongsData.push({ songId: savedSongs[49].songId, artistId: artists[1].artistId, role: ArtistRole.MAIN });
        
        if (savedSongs[27]?.songId) artistSongsData.push({ songId: savedSongs[27].songId, artistId: artists[1].artistId, role: ArtistRole.FEATURED });
        if (savedSongs[31]?.songId) artistSongsData.push({ songId: savedSongs[31].songId, artistId: artists[4].artistId, role: ArtistRole.FEATURED });
        if (savedSongs[41]?.songId) artistSongsData.push({ songId: savedSongs[41].songId, artistId: artists[3].artistId, role: ArtistRole.FEATURED });
        if (savedSongs[47]?.songId) artistSongsData.push({ songId: savedSongs[47].songId, artistId: artists[7].artistId, role: ArtistRole.FEATURED });

        await artistSongRepo.save(artistSongsData);
        logger.info(`Seeded ${artistSongsData.length} artist-song relationships`);

        await queryRunner.commitTransaction();
        logger.info('Dependent data seeding completed successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        logger.error('Error seeding dependent data:', error);
        throw error;
    } finally {
        await queryRunner.release();
    }
}

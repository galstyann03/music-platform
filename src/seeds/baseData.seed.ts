import AppDataSource from '../configs/data-source';
import { logger } from '../configs/winston.config';
import { Genre, Stakeholder, StakeholderRole, Advertisement, Artist } from '../entities';

export async function seedBaseData(): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const genreRepo = queryRunner.manager.getRepository(Genre);
        const stakeholderRepo = queryRunner.manager.getRepository(Stakeholder);
        const adRepo = queryRunner.manager.getRepository(Advertisement);
        const artistRepo = queryRunner.manager.getRepository(Artist);

        const existingGenres = await genreRepo.count();
        const existingArtists = await artistRepo.count();

        if (existingGenres > 0 || existingArtists > 0) {
            logger.info('Base data already exists. Skipping seed.');
            await queryRunner.rollbackTransaction();
            return;
        }

        logger.info('Seeding genres...');
        const genres = [
            { name: 'Pop', description: 'Popular mainstream music with catchy melodies.' },
            { name: 'Rock', description: 'Guitar-driven music with strong rhythms.' },
            { name: 'Electronic', description: 'Music produced primarily using electronic instruments.' },
            { name: 'Hip-Hop', description: 'Rhythmic music with rapping and beats.' },
            { name: 'Lo-fi', description: 'Low-fidelity, chill and relaxed music for focus and study.' },
            { name: 'Jazz', description: 'Improvisational music with complex harmonies.' },
            { name: 'Acoustic', description: 'Unplugged, stripped-down sound.' },
            { name: 'Indie', description: 'Independent, alternative styles across genres.' },
        ];
        await genreRepo.save(genres);
        logger.info(`Seeded ${genres.length} genres`);

        logger.info('Seeding stakeholders...');
        const stakeholders = [
            stakeholderRepo.create({ name: 'Alice Rivers', role: StakeholderRole.SINGER, country: 'USA', bio: 'Vocalist with a background in pop and R&B.' }),
            stakeholderRepo.create({ name: 'Ben Carter', role: StakeholderRole.COMPOSER, country: 'Canada', bio: 'Composer specializing in cinematic and pop music.' }),
            stakeholderRepo.create({ name: 'Carla Gomez', role: StakeholderRole.PRODUCER, country: 'Spain', bio: 'Music producer focusing on electronic and dance tracks.' }),
            stakeholderRepo.create({ name: 'Daniel Lee', role: StakeholderRole.SONGWRITER, country: 'South Korea', bio: 'Songwriter known for catchy hooks and emotional lyrics.' }),
            stakeholderRepo.create({ name: 'Elena Novak', role: StakeholderRole.ENGINEER, country: 'Germany', bio: 'Audio engineer with experience in mixing and mastering.' }),
        ];
        await stakeholderRepo.save(stakeholders);
        logger.info(`Seeded ${stakeholders.length} stakeholders`);

        logger.info('Seeding advertisements...');
        const ads = [
            adRepo.create({
                title: 'Premium Upgrade',
                content: 'Go ad-free and download songs for offline listening.',
                duration: 30,
                targetAudience: 'Free users',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
            }),
            adRepo.create({
                title: 'Family Plan Offer',
                content: 'Get up to 6 accounts with one subscription.',
                duration: 25,
                targetAudience: 'Existing premium users',
                startDate: new Date('2024-03-01'),
                endDate: undefined,
            }),
            adRepo.create({
                title: 'New Headphones',
                content: 'Experience your music with high-fidelity wireless headphones.',
                duration: 20,
                targetAudience: 'Music enthusiasts',
                startDate: new Date('2024-02-10'),
                endDate: new Date('2024-08-10'),
            }),
        ];
        await adRepo.save(ads);
        logger.info(`Seeded ${ads.length} advertisements`);

        logger.info('Seeding artists...');
        const artistsData = [
            { name: 'Aurora Echo', bio: 'Indie pop band known for dreamy synths and emotional lyrics.', country: 'USA', debutYear: 2015, profileImageUrl: 'https://example.com/images/aurora_echo.jpg' },
            { name: 'Neon Pulse', bio: 'Electronic duo producing upbeat synthwave and EDM tracks.', country: 'UK', debutYear: 2018, profileImageUrl: 'https://example.com/images/neon_pulse.jpg' },
            { name: 'Midnight Lo-fi', bio: 'Producer focused on chill lo-fi beats for studying and relaxing.', country: 'Japan', debutYear: 2020, profileImageUrl: 'https://example.com/images/midnight_lofi.jpg' },
            { name: 'Global Beats Collective', bio: 'International group blending hip-hop, pop, and world music.', country: 'Germany', debutYear: 2012, profileImageUrl: 'https://example.com/images/global_beats.jpg' },
            { name: 'Skyline Stories', bio: 'Indie band inspired by city life and rooftops.', country: 'Canada', debutYear: 2017, profileImageUrl: 'https://example.com/images/skyline_stories.jpg' },
            { name: 'Desert Bloom', bio: 'Alternative rock band with desert vibes.', country: 'Australia', debutYear: 2014, profileImageUrl: 'https://example.com/images/desert_bloom.jpg' },
            { name: 'Ocean Drive', bio: 'Producer duo making coastal electronic tracks.', country: 'Portugal', debutYear: 2019, profileImageUrl: 'https://example.com/images/ocean_drive.jpg' },
            { name: 'Retro Waves', bio: '80s-inspired synth-pop project.', country: 'France', debutYear: 2011, profileImageUrl: 'https://example.com/images/retro_waves.jpg' },
        ];

        await artistRepo.save(artistsData);
        logger.info(`Seeded ${artistsData.length} artists`);

        await queryRunner.commitTransaction();
        logger.info('Base data seeding completed successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        logger.error('Error seeding base data:', error);
        throw error;
    } finally {
        await queryRunner.release();
    }
}

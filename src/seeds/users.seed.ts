import bcrypt from 'bcrypt';
import AppDataSource from '../configs/data-source';
import { logger } from '../configs/winston.config';
import { User, UserRole } from '../entities';

const saltRounds = 10;

export async function seedUsers(): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const userRepo = queryRunner.manager.getRepository(User);

        const existingUsers = await userRepo.count();
        if (existingUsers > 0) {
            logger.info('Users already exist. Skipping user seed.');
            await queryRunner.rollbackTransaction();
            return;
        }

        logger.info('Seeding users...');

        const defaultPassword = 'password123';
        const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);

        const usersData = [
            {
                name: 'Emma Johnson',
                email: 'emma@example.com',
                passwordHash,
                role: UserRole.USER,
                birthDate: new Date('2000-05-14'),
                profileImageUrl: 'https://example.com/avatars/emma.jpg',
                isVerified: true,
            },
            {
                name: 'Liam Brown',
                email: 'liam@example.com',
                passwordHash,
                role: UserRole.USER,
                birthDate: new Date('1998-11-02'),
                profileImageUrl: 'https://example.com/avatars/liam.jpg',
                isVerified: false,
            },
            {
                name: 'Sofia Martinez',
                email: 'sofia@example.com',
                passwordHash,
                role: UserRole.USER,
                birthDate: new Date('1995-03-22'),
                profileImageUrl: 'https://example.com/avatars/sofia.jpg',
                isVerified: true,
            },
            {
                name: 'Noah Kim',
                email: 'noah@example.com',
                passwordHash,
                role: UserRole.USER,
                birthDate: new Date('1999-07-30'),
                profileImageUrl: 'https://example.com/avatars/noah.jpg',
                isVerified: true,
            },
            {
                name: 'Ava Rossi',
                email: 'ava@example.com',
                passwordHash,
                role: UserRole.USER,
                birthDate: new Date('2001-09-10'),
                profileImageUrl: 'https://example.com/avatars/ava.jpg',
                isVerified: false,
            },
        ];

        await userRepo.save(usersData);
        logger.info(`Seeded ${usersData.length} users (password: ${defaultPassword})`);

        await queryRunner.commitTransaction();
        logger.info('Users seeding completed successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        logger.error('Error seeding users:', error);
        throw error;
    } finally {
        await queryRunner.release();
    }
}


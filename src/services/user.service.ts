import bcrypt from 'bcrypt';

import { User, UserRole } from '../entities';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { UserRepository } from '../repositories';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw AppError.conflict('User with this email already exists');
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);

        return this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            passwordHash,
            role: createUserDto.role || UserRole.USER,
            birthDate: createUserDto.birthDate ? new Date(createUserDto.birthDate) : undefined,
            profileImageUrl: createUserDto.profileImageUrl,
            isVerified: createUserDto.isVerified || false,
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw AppError.notFound('User not found');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
            if (existingUser) {
                throw AppError.conflict('User with this email already exists');
            }
        }

        const updateData: Partial<User> = {};
        if (updateUserDto.name !== undefined) updateData.name = updateUserDto.name;
        if (updateUserDto.email !== undefined) updateData.email = updateUserDto.email;
        if (updateUserDto.role !== undefined) updateData.role = updateUserDto.role;
        if (updateUserDto.birthDate !== undefined) {
            updateData.birthDate = new Date(updateUserDto.birthDate);
        }
        if (updateUserDto.profileImageUrl !== undefined) {
            updateData.profileImageUrl = updateUserDto.profileImageUrl;
        }
        if (updateUserDto.isVerified !== undefined) {
            updateData.isVerified = updateUserDto.isVerified;
        }
        if (updateUserDto.password) {
            const saltRounds = 10;
            updateData.passwordHash = await bcrypt.hash(updateUserDto.password, saltRounds);
        }

        const updated = await this.userRepository.update(id, updateData);
        if (!updated) {
            throw AppError.notFound('User not found');
        }
        return updated;
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.delete(id);
    }
}

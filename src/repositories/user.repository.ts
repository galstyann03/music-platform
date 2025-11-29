import { Repository } from 'typeorm';
import { User } from '../entities';

export class UserRepository {
    constructor(private readonly repo: Repository<User>) {}

    async findAll(): Promise<User[]> {
        return this.repo.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number): Promise<User | null> {
        return this.repo.findOne({
            where: { userId: id },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repo.findOne({
            where: { email },
        });
    }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.repo.create(user);
        return this.repo.save(newUser);
    }

    async update(id: number, updatedFields: Partial<User>): Promise<User | null> {
        const user = await this.repo.findOneBy({ userId: id });
        if (!user) return null;
        Object.assign(user, updatedFields);
        return this.repo.save(user);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete({ userId: id });
        return result.affected !== 0;
    }
}


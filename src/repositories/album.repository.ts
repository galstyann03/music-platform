import { Repository } from 'typeorm';
import { Album } from '../entities';

export class AlbumRepository {
    constructor(private readonly repo: Repository<Album>) {}

    async findAll(): Promise<Album[]> {
        return this.repo.find({
            relations: ['artist'],
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number): Promise<Album | null> {
        return this.repo.findOne({
            where: { albumId: id },
            relations: ['artist'],
        });
    }

    async create(album: Partial<Album>): Promise<Album> {
        const newAlbum = this.repo.create(album);
        return this.repo.save(newAlbum);
    }

    async update(id: number, updatedFields: Partial<Album>): Promise<Album | null> {
        const album = await this.repo.findOneBy({ albumId: id });
        if (!album) return null;
        Object.assign(album, updatedFields);
        return this.repo.save(album);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete({ albumId: id });
        return result.affected !== 0;
    }
}


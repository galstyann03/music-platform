import { Repository } from 'typeorm';
import { Artist } from '../entities';

export class ArtistRepository {
    constructor(private readonly repo: Repository<Artist>) {}

    async findAll(): Promise<Artist[]> {
        return this.repo.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number): Promise<Artist | null> {
        return this.repo.findOne({
            where: { artistId: id },
        });
    }

    async create(artist: Partial<Artist>): Promise<Artist> {
        const newArtist = this.repo.create(artist);
        return this.repo.save(newArtist);
    }

    async update(id: number, updatedFields: Partial<Artist>): Promise<Artist | null> {
        const artist = await this.repo.findOneBy({ artistId: id });
        if (!artist) return null;
        Object.assign(artist, updatedFields);
        return this.repo.save(artist);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete({ artistId: id });
        return result.affected !== 0;
    }
}


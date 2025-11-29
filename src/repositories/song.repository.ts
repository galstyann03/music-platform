import { Repository } from 'typeorm';
import { Song } from '../entities';

export class SongRepository {
    constructor(private readonly repo: Repository<Song>) {}

    async findAll(): Promise<Song[]> {
        return this.repo.find({
            relations: ['album', 'album.artist'],
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number): Promise<Song | null> {
        return this.repo.findOne({
            where: { songId: id },
            relations: ['album', 'album.artist'],
        });
    }

    async create(song: Partial<Song>): Promise<Song> {
        const newSong = this.repo.create(song);
        return this.repo.save(newSong);
    }

    async update(id: number, updatedFields: Partial<Song>): Promise<Song | null> {
        const song = await this.repo.findOneBy({ songId: id });
        if (!song) return null;
        Object.assign(song, updatedFields);
        return this.repo.save(song);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete({ songId: id });
        return result.affected !== 0;
    }
}


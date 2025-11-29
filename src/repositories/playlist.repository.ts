import { Repository } from 'typeorm';
import { Playlist } from '../entities';

export class PlaylistRepository {
    constructor(private readonly repo: Repository<Playlist>) {}

    async findAll(): Promise<Playlist[]> {
        return this.repo.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number): Promise<Playlist | null> {
        return this.repo.findOne({
            where: { playlistId: id },
            relations: ['user'],
        });
    }

    async create(playlist: Partial<Playlist>): Promise<Playlist> {
        const newPlaylist = this.repo.create(playlist);
        return this.repo.save(newPlaylist);
    }

    async update(id: number, updatedFields: Partial<Playlist>): Promise<Playlist | null> {
        const playlist = await this.repo.findOneBy({ playlistId: id });
        if (!playlist) return null;
        Object.assign(playlist, updatedFields);
        return this.repo.save(playlist);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete({ playlistId: id });
        return result.affected !== 0;
    }
}


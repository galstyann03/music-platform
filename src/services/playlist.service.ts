import { Playlist } from '../entities';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { PlaylistRepository, UserRepository } from '../repositories';

export class PlaylistService {
    constructor(
        private readonly playlistRepository: PlaylistRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
        const user = await this.userRepository.findById(createPlaylistDto.userId);
        if (!user) {
            throw AppError.notFound('User not found');
        }

        return this.playlistRepository.create({
            userId: createPlaylistDto.userId,
            title: createPlaylistDto.title,
            description: createPlaylistDto.description,
            isPublic: createPlaylistDto.isPublic || false,
        });
    }

    async findAll(): Promise<Playlist[]> {
        return this.playlistRepository.findAll();
    }

    async findOne(id: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.findById(id);
        if (!playlist) {
            throw AppError.notFound('Playlist not found');
        }
        return playlist;
    }

    async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
        const updateData: Partial<Playlist> = {};
        if (updatePlaylistDto.title !== undefined) updateData.title = updatePlaylistDto.title;
        if (updatePlaylistDto.description !== undefined) {
            updateData.description = updatePlaylistDto.description;
        }
        if (updatePlaylistDto.isPublic !== undefined) {
            updateData.isPublic = updatePlaylistDto.isPublic;
        }

        const updated = await this.playlistRepository.update(id, updateData);
        if (!updated) {
            throw AppError.notFound('Playlist not found');
        }
        return updated;
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.playlistRepository.delete(id);
    }
}

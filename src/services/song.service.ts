import { Song } from '../entities';
import { CreateSongDto, UpdateSongDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { SongRepository, AlbumRepository } from '../repositories';

export class SongService {
    constructor(
        private readonly songRepository: SongRepository,
        private readonly albumRepository: AlbumRepository,
    ) {}

    async create(createSongDto: CreateSongDto): Promise<Song> {
        if (createSongDto.albumId) {
            const album = await this.albumRepository.findById(createSongDto.albumId);
            if (!album) {
                throw AppError.notFound('Album not found');
            }
        }

        return this.songRepository.create({
            title: createSongDto.title,
            albumId: createSongDto.albumId,
            duration: createSongDto.duration,
            releaseDate: createSongDto.releaseDate ? new Date(createSongDto.releaseDate) : undefined,
            language: createSongDto.language,
            lyrics: createSongDto.lyrics,
        });
    }

    async findAll(): Promise<Song[]> {
        return this.songRepository.findAll();
    }

    async findOne(id: number): Promise<Song> {
        const song = await this.songRepository.findById(id);
        if (!song) {
            throw AppError.notFound('Song not found');
        }
        return song;
    }

    async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
        if (updateSongDto.albumId !== undefined && updateSongDto.albumId !== null) {
            const album = await this.albumRepository.findById(updateSongDto.albumId);
            if (!album) {
                throw AppError.notFound('Album not found');
            }
        }

        const updateData: Partial<Song> = {};
        if (updateSongDto.title !== undefined) updateData.title = updateSongDto.title;
        if (updateSongDto.albumId !== undefined) {
            updateData.albumId = updateSongDto.albumId || undefined;
        }
        if (updateSongDto.duration !== undefined) updateData.duration = updateSongDto.duration;
        if (updateSongDto.releaseDate !== undefined) {
            updateData.releaseDate = new Date(updateSongDto.releaseDate);
        }
        if (updateSongDto.language !== undefined) updateData.language = updateSongDto.language;
        if (updateSongDto.lyrics !== undefined) updateData.lyrics = updateSongDto.lyrics;

        const updated = await this.songRepository.update(id, updateData);
        if (!updated) {
            throw AppError.notFound('Song not found');
        }
        return updated;
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.songRepository.delete(id);
    }
}

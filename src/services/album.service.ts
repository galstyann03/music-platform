import { Album } from '../entities';
import { CreateAlbumDto, UpdateAlbumDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { AlbumRepository, ArtistRepository } from '../repositories';

export class AlbumService {
    constructor(
        private readonly albumRepository: AlbumRepository,
        private readonly artistRepository: ArtistRepository,
    ) {}

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        const artist = await this.artistRepository.findById(createAlbumDto.artistId);
        if (!artist) {
            throw AppError.notFound('Artist not found');
        }

        return this.albumRepository.create({
            title: createAlbumDto.title,
            artistId: createAlbumDto.artistId,
            releaseDate: createAlbumDto.releaseDate ? new Date(createAlbumDto.releaseDate) : undefined,
            coverImageUrl: createAlbumDto.coverImageUrl,
        });
    }

    async findAll(): Promise<Album[]> {
        return this.albumRepository.findAll();
    }

    async findOne(id: number): Promise<Album> {
        const album = await this.albumRepository.findById(id);
        if (!album) {
            throw AppError.notFound('Album not found');
        }
        return album;
    }

    async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        if (updateAlbumDto.artistId !== undefined) {
            const artist = await this.artistRepository.findById(updateAlbumDto.artistId);
            if (!artist) {
                throw AppError.notFound('Artist not found');
            }
        }

        const updateData: Partial<Album> = {};
        if (updateAlbumDto.title !== undefined) updateData.title = updateAlbumDto.title;
        if (updateAlbumDto.artistId !== undefined) updateData.artistId = updateAlbumDto.artistId;
        if (updateAlbumDto.releaseDate !== undefined) {
            updateData.releaseDate = new Date(updateAlbumDto.releaseDate);
        }
        if (updateAlbumDto.coverImageUrl !== undefined) {
            updateData.coverImageUrl = updateAlbumDto.coverImageUrl;
        }

        const updated = await this.albumRepository.update(id, updateData);
        if (!updated) {
            throw AppError.notFound('Album not found');
        }
        return updated;
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.albumRepository.delete(id);
    }
}

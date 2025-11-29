import { Artist } from '../entities';
import { CreateArtistDto, UpdateArtistDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { ArtistRepository } from '../repositories';

export class ArtistService {
    constructor(private readonly artistRepository: ArtistRepository) {}

    async create(createArtistDto: CreateArtistDto): Promise<Artist> {
        return this.artistRepository.create(createArtistDto);
    }

    async findAll(): Promise<Artist[]> {
        return this.artistRepository.findAll();
    }

    async findOne(id: number): Promise<Artist> {
        const artist = await this.artistRepository.findById(id);
        if (!artist) {
            throw AppError.notFound('Artist not found');
        }
        return artist;
    }

    async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const updateData: Partial<Artist> = {};
        if (updateArtistDto.name !== undefined) updateData.name = updateArtistDto.name;
        if (updateArtistDto.bio !== undefined) updateData.bio = updateArtistDto.bio;
        if (updateArtistDto.country !== undefined) updateData.country = updateArtistDto.country;
        if (updateArtistDto.debutYear !== undefined) updateData.debutYear = updateArtistDto.debutYear;
        if (updateArtistDto.profileImageUrl !== undefined) {
            updateData.profileImageUrl = updateArtistDto.profileImageUrl;
        }

        const updated = await this.artistRepository.update(id, updateData);
        if (!updated) {
            throw AppError.notFound('Artist not found');
        }
        return updated;
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.artistRepository.delete(id);
    }
}

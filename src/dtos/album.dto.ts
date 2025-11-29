import { IsString, IsOptional, IsInt, IsDateString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @MaxLength(200)
        title!: string;

    @IsInt()
        artistId!: number;

    @IsDateString()
    @IsOptional()
        releaseDate?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
        coverImageUrl?: string;
}

export class UpdateAlbumDto {
    @IsString()
    @MaxLength(200)
    @IsOptional()
        title?: string;

    @IsInt()
    @IsOptional()
        artistId?: number;

    @IsDateString()
    @IsOptional()
        releaseDate?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
        coverImageUrl?: string;
}


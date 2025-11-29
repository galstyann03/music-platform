import { IsString, IsOptional, IsInt, IsDateString, MaxLength, Min } from 'class-validator';

export class CreateSongDto {
    @IsString()
    @MaxLength(200)
        title!: string;

    @IsInt()
    @IsOptional()
        albumId?: number;

    @IsInt()
    @Min(1)
        duration!: number;

    @IsDateString()
    @IsOptional()
        releaseDate?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
        language?: string;

    @IsString()
    @IsOptional()
        lyrics?: string;
}

export class UpdateSongDto {
    @IsString()
    @MaxLength(200)
    @IsOptional()
        title?: string;

    @IsInt()
    @IsOptional()
        albumId?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
        duration?: number;

    @IsDateString()
    @IsOptional()
        releaseDate?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
        language?: string;

    @IsString()
    @IsOptional()
        lyrics?: string;
}


import { IsString, IsOptional, IsInt, Min, Max, MaxLength } from 'class-validator';

export class CreateArtistDto {
    @IsString()
    @MaxLength(150)
        name!: string;

    @IsString()
    @IsOptional()
        bio?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
        country?: string;

    @IsInt()
    @Min(1900)
    @Max(2100)
    @IsOptional()
        debutYear?: number;

    @IsString()
    @IsOptional()
    @MaxLength(500)
        profileImageUrl?: string;
}

export class UpdateArtistDto {
    @IsString()
    @MaxLength(150)
    @IsOptional()
        name?: string;

    @IsString()
    @IsOptional()
        bio?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
        country?: string;

    @IsInt()
    @Min(1900)
    @Max(2100)
    @IsOptional()
        debutYear?: number;

    @IsString()
    @IsOptional()
    @MaxLength(500)
        profileImageUrl?: string;
}


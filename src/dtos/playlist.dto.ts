import { IsString, IsOptional, IsInt, IsBoolean, MaxLength } from 'class-validator';

export class CreatePlaylistDto {
    @IsInt()
        userId!: number;

    @IsString()
    @MaxLength(100)
        title!: string;

    @IsString()
    @IsOptional()
        description?: string;

    @IsBoolean()
    @IsOptional()
        isPublic?: boolean;
}

export class UpdatePlaylistDto {
    @IsString()
    @MaxLength(100)
    @IsOptional()
        title?: string;

    @IsString()
    @IsOptional()
        description?: string;

    @IsBoolean()
    @IsOptional()
        isPublic?: boolean;
}


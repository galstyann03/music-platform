import { IsEmail, IsString, IsOptional, IsDateString, IsEnum, MinLength, MaxLength, IsBoolean } from 'class-validator';
import { UserRole } from '../entities';

/**
 * DTO for creating a new user
 */
export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
        name!: string;

    @IsEmail()
        email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
        password!: string;

    @IsEnum(UserRole)
    @IsOptional()
        role?: UserRole;

    @IsDateString()
    @IsOptional()
        birthDate?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
        profileImageUrl?: string;

    @IsBoolean()
    @IsOptional()
        isVerified?: boolean;
}

/**
 * DTO for updating a user
 */
export class UpdateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
        name?: string;

    @IsEmail()
    @IsOptional()
        email?: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    @IsOptional()
        password?: string;

    @IsEnum(UserRole)
    @IsOptional()
        role?: UserRole;

    @IsDateString()
    @IsOptional()
        birthDate?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
        profileImageUrl?: string;

    @IsBoolean()
    @IsOptional()
        isVerified?: boolean;
}

/**
 * DTO for user response (excludes password hash)
 */
export class UserResponseDto {
    userId!: number;
    name!: string;
    email!: string;
    role!: UserRole;
    birthDate?: Date;
    profileImageUrl?: string;
    isVerified!: boolean;
    createdAt!: Date;
}


import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { UserService } from '../services';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { logger } from '../configs/winston.config';

export class UserController {
    constructor(private readonly userService: UserService) {}

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dto = plainToInstance(CreateUserDto, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const user = await this.userService.create(dto);
            const userResponse = plainToInstance(UserResponseDto, user, {
                excludeExtraneousValues: false,
            });
            delete (userResponse as any).passwordHash;

            res.status(201).json({
                message: 'User created successfully',
                data: userResponse,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Create user failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(err);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.userService.findAll();
            const usersResponse = users.map(user => {
                const userResponse = plainToInstance(UserResponseDto, user, {
                    excludeExtraneousValues: false,
                });
                delete (userResponse as any).passwordHash;
                return userResponse;
            });

            res.status(200).json({
                message: 'Users retrieved successfully',
                data: usersResponse,
                count: usersResponse.length,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Get all users failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(err);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid user ID'));
                return;
            }

            const user = await this.userService.findOne(id);
            const userResponse = plainToInstance(UserResponseDto, user, {
                excludeExtraneousValues: false,
            });
            delete (userResponse as any).passwordHash;

            res.status(200).json({
                message: 'User retrieved successfully',
                data: userResponse,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Get user by ID failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid user ID'));
                return;
            }

            const dto = plainToInstance(UpdateUserDto, req.body);
            const errors = await validate(dto, { skipMissingProperties: true });

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const user = await this.userService.update(id, dto);
            const userResponse = plainToInstance(UserResponseDto, user, {
                excludeExtraneousValues: false,
            });
            delete (userResponse as any).passwordHash;

            res.status(200).json({
                message: 'User updated successfully',
                data: userResponse,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Update user failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(err);
        }
    };

    remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid user ID'));
                return;
            }

            await this.userService.remove(id);

            res.status(200).json({
                message: 'User deleted successfully',
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Delete user failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(err);
        }
    };
}

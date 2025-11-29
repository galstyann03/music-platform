import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { AlbumService } from '../services';
import { CreateAlbumDto, UpdateAlbumDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { logger } from '../configs/winston.config';

export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dto = plainToInstance(CreateAlbumDto, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const album = await this.albumService.create(dto);
            res.status(201).json({ message: 'Album created successfully', data: album });
        } catch (err) {
            logger.error(`Create album failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const albums = await this.albumService.findAll();
            res.status(200).json({ message: 'Albums retrieved successfully', data: albums, count: albums.length });
        } catch (err) {
            logger.error(`Get all albums failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid album ID'));
                return;
            }

            const album = await this.albumService.findOne(id);
            res.status(200).json({ message: 'Album retrieved successfully', data: album });
        } catch (err) {
            logger.error(`Get album by ID failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid album ID'));
                return;
            }

            const dto = plainToInstance(UpdateAlbumDto, req.body);
            const errors = await validate(dto, { skipMissingProperties: true });

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const album = await this.albumService.update(id, dto);
            res.status(200).json({ message: 'Album updated successfully', data: album });
        } catch (err) {
            logger.error(`Update album failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid album ID'));
                return;
            }

            await this.albumService.remove(id);
            res.status(200).json({ message: 'Album deleted successfully' });
        } catch (err) {
            logger.error(`Delete album failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };
}


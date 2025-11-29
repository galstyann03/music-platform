import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ArtistService } from '../services';
import { CreateArtistDto, UpdateArtistDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { logger } from '../configs/winston.config';

export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dto = plainToInstance(CreateArtistDto, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const artist = await this.artistService.create(dto);
            res.status(201).json({ message: 'Artist created successfully', data: artist });
        } catch (err) {
            logger.error(`Create artist failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const artists = await this.artistService.findAll();
            res.status(200).json({ message: 'Artists retrieved successfully', data: artists, count: artists.length });
        } catch (err) {
            logger.error(`Get all artists failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid artist ID'));
                return;
            }

            const artist = await this.artistService.findOne(id);
            res.status(200).json({ message: 'Artist retrieved successfully', data: artist });
        } catch (err) {
            logger.error(`Get artist by ID failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid artist ID'));
                return;
            }

            const dto = plainToInstance(UpdateArtistDto, req.body);
            const errors = await validate(dto, { skipMissingProperties: true });

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const artist = await this.artistService.update(id, dto);
            res.status(200).json({ message: 'Artist updated successfully', data: artist });
        } catch (err) {
            logger.error(`Update artist failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid artist ID'));
                return;
            }

            await this.artistService.remove(id);
            res.status(200).json({ message: 'Artist deleted successfully' });
        } catch (err) {
            logger.error(`Delete artist failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };
}


import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SongService } from '../services';
import { CreateSongDto, UpdateSongDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { logger } from '../configs/winston.config';

export class SongController {
    constructor(private readonly songService: SongService) {}

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dto = plainToInstance(CreateSongDto, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const song = await this.songService.create(dto);
            res.status(201).json({ message: 'Song created successfully', data: song });
        } catch (err) {
            logger.error(`Create song failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const songs = await this.songService.findAll();
            res.status(200).json({ message: 'Songs retrieved successfully', data: songs, count: songs.length });
        } catch (err) {
            logger.error(`Get all songs failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid song ID'));
                return;
            }

            const song = await this.songService.findOne(id);
            res.status(200).json({ message: 'Song retrieved successfully', data: song });
        } catch (err) {
            logger.error(`Get song by ID failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid song ID'));
                return;
            }

            const dto = plainToInstance(UpdateSongDto, req.body);
            const errors = await validate(dto, { skipMissingProperties: true });

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const song = await this.songService.update(id, dto);
            res.status(200).json({ message: 'Song updated successfully', data: song });
        } catch (err) {
            logger.error(`Update song failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid song ID'));
                return;
            }

            await this.songService.remove(id);
            res.status(200).json({ message: 'Song deleted successfully' });
        } catch (err) {
            logger.error(`Delete song failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };
}


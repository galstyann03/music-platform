import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { PlaylistService } from '../services';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { logger } from '../configs/winston.config';

export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dto = plainToInstance(CreatePlaylistDto, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const playlist = await this.playlistService.create(dto);
            res.status(201).json({ message: 'Playlist created successfully', data: playlist });
        } catch (err) {
            logger.error(`Create playlist failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const playlists = await this.playlistService.findAll();
            res.status(200).json({ message: 'Playlists retrieved successfully', data: playlists, count: playlists.length });
        } catch (err) {
            logger.error(`Get all playlists failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid playlist ID'));
                return;
            }

            const playlist = await this.playlistService.findOne(id);
            res.status(200).json({ message: 'Playlist retrieved successfully', data: playlist });
        } catch (err) {
            logger.error(`Get playlist by ID failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid playlist ID'));
                return;
            }

            const dto = plainToInstance(UpdatePlaylistDto, req.body);
            const errors = await validate(dto, { skipMissingProperties: true });

            if (errors.length > 0) {
                next(errors);
                return;
            }

            const playlist = await this.playlistService.update(id, dto);
            res.status(200).json({ message: 'Playlist updated successfully', data: playlist });
        } catch (err) {
            logger.error(`Update playlist failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };

    remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                next(AppError.badRequest('Invalid playlist ID'));
                return;
            }

            await this.playlistService.remove(id);
            res.status(200).json({ message: 'Playlist deleted successfully' });
        } catch (err) {
            logger.error(`Delete playlist failed: ${err instanceof Error ? err.message : 'Unexpected error'}`);
            next(err);
        }
    };
}


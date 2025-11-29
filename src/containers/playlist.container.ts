import AppDataSource from '../configs/data-source';
import { Playlist, User } from '../entities';
import { PlaylistRepository, UserRepository } from '../repositories';
import { PlaylistService } from '../services';
import { PlaylistController } from '../controllers';

const playlistRepository = new PlaylistRepository(AppDataSource.getRepository(Playlist));
const userRepository = new UserRepository(AppDataSource.getRepository(User));
const playlistService = new PlaylistService(playlistRepository, userRepository);
export const playlistController = new PlaylistController(playlistService);

import AppDataSource from '../configs/data-source';
import { Song, Album } from '../entities';
import { SongRepository, AlbumRepository } from '../repositories';
import { SongService } from '../services';
import { SongController } from '../controllers';

const songRepository = new SongRepository(AppDataSource.getRepository(Song));
const albumRepository = new AlbumRepository(AppDataSource.getRepository(Album));
const songService = new SongService(songRepository, albumRepository);
export const songController = new SongController(songService);

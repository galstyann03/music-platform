import AppDataSource from '../configs/data-source';
import { Album, Artist } from '../entities';
import { AlbumRepository, ArtistRepository } from '../repositories';
import { AlbumService } from '../services';
import { AlbumController } from '../controllers';

const albumRepository = new AlbumRepository(AppDataSource.getRepository(Album));
const artistRepository = new ArtistRepository(AppDataSource.getRepository(Artist));
const albumService = new AlbumService(albumRepository, artistRepository);
export const albumController = new AlbumController(albumService);

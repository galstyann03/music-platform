import AppDataSource from '../configs/data-source';
import { Artist } from '../entities';
import { ArtistRepository } from '../repositories';
import { ArtistService } from '../services';
import { ArtistController } from '../controllers';

const artistRepository = new ArtistRepository(AppDataSource.getRepository(Artist));
const artistService = new ArtistService(artistRepository);
export const artistController = new ArtistController(artistService);

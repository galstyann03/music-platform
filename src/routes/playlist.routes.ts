import { Router } from 'express';
import { playlistController } from '../containers/playlist.container';

const playlistRouter = Router();

playlistRouter.post('/', playlistController.create);
playlistRouter.get('/', playlistController.findAll);
playlistRouter.get('/:id', playlistController.findOne);
playlistRouter.put('/:id', playlistController.update);
playlistRouter.delete('/:id', playlistController.remove);

export default playlistRouter;

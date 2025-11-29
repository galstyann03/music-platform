import { Router } from 'express';
import { songController } from '../containers/song.container';

const songRouter = Router();

songRouter.post('/', songController.create);
songRouter.get('/', songController.findAll);
songRouter.get('/:id', songController.findOne);
songRouter.put('/:id', songController.update);
songRouter.delete('/:id', songController.remove);

export default songRouter;

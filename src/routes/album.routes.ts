import { Router } from 'express';
import { albumController } from '../containers/album.container';

const albumRouter = Router();

albumRouter.post('/', albumController.create);
albumRouter.get('/', albumController.findAll);
albumRouter.get('/:id', albumController.findOne);
albumRouter.put('/:id', albumController.update);
albumRouter.delete('/:id', albumController.remove);

export default albumRouter;

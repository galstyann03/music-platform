import { Router } from 'express';
import { artistController } from '../containers/artist.container';

const artistRouter = Router();

artistRouter.post('/', artistController.create);
artistRouter.get('/', artistController.findAll);
artistRouter.get('/:id', artistController.findOne);
artistRouter.put('/:id', artistController.update);
artistRouter.delete('/:id', artistController.remove);

export default artistRouter;

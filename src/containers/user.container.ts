import AppDataSource from '../configs/data-source';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { UserService } from '../services';
import { UserController } from '../controllers';

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { GetAllUserUseCase } from "../application/GetAllUserUseCase";

import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllUserController } from "./controllers/GetAllUserController";

import { MysqlUserRepository } from "./MysqlUserRepository";

export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase( mysqlUserRepository );
export const getAllUseCase = new GetAllUserUseCase( mysqlUserRepository );


export const createUserController = new CreateUserController(
  createUserUseCase
);
export const getAllUserController = new GetAllUserController(
  getAllUseCase
);


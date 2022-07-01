import "reflect-metadata";
import { DataSource } from 'typeorm';
import { Servidor } from '../models/Servidor';
import { CreateServidores1656694737087 } from "./migrations/1656694737087-CreateServidores";

export const APPDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'api_servidores',
  password: 'api_password',
  database: 'api_database',
  synchronize: true,
  logging: false,
  entities: [Servidor],
  migrations: [CreateServidores1656694737087],
  subscribers: [],
});
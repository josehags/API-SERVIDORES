import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Phone } from '../models/Phone';
import { Servidor } from '../models/Servidor';
import { CreateServidores1656694737087 } from './migrations/1656694737087-CreateServidores';
import { CreatePhone1658326843536 } from './migrations/1658326843536-CreatePhone';
import { AddServerIdToPhones1658432483132 } from './migrations/1658432483132-AddServerIdToPhones';

export const APPDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'api_servidores',
  password: 'api_password',
  database: 'api_database',
  synchronize: true,
  logging: false,
  entities: [Servidor, Phone],
  migrations: [
    CreateServidores1656694737087,
    CreatePhone1658326843536,
    AddServerIdToPhones1658432483132,
  ],
  subscribers: [],
});

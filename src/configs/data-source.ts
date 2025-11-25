import { DataSource } from 'typeorm';

import { config } from './config';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: false,
    logging: true,
    logger: 'formatted-console',
    entities: [`${ __dirname }/../entities/*.{js,ts}`],
    migrations: [`${ __dirname }/../migrations/*.{js,ts}`],
    subscribers: [],
});

export default AppDataSource;

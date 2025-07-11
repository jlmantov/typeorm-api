import "reflect-metadata"
import { DataSource } from "typeorm"

console.log('--- Attempting to initialize AppDataSource ---');

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.TYPEORM_HOST || "localhost",
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME || "test",
    password: process.env.TYPEORM_PASSWORD || "test",
    database: process.env.TYPEORM_DATABASE || "test",
    synchronize: !!(process.env.TYPEORM_SYNCHRONIZE === 'true'), // Correct way to parse boolean from string
    logging: process.env.TYPEORM_LOGGING === 'true' ? true : (process.env.TYPEORM_LOGGING === 'false' ? false : 'all'), // Correctly parse logging
    entities: [
        process.env.TYPEORM_ENTITIES
    ],
    migrations: [
        process.env.TYPEORM_MIGRATIONS
    ],
    subscribers: [
        process.env.TYPEORM_SUBSCRIBERS
    ],
})

console.log("ORM DB connection: " + AppDataSource.options.database +"@"+ process.env.TYPEORM_HOST +":"+ process.env.TYPEORM_PORT);
console.log("synchronize: " + process.env.TYPEORM_SYNCHRONIZE);
console.log("entities: " + process.env.TYPEORM_ENTITIES);
console.log("migrations: " + process.env.TYPEORM_MIGRATIONS);
console.log('--- AppDataSource initialized ---'); // This log will still appear if the file is loaded

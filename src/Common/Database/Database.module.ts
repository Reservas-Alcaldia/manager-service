import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sala } from "src/Entities/sala.entity";
import { Secretaria } from "src/Entities/secretaria.entity";
import { Solicitud } from "src/Entities/solicitud.entity";
import { Connection } from "typeorm";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as  "mssql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                Sala,
                Secretaria,
                Solicitud
            ],
            synchronize: false,
        })
    ]
})
export class DatabaseModule {
    constructor(private readonly connection: Connection) {}
}
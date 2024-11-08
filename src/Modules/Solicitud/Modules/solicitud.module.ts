import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SolicitudController } from "../Controllers/solicitud.controller";
import { SolicitudService } from "../Services/solicitud.service";
import { Solicitud } from "src/Entities/solicitud.entity"; 
import { Secretaria } from "src/Entities/secretaria.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Solicitud, Secretaria])],
    controllers: [SolicitudController],
    providers: [SolicitudService],
})
export class SolicitudModule {}
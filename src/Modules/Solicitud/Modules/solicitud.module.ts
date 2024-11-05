import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SolicitudController } from "../Controllers/solicitud.controller";
import { SolicitudService } from "../Services/solicitud.service";
import { Solicitud } from "src/Entities/solicitud.entity"; 

@Module({
    imports: [TypeOrmModule.forFeature([Solicitud])],
    controllers: [SolicitudController],
    providers: [SolicitudService],
})
export class SolicitudModule {}
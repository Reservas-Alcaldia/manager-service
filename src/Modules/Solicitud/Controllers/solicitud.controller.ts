import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { SolicitudService } from "../Services/solicitud.service";
import { SolicitudDto } from "../Dtos/solicitud.dto";

@Controller('solicitud')
export class SolicitudController {
    constructor(private readonly solicitudService: SolicitudService) {}

    @Post('/create')
    async createSolicitud(@Body() solicitudDto: SolicitudDto) {
      return this.solicitudService.createSolicitud(solicitudDto);
    }
}
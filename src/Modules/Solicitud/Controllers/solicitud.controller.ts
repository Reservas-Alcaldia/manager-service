import { Controller } from "@nestjs/common";
import { SolicitudService } from "../Services/solicitud.service";

@Controller('solicitud')
export class SolicitudController {
    constructor(private readonly solicitudService: SolicitudService) {}
}
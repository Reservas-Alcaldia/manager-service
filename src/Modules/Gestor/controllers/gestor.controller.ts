import { Controller, Get, HttpStatus } from '@nestjs/common';
import { GestorService } from '../Services/gestor.service';

@Controller('solicitudes')
export class GestorController {
  constructor(private readonly gestorService: GestorService) {}

  @Get('/approved')
  async getSolicitudesAprobadas() {
    const solicitudes = await this.gestorService.getSolicitudesAprobadas();
    return this.createResponse(solicitudes);
  }

  @Get('/notapproved')
  async getSolicitudesNoAprobadas() {
    const solicitudes = await this.gestorService.getSolicitudesNoAprobadas();
    return this.createResponse(solicitudes);
  }

  @Get('/toapprove')
  async getSolicitudesEnEspera() {
    const solicitudes = await this.gestorService.getSolicitudesEnEspera();
    return this.createResponse(solicitudes);
  }
  
  private createResponse(data: any) {
    return {
      status: HttpStatus.OK,
      message: 'ok',
      data: data,
    };
  }
}

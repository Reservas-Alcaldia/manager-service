import { Body, Controller, Get, HttpStatus, Param, Put } from '@nestjs/common';
import { GestorService } from '../Services/gestor.service';

@Controller('solicitudes')
export class GestorController {
  constructor(private readonly gestorService: GestorService) {}

  @Get('/all')
  async getAllSolicitudes() {
    const solicitudes = await this.gestorService.getAllSolicitudes();
    return this.createResponse(solicitudes);
  }

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

  @Put('/approve/:id')
  async aprobarSolicitud(
    @Param('id') id: number,
    @Body() body: { salaId: number; horaInicio?: string; horaFin?: string },
  ) {
    const solicitudAprobada = await this.gestorService.aprobarSolicitud(
      id,
      body.salaId,
      body.horaInicio,
      body.horaFin,
    );
    return {
      status: HttpStatus.OK,
      message: `La solicitud con ID: ${id} ha sido aprobada.`,
    };
  }

  @Put('/disapprove/:id')
  async rechazarSolicitud(
    @Param('id') id: number,
  ) {
    const solicitudAprobada = await this.gestorService.rechazarSolicitud(id);
    return {
      status: HttpStatus.BAD_REQUEST,
      message: `La solicitud con ID: ${id} ha sido rechazada.`,
    };
  }
  
  private createResponse(data: any) {
    return {
      status: HttpStatus.OK,
      message: 'ok',
      data: data,
    };
  }

}

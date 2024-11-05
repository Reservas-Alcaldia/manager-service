import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { SalasService } from '../Services/salas.service'; 

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}
  
  @Get('/disponibilidad-individual/:id')
  async verificarIndividual(@Param('id') idSolicitud: number) {
    const salas = await this.salasService.verificarDisponibilidadIndividual(idSolicitud);
    return this.createResponse(salas)
  }

  @Get('/disponibilidad-combinada/:id')
  async verificarCombinadas(@Param('id') idSolicitud: number) {
    const salas = await this.salasService.verificarDisponibilidadCombinada(idSolicitud);
    return this.createResponse(salas)
  }

  @Get('/intervalos-individual/:id')
  async obtenerIntervalosDisponibles(@Param('id') idSolicitud: number) {
    const intervalos = await this.salasService.obtenerIntervalosIndividuales(idSolicitud);
    return this.createResponse(intervalos);
  }

  @Get('/intervalos-combinados/:id')
  async obtenerDisponibilidadCombinada(@Param('id') idSolicitud: number) {
    const disponibilidad = await this.salasService.obtenerIntervalosCombinados(idSolicitud);
    return this.createResponse(disponibilidad);
  }

  private createResponse(data: any) {
    return {
      status: HttpStatus.OK,
      message: 'ok',
      data: data,
    };
  }

}
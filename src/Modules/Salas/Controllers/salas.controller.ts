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

  private createResponse(data: any) {
    return {
      status: HttpStatus.OK,
      message: 'ok',
      data: data,
    };
  }

}
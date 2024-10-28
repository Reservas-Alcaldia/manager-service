import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { GestorService } from '../Services/gestor.service';

@Controller('solicitudes')
export class GestorController {
  constructor(private readonly gestorService: GestorService) {}

  @Get('/approved') 
  async getSolicitudesAprobadas(@Res() res: Response) {
    try {
      const solicitudes = await this.gestorService.getSolicitudesAprobadas();
      return res.status(HttpStatus.OK).json({
        status: 200,
        message: "ok",
        data: solicitudes,
      });
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 404,
          message: "No se encontraron solicitudes aprobadas.",
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: error.message,
      });
    }
  }

  @Get('/notapproved')
  async getSolicitudesNoAprobadas(@Res() res: Response) {
    try {
      const solicitudes = await this.gestorService.getSolicitudesNoAprobadas();
      return res.status(HttpStatus.OK).json({
        status: 200,
        message: "ok",
        data: solicitudes,
      });
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 404,
          message: "No se encontraron solicitudes no aprobadas.",
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: error.message,
      });
    }
  }

  @Get('/toapprove')
  async getSolicitudesEnEspera(@Res() res: Response) {
    try {
      const solicitudes = await this.gestorService.getSolicitudesEnEspera();
      return res.status(HttpStatus.OK).json({
        status: 200,
        message: "ok",
        data: solicitudes,
      });
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 404,
          message: "No se encontraron solicitudes en espera.",
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

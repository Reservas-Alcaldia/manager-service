import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from 'src/Entities/solicitud.entity';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private solicitudesRepository: Repository<Solicitud>,
  ) {}

  async getSolicitudesAprobadas(): Promise<Solicitud[]> {
    try {
      const solicitudesAprobadas = await this.solicitudesRepository.find({
        where: { Estado: 1 }, 
        relations: ['fechas'], 
      });
  
      if (!solicitudesAprobadas.length) {
        throw new NotFoundException("No se encontraron solicitudes aprobadas.");
      }
  
      return solicitudesAprobadas;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Error al recuperar las solicitudes aprobadas: " + error.message);
    }
  }
  
  async getSolicitudesNoAprobadas(): Promise<Solicitud[]> {
    try {
      const solicitudesNoAprobadas = await this.solicitudesRepository.find({
        where: { Estado: 0 },
        relations: ['fechas'], 
      });
  
      if (!solicitudesNoAprobadas.length) {
        throw new NotFoundException("No se encontraron solicitudes no aprobadas.");
      }
  
      return solicitudesNoAprobadas;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Error al recuperar las solicitudes no aprobadas: " + error.message);
    }
  }

  async getSolicitudesEnEspera(): Promise<Solicitud[]> {
    try {
      const solicitudesEnEspera = await this.solicitudesRepository.find({
        where: { Estado: 2 }, 
        relations: ['fechas'], 
      });
  
      if (!solicitudesEnEspera.length) {
        throw new NotFoundException("No se encontraron solicitudes en espera.");
      }
  
      return solicitudesEnEspera;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Error al recuperar las solicitudes en espera: " + error.message);
    }
  }
  
  
  
}


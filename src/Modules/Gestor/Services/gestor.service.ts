import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from 'src/Entities/solicitud.entity';

@Injectable()
export class GestorService {
  constructor(
    @InjectRepository(Solicitud)
    private gestorRepository: Repository<Solicitud>,
  ) {}

  async getSolicitudesAprobadas(): Promise<Solicitud[]> {
    const solicitudesAprobadas = await this.gestorRepository.find({
      where: { Estado: 1 },
    });
  
    if (!solicitudesAprobadas.length) {
      throw new NotFoundException("No se encontraron solicitudes aprobadas.");
    }
  
    return solicitudesAprobadas;
  }
  
  async getSolicitudesNoAprobadas(): Promise<Solicitud[]> {
    const solicitudesNoAprobadas = await this.gestorRepository.find({
      where: { Estado: 0 },
    });
  
    if (!solicitudesNoAprobadas.length) {
      throw new NotFoundException("No se encontraron solicitudes no aprobadas.");
    }
  
    return solicitudesNoAprobadas;
  }
  
  async getSolicitudesEnEspera(): Promise<Solicitud[]> {
    const solicitudesEnEspera = await this.gestorRepository.find({
      where: { Estado: 2 },
    });
  
    if (!solicitudesEnEspera.length) {
      throw new NotFoundException("No se encontraron solicitudes en espera.");
    }
  
    return solicitudesEnEspera;
  }
  
}


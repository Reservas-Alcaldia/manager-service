import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from 'src/Entities/solicitud.entity';
import { Sala } from 'src/Entities/sala.entity';
import { validarHoras } from 'src/Common/Validations/solicitud.validation';

@Injectable()
export class GestorService {
  constructor(
    @InjectRepository(Solicitud)
    private gestorRepository: Repository<Solicitud>,
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
  ) {}

  async getAllSolicitudes(): Promise<Solicitud[]> {
    const solicitudesAprobadas = await this.gestorRepository.find();
  
    if (!solicitudesAprobadas.length) {
      throw new NotFoundException("No se encontraron solicitudes");
    }
  
    return solicitudesAprobadas;
  }

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

  async getSolicitudById(id: number) {
    return await this.gestorRepository.findOne({
      where: { id_solicitudes: id },
      relations: ['id_sala', 'id_secretarias'], 
    });
  }

  async aprobarSolicitud(id: number, salaId: number, horaInicio?: string, horaFin?: string): Promise<Solicitud> {
    const solicitud = await this.gestorRepository.findOne({
      where: { id_solicitudes: id },
      relations: ['id_sala', 'id_secretarias'], 
    });

    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    const sala = await this.salaRepository.findOne({ where: { id_sala: salaId } });
    if (!sala) {
      throw new NotFoundException(`Sala con ID ${salaId} no encontrada`);
    }
    solicitud.id_sala = sala;

    if (horaInicio && horaFin) {
      validarHoras(horaInicio, horaFin);
      solicitud.Hora_inicio = horaInicio;
      solicitud.Hora_final = horaFin;
    }

    solicitud.Estado = 1;

    await this.gestorRepository.save(solicitud);

    return solicitud;
  }

  async rechazarSolicitud(id: number): Promise<Solicitud> {
    const solicitud = await this.gestorRepository.findOne({
      where: { id_solicitudes: id },
      relations: ['id_sala', 'id_secretarias'], 
    });

    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    solicitud.Estado = 0;

    await this.gestorRepository.save(solicitud);

    return solicitud;
  }
  
}


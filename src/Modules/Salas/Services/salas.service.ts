import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Solicitud } from 'src/Entities/solicitud.entity'; 

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
  ) {}

  async verificarDisponibilidadIndividual(idSolicitud: number): Promise<string[]> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id_solicitudes: idSolicitud, Estado: 2 },
    });

    if (!solicitud) {
      throw new NotFoundException('Solicitud no encontrada o no esta en espera');
    }

    const { Fecha_reserva, Hora_inicio, Hora_final } = solicitud;

    const disponibilidadSalas = [];

    for (let i = 1; i <= 6; i++) {
      const solicitudesAprobadas = await this.solicitudRepository.find({
        where: {
          Estado: 1,
          Fecha_reserva: Fecha_reserva,
          Hora_inicio: LessThanOrEqual(Hora_final),
          Hora_final: MoreThanOrEqual(Hora_inicio),
          id_sala: Equal(i),
        },
      });

      disponibilidadSalas.push({
        id_sala: i,
        estado: solicitudesAprobadas.length > 0 ? 0 : 1, 
      });
    }

    return disponibilidadSalas;
  }

  async verificarDisponibilidadCombinada(idSolicitud: number): Promise<{ id_sala: number; estado: number }[]> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id_solicitudes: idSolicitud, Estado: 2 },
    });

    if (!solicitud) {
      throw new NotFoundException('Solicitud no encontrada o no esta en espera');
    }

    const { Fecha_reserva, Hora_inicio, Hora_final } = solicitud;

    const salasCombinadas = [
      { id: 7, individuales: [1, 2] },
      { id: 8, individuales: [3, 4] },
      { id: 9, individuales: [5, 6] },
    ];

    const disponibilidadSalas = await Promise.all(salasCombinadas.map(async ({ id, individuales }) => {
      const solicitudesAprobadas = await this.solicitudRepository.find({
        where: {
          Estado: 1,
          id_sala: Equal(id),
          Fecha_reserva: Fecha_reserva,
          Hora_inicio: LessThanOrEqual(Hora_final),
          Hora_final: MoreThanOrEqual(Hora_inicio),
        },
      });

      const individualesAprobadas = await Promise.all(individuales.map(async (sala) => {
        return this.solicitudRepository.find({
          where: {
            Estado: 1,
            id_sala: Equal(sala),
            Fecha_reserva: Fecha_reserva,
            Hora_inicio: LessThanOrEqual(Hora_final),
            Hora_final: MoreThanOrEqual(Hora_inicio),
          },
        });
      }));

      const noDisponible = solicitudesAprobadas.length > 0 || individualesAprobadas.some(solicitudes => solicitudes.length > 0);

      return { id_sala: id, estado: noDisponible ? 0 : 1 };
    }));

    return disponibilidadSalas;
  }
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Solicitud } from './solicitud.entity';

@Entity('Fecha_reserva')
export class FechaReserva {
  @PrimaryGeneratedColumn()
  id_fecha: number;

  @Column('date')
  Fecha_reserva: Date;

  @ManyToOne(() => Solicitud, solicitud => solicitud.fechas)
  id_solicitudes: Solicitud; 
}



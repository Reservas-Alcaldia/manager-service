import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Solicitud } from './solicitud.entity';

@Entity('Salas')
export class Sala {
  @PrimaryGeneratedColumn()
  id_sala: number;

  @Column('int')
  Capacidad: number;

  @Column('tinyint')
  Estado: boolean;

  @OneToMany(() => Solicitud, solicitud => solicitud.id_sala)
  solicitudes: Solicitud[];
}

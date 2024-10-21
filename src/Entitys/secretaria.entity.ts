import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Solicitud } from './solicitud.entity';

@Entity('Secretarias')
export class Secretaria {
  @PrimaryGeneratedColumn()
  id_secretarias: number;

  @Column({ length: 60 })
  Nombre: string;

  // Relaciones
  @OneToMany(() => Solicitud, solicitud => solicitud.id_secretarias)
  solicitudes: Solicitud[];
}

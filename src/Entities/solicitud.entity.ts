import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Sala } from './sala.entity';
import { Secretaria } from './secretaria.entity';

@Entity('Solicitudes')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id_solicitudes: number;

  @Column({ length: 60 })
  Nombre: string;

  @Column({ length: 60 })
  Apellido: string;

  @Column({ length: 100 })
  Correo: string;

  @Column('bigint')
  Telefono: number;

  @Column({ length: 100 })
  Direccion: string;

  @Column('time')
  Hora_inicio: string;

  @Column('time')
  Hora_final: string;

  @Column('date')
  Fecha_reserva: Date;

  @Column('int')
  Num_asistentes: number;

  @Column({ length: 255 })
  Proposito: string;

  @Column('tinyint')
  Computador: boolean;

  @Column('tinyint')
  HDMI: boolean;

  @Column('tinyint')
  Estado: number;

  @ManyToOne(() => Sala, sala => sala.solicitudes)
  @JoinColumn({name: 'id_sala'})
  id_sala: Sala;

  @ManyToOne(() => Secretaria, secretaria => secretaria.solicitudes)
  @JoinColumn({name: 'id_secretarias'})
  id_secretarias: Secretaria;
}

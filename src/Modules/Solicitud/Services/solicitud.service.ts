import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from 'src/Entities/solicitud.entity';
import { SolicitudDto } from '../Dtos/solicitud.dto';
import { validateSolicitud } from '../../../Common/Validations/solicitud.validation';
import { Secretaria } from 'src/Entities/secretaria.entity';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
    @InjectRepository(Secretaria)
    private readonly secretariaRepository: Repository<Secretaria>,
  ) {}

  async createSolicitud(dto: SolicitudDto): Promise<Solicitud> {
    const validatedDto = validateSolicitud(dto);

    const hasHDMI = dto.additionalEquipment.includes('Hdmi');
    const hasComputador = dto.additionalEquipment.includes('Portatil');

    const secretaria = await this.secretariaRepository.findOne({
      where: { Nombre: dto.ministry },
    });
    if (!secretaria) {
      throw new BadRequestException('Secretaria no encontrada');
    }

    const solicitud = new Solicitud();
    solicitud.Nombre = validatedDto.name;
    solicitud.Apellido = validatedDto.surname;
    solicitud.Correo = validatedDto.email;
    solicitud.Telefono = validatedDto.phoneNumber;
    solicitud.Direccion = validatedDto.address;
    solicitud.Hora_inicio = validatedDto.startTime;
    solicitud.Hora_final = validatedDto.endTime;
    const fechaReserva = new Date(validatedDto.fecha_reserva);
    fechaReserva.setHours(
      fechaReserva.getHours() + fechaReserva.getTimezoneOffset() / 60,
    );
    solicitud.Fecha_reserva = fechaReserva;
    solicitud.Num_asistentes = validatedDto.assistants;
    solicitud.Proposito = validatedDto.purpose;
    solicitud.Computador = hasComputador;
    solicitud.HDMI = hasHDMI;
    solicitud.Estado = 2;
    solicitud.id_secretarias = secretaria;

    return await this.solicitudRepository.save(solicitud);
  }
}

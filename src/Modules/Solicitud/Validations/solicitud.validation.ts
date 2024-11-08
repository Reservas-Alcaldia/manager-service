import { BadRequestException } from '@nestjs/common';
import { SolicitudDto } from '../Dtos/solicitud.dto';

export function validateSolicitud(dto: SolicitudDto) {
  const currentDate = new Date();
  const fechaReserva = new Date(`${dto.fecha_reserva}T${dto.startTime}`);

  if (fechaReserva <= currentDate) {
    throw new BadRequestException('La fecha y hora deben ser futuras.');
  }

  dto.name = sanitize(dto.name);
  dto.surname = sanitize(dto.surname);
  dto.address = sanitize(dto.address);
  dto.purpose = sanitize(dto.purpose);

  return dto;
}

function sanitize(text: string): string {
  return text.replace(/<[^>]*>?/gm, ''); 
}

  
  
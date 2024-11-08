import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min, Matches } from 'class-validator';

export class SolicitudDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'El nombre no debe contener números.' })
  name: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'El apellido no debe contener números.' })
  surname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo debe ser válido.' })
  @Matches(/@medellin\.gov\.co$/, { message: 'El correo debe tener el dominio "medellin.gov.co".' })
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: 'El teléfono no debe ser negativo.' })
  phoneNumber: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'El Numero de asistentes debe ser mayor a 1' })
  @Max(40, { message: 'El número de asistentes no debe superar 40.' })
  assistants: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsString()
  fecha_reserva: string;

  @IsNotEmpty()
  @IsString()
  ministry: string;

  additionalEquipment: string[];
}

  
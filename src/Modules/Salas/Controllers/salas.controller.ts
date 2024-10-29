import { Controller, Get, HttpStatus } from '@nestjs/common';
import { SalasService } from '../Services/salas.service'; 

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

}
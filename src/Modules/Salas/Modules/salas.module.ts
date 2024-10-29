import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasController } from '../Controllers/salas.controller';
import { SalasService } from '../Services/salas.service'; 
import { Solicitud } from 'src/Entities/solicitud.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud])], 
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
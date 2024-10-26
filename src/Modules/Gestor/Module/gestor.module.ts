import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesController } from '../controllers/gestor.controller';
import { SolicitudesService } from '../Services/gestor.service';
import { Solicitud } from 'src/Entities/solicitud.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud])], 
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
})
export class SalasModule {}

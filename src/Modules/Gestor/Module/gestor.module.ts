import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorController } from '../controllers/gestor.controller';
import { GestorService } from '../Services/gestor.service';
import { Solicitud } from 'src/Entities/solicitud.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud])], 
  controllers: [GestorController],
  providers: [GestorService],
})
export class GestorModule {}

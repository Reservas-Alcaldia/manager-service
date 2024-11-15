import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorController } from '../controllers/gestor.controller';
import { GestorService } from '../Services/gestor.service';
import { Solicitud } from 'src/Entities/solicitud.entity'; 
import { Sala } from 'src/Entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud, Sala])], 
  controllers: [GestorController],
  providers: [GestorService],
})
export class GestorModule {}

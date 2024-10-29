import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from 'src/Entities/solicitud.entity'; 

@Injectable()
export class SalasService {
    constructor(
        @InjectRepository(Solicitud)
        private solicitudRepository: Repository<Solicitud>,
    ) {}
}
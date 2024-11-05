import { Module } from '@nestjs/common';
import { DatabaseModule } from './Common/Database/Database.module';
import { GestorModule } from './Modules/Gestor/Module/gestor.module';
import { SalasModule } from './Modules/Salas/Modules/salas.module';


@Module({
  imports: [
    DatabaseModule,
    GestorModule,
    SalasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

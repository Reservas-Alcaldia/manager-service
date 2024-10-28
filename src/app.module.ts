import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { GestorModule } from './Modules/Gestor/Module/gestor.module';


@Module({
  imports: [
    DatabaseModule,
    GestorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

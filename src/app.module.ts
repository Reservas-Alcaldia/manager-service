import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { SalasModule } from './Modules/Gestor/Module/gestor.module';


@Module({
  imports: [
    DatabaseModule,
    SalasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

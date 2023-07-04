import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GlobalModule } from './global/global.module';
import { RegionsController } from './regions/regions.controller';
import { RegionsService } from './regions/regions.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'HR',
      models: ['batch24/models/index.ts'],
      autoLoadModels: true,
      synchronize:true
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

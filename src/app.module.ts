import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server/server.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'HR',
      entities: ['dist/output/entities/*.js'],
      synchronize: false,
    }),
    ServerModule,
  ],
})
export class AppModule {}

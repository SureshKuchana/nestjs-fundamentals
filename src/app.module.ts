import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestControllerController } from './test-controller/test-controller.controller';
import { TestControllerService } from './test-controller/test-controller.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nestjs-fund',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, TestControllerController],
  providers: [AppService, TestControllerService],
})
export class AppModule {}

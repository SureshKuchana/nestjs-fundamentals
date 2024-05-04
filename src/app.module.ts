import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestControllerController } from './test-controller/test-controller.controller';
import { TestControllerService } from './test-controller/test-controller.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';

@Module({
  imports: [],
  controllers: [AppController, TestControllerController, CoffeesController],
  providers: [AppService, TestControllerService, CoffeesService],
})
export class AppModule {}

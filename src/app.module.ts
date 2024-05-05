import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestControllerController } from './test-controller/test-controller.controller';
import { TestControllerService } from './test-controller/test-controller.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController, TestControllerController],
  providers: [AppService, TestControllerService],
})
export class AppModule {}

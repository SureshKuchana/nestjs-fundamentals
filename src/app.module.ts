import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestControllerController } from './test-controller/test-controller.controller';

@Module({
  imports: [],
  controllers: [AppController, TestControllerController],
  providers: [AppService],
})
export class AppModule {}

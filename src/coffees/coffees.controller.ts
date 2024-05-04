import { CoffeesService } from './coffees.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll() {
    return 'This action will return coffees';
  }

  @Get('nested-coffee')
  nestedRoute() {
    return 'nested coffee';
  }

  @Get(':id')
  findTwo(@Param('id') id: string) {
    return `This is the dynamic ==> ${id}`;
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('test-controller')
export class TestControllerController {
  @Get()
  hi() {
    return 'hello from test controller';
  }
  // nested route
  @Get('nested')
  hi2() {
    return 'hello from nested route';
  }

  // dynamic route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This is the dynamic ==> ${id}`;
  }

  // POST req , BODY
  @Post()
  create(@Body() body) {
    // to acces body inside the payload,
    // @Body("name","age") body => return {name, age}
    return body;
  }

  // POST req , BODY
  @Post()
  create2(@Body('name') body) {
    // to acces body inside the payload,
    // @Body("name") body => return body
    return body;
  }
}

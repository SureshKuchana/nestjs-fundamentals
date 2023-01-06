import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('test-controller')
export class TestControllerController {
  @Get()
  hi(@Res() response) {
    // return 'hello from test controller';
    response.status(200).send('hello from test controller'); // explict response
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
  @HttpCode(HttpStatus.GONE) // explicatly handle the status code
  create(@Body() body) {
    // to acces body inside the payload,
    // @Body("name","age") body => return {name, age}
    return body;
  }

  // POST req , BODY
  @Post()
  // @HttpCode(HttpStatus.GONE)
  create2(@Body('name') body) {
    // to acces body inside the payload,
    // @Body("name") body => return body
    return body;
  }
}

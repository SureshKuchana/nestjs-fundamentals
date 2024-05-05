import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

@Controller('test-controller')
export class TestControllerController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action return all test controller, Limit ${limit}, Offset ${offset}`;
  }

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
  create(@Body() body) {
    // to access body inside the payload,
    // @Body("name","age") body => return {name, age}
    return body;
  }

  // POST req , BODY
  @Post()
  @HttpCode(HttpStatus.GONE) // explicitlly handle the status code
  create1(@Body('name') body) {
    // to access body inside the payload,
    // @Body("name","age") body => return {name, age}
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updated #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}

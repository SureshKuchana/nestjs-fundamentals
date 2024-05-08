# NestJS Fundamentals

## Installation

```bash
# install dependencies
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Generate Controllers

```bash
$ nest generate controller or nest g co

# if you don't want test file
$ nest g co --no-spec

# if you want specific directory to be created
$ nest g co module/abc or module/xyz
```

## Generate Service

```bash
nest generate service or nest g s
```

## Generate Module

```bash
nest generate modules coffees
```

## Generate Library

```bash
nest generate library coffees
```

## RestAPI

```bash
# if you want to add the REST API in the controllers
# we need to add the below decorator to the methods
# --> GET @GET
# --> POST @POST
# --> PUT @PUT
# --> DELETE @DELETE

# eg
@Controller('test-controller') # controller decorator, also act as the path for the route
# i.e http://localhost:3000/test-controller/
export class TestControllerController {
  @Get()
  hi() {
    return 'hello from test controller';
  }
}

# app controller treated as the base or main route i.e http://localhost:3000/
# for other controller we need to add http://localhost:3000/controller-name/

# To include the nested router, add a string to the @Get('nested')
 @Get("nested")
  hi() {
    return 'hello from test controller';
  }
```

## Dynamic Routes

```bash
# Dynamic like /books/author/123 /books/author/456

@Get(:id)
findOne(@Param('id') id: string){
    # we can also access parmas object, with contain related information about route
    return `this dynamic id ${id}`
}

```

## POST Req

```bash
# POST
@Post()
create(@Body() body){
    return body
}

# If you want to access specific protion of the body
@Post()
create(@Body("name") body){
    return body
}

# It should return the only name
```

```bash
# response status codes

# NestJS automatically set status code for our responses
# We can explicitlly handle the status code
  @Post()
  @HttpCode(HttpStatus.GONE) // explicitlly handle the status code
  create1(@Body('name') body) {
    // to access body inside the payload,
    // @Body("name","age") body => return {name, age}
    return body;
  }

# we can use the native express response i.e @Res() response
  @Get()
  hi(@Res() response) {
    // return 'hello from test controller';
    response.status(200).send('hello from test controller'); // explict response
  }

# Recommended way not to use explicitlly declare status code
```

```bash
# handling update & delete requests
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updated #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
```

```bash
# pagination with query parameters
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action return all test controller, Limit ${limit}, Offset ${offset}`;
  }
```

```bash
# Service's are very important part of nest application.
# It separtes out the bussiness logic from our controller

# create a service
# nest generate service or nest g s

# nestjs each service is a provider, main idea of provider it can inject dependencies
@Injectable()
export class CoffeeService{}

```

## Module

```bash
# A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

# Each application has at least one module, a root module i.e AppModule. The root module is the starting point Nest uses to build the application graph

# @Module() decorator takes a single object whose properties describe the module:
# providers :=> the providers that will be instantiated by the Nest injector and that may be shared at least across this module
# controllers :=> the set of controllers defined in this module which have to be instantiated
# imports :=> the list of imported modules that export the providers which are required in this module
# exports :=> the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)
```

## DTO (Data Transfer Object)

```bash
# DTO (Data Transfer Object) is a design pattern that is commonly used in software development to transfer data between different layers of an application.

# The main idea behind the DTO pattern is to encapsulate data and provide a standardised way of transferring it between different parts of the application

# to create DTO

$ nest g class coffees/dto/create-coffee.dto --no-spec

# use those create DTO's in controller to pass as params

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

# validate input data with DTO

# It is best practice to validate the correctness of any data sent into a web application. To automatically validate incoming requests, Nest provides several pipes available right out-of-the-box:

# ValidationPipe
# ParseIntPipe
# ParseBoolPipe
# ParseArrayPipe
# ParseUUIDPipe

# main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  # validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

# npm i class-validator class-transformer

import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}

```

```bash
# Handling the malicious request data

# Validation Pipe has many other features
# whitelist property
app.useGlobalPipes(new ValidationPipe({
  whitelist: true
  forbidNonWhitelisted: true
}));

# whitelist, If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
# forbidNonWhitelisted, If set to true, instead of stripping non-whitelisted properties validator will throw an exception.

```

```bash
# auto transform payloads to DTO instances

# when we receive requests from payloads, these payloads tipically come over from network as javascript objects
# Payloads coming in over the network are plain JavaScript objects
# The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes. To enable auto-transformation, set transform to true.

console.log(createCoffeeDto instanceof CreateCoffeeDto); // false
app.useGlobalPipes(new ValidationPipe({
  whitelist: true
  forbidNonWhitelisted: true
  transform: true
}));
```

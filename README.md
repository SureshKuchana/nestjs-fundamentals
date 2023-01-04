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
nest generate controller or nest g co

# if you don't want test file
nest g co --no-spec

# if you want specific directory to be created
nest g co module/abc or module/xyz
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
@Post(:id)
create(@Body() body){    # @Body() body # @Body("name") body
    return body
}
```

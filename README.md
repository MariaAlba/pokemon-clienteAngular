# PokemonClienteAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Rest
GET     endpoint/pokemon/               RESPONSE    200, 204
GET     endpoint/pokemon/{id}           RESPONSE    200, 404
DELETE  endpoint/pokemon/{id}           RESPONSE    200, 404
POST    endpoint/pokemon                RESPONSE    201, 409 (nombre duplicado, min 1, max 50)
        
        request body{           
            "nombre":"NUEVO_NOMBRE",
            "habilidades":[]    //TODO para siguiente entrega
        }

        response body{
            "id": "NUEVA",
            "nombre": "NUEVO_NOMBRE"
        }
PUT    endpoint/pokemon/{id}           RESPONSE    201, 409 (nombre duplicado, min 1, max 50)
        
        request body{   
            "id" :3        
            "nombre":"NUEVO_NOMBRE",
        }

        response body{
            "id": "3",
            "nombre": "NUEVO_NOMBRE"
        }


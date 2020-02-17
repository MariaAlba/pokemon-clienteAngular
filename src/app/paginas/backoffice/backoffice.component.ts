import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemons: Array<any>;
  pokemonSeleccionado: Pokemon;

  mensaje:string;

  formulario: FormGroup;

  constructor(private pokeService: PokemonService, private builder: FormBuilder) {

    this.pokemons = [];
    this.pokemonSeleccionado = undefined;
    this.mensaje = '';

    // construir formulario
    this.formulario = this.builder.group({
      // definir los FormControl == inputs [ value, validaciones ]
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      habilidades:[[]]
    });

  }

  ngOnInit() {

    this.cargarPokemons();

  }//ngOnInit

  private seleccionar(p: Pokemon) {
    this.pokemonSeleccionado = p;
    this.formulario.get('nombre').setValue(p.nombre);
    this.formulario.get('id').setValue(p.id);
  } //seleccionar

  private nuevoPokemon(){
    this.pokemonSeleccionado = new Pokemon();
    this.formulario.get('nombre').setValue('');
    this.formulario.get('id').setValue(0);
  } //nuevoPokemon

  private cargarPokemons(): void {

    this.pokeService.getAll().subscribe((data) => {
      this.pokemons = data;
    },
    (error)=>{
      console.warn(error);
      this.mensaje = error.message;
    });

  }//cargarPokemons

  private eliminar(p: Pokemon) {
    console.trace('eliminar', p);

    if (confirm('¿Seguro que desea eliminar?')) {
      this.pokeService.eliminar(p).subscribe((data) => {
        this.cargarPokemons();
        this.pokemonSeleccionado = undefined;
        this.mensaje = "Pokemon "+ p.id + ' - '+ p.nombre+ " eliminado con éxito"
      },
        (error) => {
          console.warn('error en eliminar', error);
          this.mensaje = "Error "+ error.status + " al eliminar. No se ha encontrado el recurso."
        }
      );

    }
    else {
      console.warn('Cancelado eliminar');
    }

    
  } //eliminar

  //enviar formulario
  enviar( values: any ) {
    
    console.trace('Submit formulario %o', values);
    const nombre = values.nombre;
    const id = values.id;
    const habilidades = values.habilidades;

    if(id == 0){//crear
      this.crear(nombre);
    }
    else{ //modificar
      this.pokemonSeleccionado.id = id;
      this.pokemonSeleccionado.nombre = nombre;
      this.pokemonSeleccionado.habilidades = habilidades;
      this.modificar(this.pokemonSeleccionado);
    }

  }// enviar


  private modificar(p: Pokemon) {
    console.trace('modificar', p);
    this.pokeService.modificar(p).subscribe((data) => {
      console.warn(data);
      this.cargarPokemons();
      this.pokemonSeleccionado = undefined;
      this.mensaje = 'Pokemon ' +p.id + ' - ' + p.nombre + ' modificado con éxito';
    },
    (error) => {
      console.warn('error en modificar', error);
      if(error.status == 400){this.mensaje = 'Ya existe un pokemon con ese nombre';}
    }
    
    );
  }//modificar

  private crear(nuevoNombre: string) {
    console.trace('crear', nuevoNombre);
    let nuevoPokemon = new Pokemon();
    nuevoPokemon.nombre = nuevoNombre;

    this.pokeService.crear(nuevoPokemon).subscribe((data) => {
      console.warn(data);
      this.cargarPokemons();
      this.pokemonSeleccionado = undefined;
      this.mensaje = 'Nuevo pokemon ' +nuevoNombre+' creado con éxito';
    },
    (error)=>{
      console.warn('error en crear', error);
      if(error.status == 400){this.mensaje = 'Ya existe un pokemon con ese nombre';}
    });
   }//crear





}

import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemons: Array<any>;
  pokemonSeleccionado: Pokemon;

  habilidades: Array<any>;
  opciones: Array<any>;
  habilidadFormArray: FormArray;

  x:Set<any>;

  mensaje: any;

  formulario: FormGroup;

  constructor(private pokeService: PokemonService, private habilidadesService: HabilidadService, private builder: FormBuilder) {

    this.pokemons = [];

    this.habilidades = [];
    this.opciones = [];


    this.pokemonSeleccionado = undefined;
    this.mensaje = { "texto": "", "tipo": "alert-warning" };

    this.crearFormulario();


  } //constructor

  ngOnInit() {
    this.cargarPokemons();
    this.cargarHabilidades();
  }//ngOnInit

  private seleccionar(p: Pokemon) {
    this.pokemonSeleccionado = p;
    this.formulario.get('nombre').setValue(p.nombre);
    this.formulario.get('id').setValue(p.id);
  } //seleccionar

  private nuevoPokemon() {

    this.pokemonSeleccionado = new Pokemon();
    this.formulario.get('nombre').setValue('');
    this.formulario.get('id').setValue(0);
  } //nuevoPokemon

  private cargarPokemons(): void {

    this.pokeService.getAll().subscribe((data) => {
      this.pokemons = data;
    },
      (error) => {
        console.warn(error);
        this.mensaje.texto = error.message;
        this.mensaje.tipo = "alert-danger"
      });

  }//cargarPokemons

  cargarHabilidades(): void {

    this.habilidadesService.getAll().subscribe(
      (data) => {
        this.habilidades = data;
        this.opciones = this.habilidades.map((el) => {
          return { "id": el.id, "nombre": el.nombre, "checked": false };
        });
      },
      (error) => {
        console.warn(error);

      }

    );

  }//cargarHabilidades

  private eliminar(p: Pokemon) {
    console.trace('eliminar', p);

    if (confirm('¿Seguro que desea eliminar?')) {
      this.pokeService.eliminar(p).subscribe((data) => {
        this.limpiar();
        this.mensaje.texto = "Pokemon " + p.id + ' - ' + p.nombre + " eliminado con éxito"
        this.mensaje.tipo = "alert-success";
      },
        (error) => {
          console.warn('error en eliminar', error);
          this.mensaje.texto = "Error " + error.status + " al eliminar. No se ha encontrado el recurso."
          this.mensaje.tipo = "alert-danger";
        }
      );

    }
    else {
      console.warn('Cancelado eliminar');
    }


  } //eliminar

  //enviar formulario
  enviar(values: any) {

    console.trace('Submit formulario %o', values);
    const nombre = values.nombre;
    const id = values.id;
    const habilidades =  values.habilidades;

    if (id == 0) {//crear
      this.crear(nombre);
    }
    else { //modificar
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
      this.limpiar();
      this.mensaje.texto = 'Pokemon ' + p.id + ' - ' + p.nombre + ' modificado con éxito';
      this.mensaje.tipo = "alert-info";
    },
      (error) => {
        console.warn('error en modificar', error);
        this.limpiar();
        if (error.status == 409) {
          this.mensaje.texto = 'Ya existe un pokemon con el nombre ' + p.nombre;
          this.mensaje.tipo = "alert-danger";
        }
      }

    );
  }//modificar

  private crear(nuevoNombre: string) {
    console.trace('crear', nuevoNombre);
    let nuevoPokemon = new Pokemon();
    nuevoPokemon.nombre = nuevoNombre;

    this.pokeService.crear(nuevoPokemon).subscribe((data) => {
      console.warn(data);
      this.limpiar();
      this.mensaje.texto = 'Nuevo pokemon ' + nuevoNombre + ' creado con éxito';
      this.mensaje.tipo = "alert-info";
    },
      (error) => {
        console.warn('error en crear', error);
        this.limpiar();
        if (error.status == 409) {
          this.mensaje.texto = 'Ya existe un pokemon con el nombre ' + nuevoNombre;
          this.mensaje.tipo = "alert-danger";
        }
      });
  }//crear


  private limpiar() {
    this.pokemonSeleccionado = undefined;
    this.cargarPokemons();
  }

  private crearFormulario() {

    // construir formulario
    this.formulario = this.builder.group({
      // definir los FormControl == inputs [ value, validaciones ]
      //id:new FormCOntrol(0);
      //nombre: new FormControl ('', Validators.compose([]));
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      habilidades: this.builder.array(
        [],
        Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])
      )
    });

    this.habilidadFormArray = this.formulario.get('habilidades') as FormArray;

  }//crearFormulario

  crearFormGroupHabilidad(): FormGroup {
    return this.builder.group({
      id: [0],
      nombre: ['',
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      ]
    });
  }//creacrearFormGroupHabilidad

 

  checkHabilidad(option: any) {
    option.checked = !option.checked;
  //  console.debug('checkHabilidad %o', option);

    const habilidad = this.crearFormGroupHabilidad();
    habilidad.get('id').setValue(option.id);
    habilidad.get('nombre').setValue(option.nombre);

    if(option.checked){
      console.debug(habilidad);
      this.habilidadFormArray.push(habilidad);
    }
    else{
    
      //const el = this.habilidadFormArray.value
      let posicion = this.habilidadFormArray.value.findIndex((el)=> el.id ===habilidad.value.id );
      this.habilidadFormArray.removeAt(posicion);
    
      
    }    
    
    console.debug('el array',this.habilidadFormArray.value);
    
 






  }

}

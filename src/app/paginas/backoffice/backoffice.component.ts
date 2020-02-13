import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemons: Array<any>;
  pokemonSeleccionado: Pokemon;
  nuevoNombre :string;
  nombreModificado:string;


  constructor( private pokeService:PokemonService) { 

    this.pokemons = [];
    this.pokemonSeleccionado = undefined;
    this.nuevoNombre = '';
    this.nombreModificado ='';

  }

  ngOnInit() {

    this.cargarPokemons();

  }//ngOnInit

  private cargarPokemons():void{
    
    this.pokeService.getAll().subscribe((data)=>{
      this.pokemons = data;
    });
  
  }//cargarPokemons

  private eliminar(p:Pokemon){
    console.trace('eliminar',p);

    if(confirm('¿Seguro que desea eliminar?')){
      this.pokeService.eliminar(p).subscribe((data)=>{
        this.cargarPokemons();
      },
      (error)=>{
        console.warn('error en eliminar',error);
      }
      );

    }
    else{
      console.warn('Cancelado eliminar');
    }

  } //eliminar

  private modificar(p:Pokemon){
    console.trace('modificar',p);
    p.nombre = this.nombreModificado;
    this.pokeService.modificar(p).subscribe((data)=>{
      this.cargarPokemons();
    });
  }//modificar

  private crear(nuevoNombre:string){
    console.trace('crear',this.nuevoNombre);
    let nuevoPokemon = new Pokemon();
    nuevoPokemon.nombre = this.nuevoNombre;

    this.pokeService.crear(nuevoPokemon).subscribe((data)=>{
      this.cargarPokemons();
    });
  }//crear

  private seleccionar(p:Pokemon){
    this.pokemonSeleccionado = p;
  }


}

import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  listado:Array<any>;
  pokemonSeleccionado :Pokemon;

  constructor(private pokeService:PokemonService) {
    console.log('InicioComponent constructor');

    this.listado=[];
    this.pokemonSeleccionado;

   }//constructor

  ngOnInit() {

    console.log('InicioComponent ngOnInit');

    this.pokeService.getAll().subscribe( (data) => {
      console.log('getall',data);
      this.listado = data;

    },
    (error) => {
      console.warn(error);
    } 
    );

  }//ngOnInit

  elegirPokemon(pokemon:Pokemon){
    console.debug('click seleccionar pokemon %o',pokemon);
    this.pokemonSeleccionado = pokemon;

  }


}//InicioComponent

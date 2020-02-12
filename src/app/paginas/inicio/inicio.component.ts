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

  constructor(private pokeService:PokemonService) { }

  ngOnInit() {

    this.pokeService.getAll().subscribe( (data) => {

    },
    (error) => {
      console.warn(error);
    }
     );


  }

}

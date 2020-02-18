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
  habilidades:Array<any>
  habilidadesUnicas: Set<any>
  opcionesHabilidad:Array<any>;
  opcionesSel:Array<any>;
  pokemonSeleccionado :Pokemon;
  busqueda:string;
  algo:boolean;

  constructor(private pokeService:PokemonService) {
    console.log('InicioComponent constructor');

    this.listado=[];
    this.habilidades = [];
    this.pokemonSeleccionado;
    this.busqueda = '';
    this.habilidadesUnicas = new Set();
    this.algo = false;
    this.opcionesHabilidad =[];
    this.opcionesSel =[];


   }//constructor

  ngOnInit() {

    console.log('InicioComponent ngOnInit');

    this.pokeService.getAll().subscribe( (data) => {
      console.log('getall',data);
      this.listado = data;

      for(let p of data){      
          this.habilidades.push(p.habilidades.map((el)=>{return el.nombre}));
      }
      
      this.habilidades = this.habilidades.reduce((p,c,i,a)=>{
       return p.concat(c);
      });
      console.log('x', new Set([...this.habilidades]));
      this.habilidadesUnicas = new Set([...this.habilidades]);

      this.opcionesHabilidad = Array.from(this.habilidadesUnicas).map((el)=>{
        return {"name":el,"value":el, "checked":false};
      });
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

  get(h:any){
    h.checked = !h.checked;
    this.opcionesSel.push(h);
    return this.opcionesSel;
  }

}//InicioComponent

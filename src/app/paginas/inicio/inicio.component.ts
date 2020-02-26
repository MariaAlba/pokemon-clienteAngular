import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { element } from 'protractor';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  listado: Array<any>;
  listadoClon: Array<any>;
  habilidades: Array<any>
  habilidadesUnicas: Set<any>
  opcionesHabilidad: Array<any>;
  opcionesSel: Array<any>;
  pokemonSeleccionado: Pokemon;
  busqueda: string;
  algo: boolean;

  constructor(private pokeService: PokemonService) {
    console.log('InicioComponent constructor');

    this.listado = [];
    this.listadoClon = [];
    this.habilidades = [];
    this.pokemonSeleccionado;
    this.busqueda = '';
    this.habilidadesUnicas = new Set();
    this.algo = false;
    this.opcionesHabilidad = [];
    this.opcionesSel = [];

  }//constructor

  ngOnInit() {

    console.log('InicioComponent ngOnInit');

    this.pokeService.getAll().subscribe((data) => {
      console.log('getall', data);
      this.listado = data;
      this.listadoClon = data;

      for (let p of data) {
        this.habilidades.push(p.habilidades.map((el) => { return el.nombre }));
      }

      this.habilidades = this.habilidades.reduce((p, c, i, a) => {
        return p.concat(c);
      });
      console.log('x', new Set([...this.habilidades]));
      this.habilidadesUnicas = new Set([...this.habilidades]);

      this.opcionesHabilidad = Array.from(this.habilidadesUnicas).map((el) => {
        return { "name": el, "value": el, "checked": false };
      });
    },
      (error) => {
        console.warn(error);
      }
    );

  }//ngOnInit

  elegirPokemon(pokemon: Pokemon) {
    console.debug('click seleccionar pokemon %o', pokemon);
    this.pokemonSeleccionado = pokemon;
  }//elegirPokemon

  getHabilidadesFiltro(h: any) {

    h.checked = !h.checked;

    if (h.checked) {
      this.opcionesSel.push(h);
    }
    else {
      const posicion = this.opcionesSel.findIndex((el) => el.name === h.name);
      this.opcionesSel.splice(posicion, 1);
    }

    if (this.opcionesSel.length == 0) {
      return this.listado = this.listadoClon;
    }

    this.filtrar(this.opcionesSel, h);

  }//getHabilidadesFiltro


  filtrar(opcionesSel: Array<any>, h: any) {
    opcionesSel = opcionesSel.map((el) => { return el.name });

    this.listado = this.listadoClon.filter(el => {

      return el.habilidades.find(opcion => opcionesSel.indexOf(opcion.nombre) !== -1);

    });
  }//filtrar

}//InicioComponent

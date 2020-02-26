import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonFiltroPipe implements PipeTransform {

  transform(datos: any, busqueda:string): any {
    console.log('entro con ', busqueda);
    let resultado = datos;

    if (busqueda && busqueda != '') {

      busqueda = busqueda.toLowerCase();

      resultado = resultado.filter((el) => {
        return el.nombre.toLowerCase().includes(busqueda);
      });

    }
    return resultado;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonFiltroPipe implements PipeTransform {

  transform(datos: any, busqueda:string, opcionesSel:Array<any>): any {
    console.log('entro con ',busqueda,opcionesSel);
    let resultado = datos;
    
    if(busqueda && busqueda!=''){

      busqueda = busqueda.toLowerCase();

      resultado = resultado.filter((el)=>{

          return el.nombre.toLowerCase().includes(busqueda);
      });

      // if( opcionesSel.length>0){
      //   console.warn('opcionesSel %o',opcionesSel);
      //   // resultado = resultado.filter((el)=>{
      //   //   console.warn(el.habilidades);
      //   // });
      // }

    }
    return resultado;
  }

}

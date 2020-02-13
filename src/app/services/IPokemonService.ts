import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

export interface IPokemonService{


    getAll(): Observable<Array<any>>;

    getPokemonByName(nombre:string):Observable<any>;

    getPokemonById(id:number): Observable<any>;

    getHabilidades(): Observable<any>;

    crear(p: Pokemon ): Observable<any>;

    modificar(p: Pokemon ): Observable<any>;

    eliminar(p: Pokemon): Observable<any>;
}
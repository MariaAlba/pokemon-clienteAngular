import { Observable } from 'rxjs';

export interface IPokemonService{

    getAll():Observable<any>;

    getPokemonByName(nombre:string):Observable<any>;

    getPokemonById(id:number): Observable<any>;


}
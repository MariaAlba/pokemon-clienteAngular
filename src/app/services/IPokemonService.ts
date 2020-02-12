import { Observable } from 'rxjs';

export interface IPokemonService{


    getAll(): Observable<Array<any>>;

    getPokemonByName(nombre:string):Observable<any>;

    getPokemonById(id:number): Observable<any>;


    getHabilidades(): Observable<any>;
}
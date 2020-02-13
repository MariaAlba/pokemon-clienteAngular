import { Injectable } from '@angular/core';
import { IPokemonService } from './IPokemonService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService {
 
  constructor(private http: HttpClient) {
    console.log('PokemonService constructor');

  }//constructor

  getAll(): Observable<any> {
    console.log('getAll');
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);
  }//getAll


  getPokemonById(id: number): Observable<any> {
    console.log('getPokemonById');
    throw new Error("Method not implemented.");
  } // getPokemonById

  getPokemonByName(nombre: string): Observable<any> {
    console.log('getPokemonByName');
    throw new Error("Method not implemented.");
  } //getPokemonByName

  getHabilidades(): Observable<any> {
    throw new Error("Method not implemented.");
  }

  crear(p: Pokemon): Observable<any> {
    console.log('crear');
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.post<Pokemon>(url,p);
  }
  
  modificar(p: Pokemon): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${p.id}`;
    console.debug('PUT %s pokemon %o', url, p);
    return this.http.post<Pokemon>(url, p);
  }
  
  eliminar(p: Pokemon): Observable<any> {
    console.log('eliminar');
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${p.id}`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.delete(url);
  }



}//PokemonService

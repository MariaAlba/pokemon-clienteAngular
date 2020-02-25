import { Injectable } from '@angular/core';
import { IPokemonService } from './IPokemonService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { URL } from '../model/global';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService {
 
  constructor(private http: HttpClient) {
    console.log('PokemonService constructor');

  }//constructor

  getAll(): Observable<any> {
    console.log('getAll');
    const url = `${URL}api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);
  }//getAll


  getPokemonById(id: number): Observable<any> {
    console.log('getPokemonById');
    const url = `${URL}api/pokemon/${id}/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);
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
    const url = `${URL}api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.post<Pokemon>(url,p);
  }
  
  modificar(p: Pokemon): Observable<any> {
    const url = `${URL}api/pokemon/${p.id}`;
    console.debug('PUT %s pokemon %o', url, p);
    return this.http.put<Pokemon>(url, p);
  }
  
  eliminar(p: Pokemon): Observable<any> {
    console.log('eliminar');
    const url = `${URL}api/pokemon/${p.id}`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.delete(url);
  }



}//PokemonService

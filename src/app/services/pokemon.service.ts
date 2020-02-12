import { Injectable } from '@angular/core';
import { IPokemonService } from './IPokemonService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService {
  
  constructor(private http:HttpClient) { 
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


 

 
}//PokemonService

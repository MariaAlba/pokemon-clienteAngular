import { Injectable } from '@angular/core';
import { IPokemonService } from './IPokemonService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService {
  
  constructor(private http:HttpClient) { }
  
  getAll(): import("rxjs").Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);
  }
  getPokemonByName(nombre: string): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  getPokemonById(id: number): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }

 
}

import { Injectable } from '@angular/core';
import { IHabilidadService } from './IHabilidadService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habilidad } from '../model/habilidad';
import { URLDEV } from '../model/global';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService implements IHabilidadService{

  constructor(private http: HttpClient) {

  }//constructor
  
  getAll(): Observable<any> {
    console.log('getAll');
    const url = `${URLDEV}api/habilidad`;
    console.trace('HabilidadService getHabilidad ' + url);
    return this.http.get(url);
  }//getAll

  getHabilidad(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  crear(h:Habilidad): Observable<any> {
    throw new Error("Method not implemented.");
  }
  modificar(h: Habilidad): Observable<any> {
    throw new Error("Method not implemented.");
  }
  eliminar(h: Habilidad): Observable<any> {
    throw new Error("Method not implemented.");
  }
 
 


}

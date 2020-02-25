import { Injectable } from '@angular/core';
import { IUsuarioService } from './IUsuarioService';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { URL } from '../model/global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {

  storage: Storage;
   user: Usuario;
  

  constructor(private http: HttpClient, private router: Router) { 
    console.trace('UsuarioService constructor');
    this.storage = sessionStorage;
    this.user = undefined;
  
  }//constructor

  isLogged(): boolean {
    console.trace('UsuarioService isLogged');
  
  
    if(this.storage.getItem('usuarioStorage')){
      return true;
    }else{
      return false;
    }
  }//isLogged


  login(nombre: string, password: string): Observable<any>{
    
    console.trace('UsuarioService login nombre %s password %s', nombre, password);
    const url = `${URL}login`;
    return this.http.post(url, {nombre, password});

    
    
    

      
    //    // marcar que esta logeado
    //    this.storage.setItem('usuarioStorage', JSON.stringify(usuarioBuscado) );

    // }
    // else{
    //   console.trace('usuario NO encontrado');
    //   this.storage.removeItem('usuarioStorage');
    // }

    // return usuarioBuscado;
  }//login

  logout(): void {
    console.trace('UsuarioService logout');
    this.storage.removeItem('usuarioStorage');
  }//logout

}

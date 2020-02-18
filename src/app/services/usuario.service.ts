import { Injectable } from '@angular/core';
import { IUsuarioService } from './IUsuarioService';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {

  private storage: any;
  private user: Usuario;

  constructor() { 
    console.trace('UsuarioService constructor');
    this.storage = window.sessionStorage;
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

  login(nombre: string, password: string): Usuario {
    console.trace('UsuarioService login nombre %s password %s', nombre, password);
    
    let usuarioBuscado: Usuario;

    const NOMBRE = 'admin';
    const PASS = 'admin'

    if(NOMBRE===nombre && PASS===password){
      console.trace('usuario NO encontrado');
      
      // creo usuarioBuscado en este caso / en otro lo recupero del servicio
      usuarioBuscado = new Usuario();
      usuarioBuscado.nombre = nombre;
      usuarioBuscado.password = password;
      usuarioBuscado.id = 99;

       // marcar que esta logeado
       this.storage.setItem('usuarioStorage', JSON.stringify(usuarioBuscado) );

    }
    else{
      console.trace('usuario NO encontrado');
      this.storage.removeItem('usuarioStorage');
    }

    return usuarioBuscado;
  }//login

  logout(): void {
    console.trace('UsuarioService logout');
    this.storage.removeItem('usuarioStorage');
  }//logout

}

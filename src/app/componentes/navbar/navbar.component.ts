import { Component, OnInit } from '@angular/core';
import { RUTAS } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  rutas: Array<any>;
  estaLogeado:boolean;

  
  constructor( private router:Router,  private usuarioService:UsuarioService) { 
    console.trace('NavbarComponent constructor');
    this.rutas = RUTAS;
  }//constructor

  ngOnInit() {
    console.trace('NavbarComponent ngOnInit');
  }//ngOnInit

  isLogged():boolean{
   return this.usuarioService.isLogged();
  }

  salir(){
    console.trace('NavbarComponent click boton Cerrar Sesión');
    const mensaje = '¿Esta seguro que quiere cerrar la sesión ?';
    if ( confirm(mensaje) ) {
      this.usuarioService.logout();
      this.router.navigate(['/']); // ir a Inicio
    }
  }//salir
}

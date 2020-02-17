import { Component, OnInit } from '@angular/core';
import { RUTAS } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  rutas: Array<any>;
  estaLogeado:boolean;
  
  constructor() { 

    this.rutas = RUTAS;

    this.estaLogeado = true;
  }

  ngOnInit() {
  }

  salir(){
    this.estaLogeado = false;
  }
}

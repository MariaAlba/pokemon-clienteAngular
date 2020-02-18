import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private router: Router, private usuarioService: UsuarioService, private builder: FormBuilder) {

    console.trace('LoginComponent constructor');

    //construir el formualrio
    this.formulario = this.builder.group({

      // definir los FormControl == inputs [ value, validaciones ]
      nombre: ['admin', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      pass: ['admin', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]]

    });

  }//constructor

  ngOnInit() {
    console.trace(' LoginComponent ngOnInit');
  }//ngOnInit

  enviar( values: any ) {
    console.trace('Submit formulario %o', values);

    const nombre = values.nombre;
    const password = values.pass;
    const uLogeado = this.usuarioService.login(nombre, password);

    if ( uLogeado ) {
      console.trace('Usuario logeado con exito %o', uLogeado);
      this.router.navigate(['backoffice']);
    } else {
      console.warn('Usuario NO logeado');
      // TODO cambiar alert
      alert('Por favor prueba de nuevo a logearte');
    }


  }// enviar

}//LoginComponent

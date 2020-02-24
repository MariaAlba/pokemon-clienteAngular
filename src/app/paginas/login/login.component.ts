import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { STORAGE } from 'src/app/model/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  mensaje:any;

  constructor(private router: Router, private usuarioService: UsuarioService, private builder: FormBuilder) {

    this.mensaje = { "texto": "", "tipo": "alert-warning" };
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

 enviar( values: any ) :void{
    console.trace('Submit formulario %o', values);

    const nombre = values.nombre;
    const password = values.pass;
    const uLogeado = this.usuarioService.login(nombre, password);


    this.usuarioService.login(nombre, password).subscribe(
      (data)=>{
      let user = new Usuario();
      user.id = data.id;
      user.nombre = data.nombre;
      user.password = data.password;
      
      STORAGE.setItem('usuarioStorage', JSON.stringify(user));
      this.mensaje.texto = "";

      this.router.navigate(['backoffice']);

    },
    (error) =>{
      alert('error al logearse');
      this.mensaje.texto = "error al logearse";
      this.router.navigate(['login']);
    });
    
    
    
   

  }// enviar



  

}//LoginComponent

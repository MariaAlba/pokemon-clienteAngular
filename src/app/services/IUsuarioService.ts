import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';

export interface IUsuarioService{

    isLogged():boolean;

    login(nombre:string, password:string):Observable<any>;

    logout():void;
}
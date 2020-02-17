import { Usuario } from '../model/usuario';

export interface IUsuarioService{

    isLogged():boolean;

    login(nombre:string, password:string):Usuario;

    logout():void;
}
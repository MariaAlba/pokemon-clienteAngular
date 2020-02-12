import { Usuario } from '../model/usuario';

export interface IUsuario{

    isLogged():boolean;

    login(nombre:string, password:string):Usuario;

    logout():void;
}
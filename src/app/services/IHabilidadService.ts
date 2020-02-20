import { Observable } from 'rxjs';
import { Habilidad } from '../model/habilidad';

export interface IHabilidadService{

    getAll(): Observable<Array<any>>;

    getHabilidad() : Observable<any>;

    crear(h:Habilidad): Observable<any>;

    modificar(h:Habilidad): Observable<any>;

    eliminar(h:Habilidad): Observable<any>;

}
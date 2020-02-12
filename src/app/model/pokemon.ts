export class Pokemon{

    private _id: number;
    private _nombre: string;
    private _habilidades: Array<any>;

    constructor(){
        this.id = 0;
        this.nombre = '';
        this.habilidades = [];
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
    
    public get habilidades(): Array<any> {
        return this._habilidades;
    }
    public set habilidades(value: Array<any>) {
        this._habilidades = value;
    }



}
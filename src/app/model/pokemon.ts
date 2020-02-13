export class Pokemon {

    id: number;
    nombre: string;
    habilidades: Array<any>;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.habilidades = [];
    }




}

/*
{
    "id": 1,
    "nombre": "lucario",
    "habilidades": [
      {
        "id": 1,
        "nombre": "impasible"
      },
      {
        "id": 2,
        "nombre": "foco interno"
      },
      {
        "id": 3,
        "nombre": "justiciero"
      }
    ]
  }

*/
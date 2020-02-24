export class Pokemon {

    id: number;
    nombre: string;
    imagen:string;
    habilidades: Array<any>;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.imagen = 'https://f0.pngfuel.com/png/295/911/pokemon-pokeball-png-clip-art.png';
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
let condition = true;
const IVA = 1.21;

const calcularIva = (precio) => precio * IVA;

const calcularTotal = (productos) => {
  let total = 0;
  for (let i = 0; i < productos.length; i++) {
    total += productos[i].precio;
  }
  return total;
};

const formatCurrency = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(precio);
};

class HuevoFaberge {
  constructor(id, nombre, precio, imagen, composicion, dimensiones, peso) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.composicion = composicion;
    this.dimensiones = dimensiones;
    this.peso = peso;
  }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

let productos = [];
let huevo1 = new HuevoFaberge(
  1,
  'Huevo de oro',
  100000,
  'img/huevo-oro.jpg',
  [
    ['Oro 24k', 75],
    ['Plata 925', 25],
  ],
  '10x10x10',
  '1kg'
);
let huevo2 = new HuevoFaberge(
  2,
  'Huevo de plata',
  75000,
  'img/huevo-plata.jpg',
  [['Plata 925', 100]],
  '10x10x10',
  '1kg'
);
let huevo3 = new HuevoFaberge(
  3,
  'Huevo de bronce',
  50000,
  [
    ['Bronce', 90],
    ['Plata 925', 10],
  ],
  'img/huevo-bronce.jpg',
  'Bronce',
  '10x10x10',
  '1kg'
);
let huevo4 = new HuevoFaberge(
  4,
  'Huevo de cobre',
  25000,
  [
    ['Cobre', 80],
    ['Plata 925', 20],
  ],
  'img/huevo-cobre.jpg',
  'Cobre',
  '10x10x10',
  '1kg'
);
productos.push(huevo1, huevo2, huevo3, huevo4);

do {
  let eleccion =
    prompt(`Bienvenido/a a nuestra tienda de Huevos Faberge, selecciona un producto:
        1-Huevo de oro
        2-Huevo de plata
        3-Huevo de bronce
        4-Salir de la tienda
        Total Carrito: ${formatCurrency(calcularTotal(productos))}
        Total IVA: ${formatCurrency(calcularIva(calcularTotal(productos)))}
        Total Productos: ${productos.length}
        `);

  //console.log(eleccion);
  switch (eleccion) {
    case '1':
      productos.push({ id: 1, nombre: 'Huevo de oro', precio: 100000 });
      break;
    case '2':
      productos.push({ id: 2, nombre: 'Huevo de plata', precio: 75000 });
      break;
    case '3':
      productos.push({ id: 3, nombre: 'Huevo de bronce', precio: 50000 });
      break;
    case '4':
      condition = !confirm('Estas seguro de querer salir?');
      break;
    case null: // cancelar del prompt sin valor
      condition = false;
      break;
    default:
      alert('Esa opción no está disponible');
      break;
  }
} while (condition);

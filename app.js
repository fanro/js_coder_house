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

const guardarCarrito = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const limpiarCarrito = () => {
  localStorage.removeItem('carrito');
};

const guardarFavoritos = (favoritos) => {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
};

const limpiarFavoritos = () => {
  localStorage.removeItem('favoritos');
};

const getPrecioHuevo = (huevo) => {
  return formatCurrency(huevo.precio);
};

const getHuevosDescuento = (huevos, descuento) => {
  return huevos.filter((huevo) => huevo.descuento == descuento);
};

class HuevoFaberge {
  constructor(
    id,
    nombre,
    precio,
    imagen,
    composicion,
    dimensiones,
    peso,
    descuento
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.composicion = composicion;
    this.dimensiones = dimensiones;
    this.peso = peso;
    this.descuento = descuento;
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
  '1kg',
  0
);

let huevo2 = new HuevoFaberge(
  2,
  'Huevo de plata',
  75000,
  'img/huevo-plata.jpg',
  [['Plata 925', 100]],
  '10x10x10',
  '1kg',
  5
);

let huevo3 = new HuevoFaberge(
  3,
  'Huevo de bronce',
  50000,
  'img/huevo-bronce.jpg',
  [
    ['Bronce', 90],
    ['Plata 925', 10],
  ],
  '10x10x10',
  '1kg',
  5
);

let huevo4 = new HuevoFaberge(
  4,
  'Huevo de cobre',
  25000,
  'img/huevo-cobre.jpg',
  [
    ['Cobre', 80],
    ['Plata 925', 20],
  ],
  '10x10x10',
  '1kg',
  20
);

productos.push(huevo1, huevo2, huevo3, huevo4);

// let res = getHuevosDescuento(productos, 5);
// console.log(res);

do {
  let eleccion =
    prompt(`Bienvenido/a a nuestra tienda de Huevos Faberge, selecciona un producto:
        1-Huevo de oro - ${getPrecioHuevo(huevo1)}
        2-Huevo de plata - ${getPrecioHuevo(huevo2)}
        3-Huevo de bronce - ${getPrecioHuevo(huevo3)}
        4-Huevo de cobre - ${getPrecioHuevo(huevo4)}
        5-Salir de la tienda
        Total Carrito: ${formatCurrency(calcularTotal(carrito))}
        Total IVA: ${formatCurrency(calcularIva(calcularTotal(carrito)))}
        Total Productos: ${carrito.length}
        `);

  //console.log(eleccion);
  switch (eleccion) {
    case '1':
      carrito.push(huevo1);
      guardarCarrito(carrito);
      break;
    case '2':
      carrito.push(huevo2);
      guardarCarrito(carrito);
      break;
    case '3':
      carrito.push(huevo3);
      guardarCarrito(carrito);
      break;
    case '4':
      carrito.push(huevo4);
      guardarCarrito(carrito);
      break;
    case '5':
      let cantidad =
        carrito.length > 0
          ? ` Tiene elementos en el carrito (${carrito.length})`
          : '';
      condition = !confirm(`Estas seguro de querer salir?${cantidad}`);
      if (!condition) {
        limpiarCarrito();
      }
      break;
    case null: // cancelar del prompt sin valor
      condition = false;
      break;
    default:
      alert('Esa opción no está disponible');
      break;
  }
} while (condition);

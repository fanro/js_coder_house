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

let productos = [];

do {
  let eleccion =
    prompt(`Bienvenido/a a nuestra tienda de Huevos Faberge, selecciona un producto:
        1-Huevo de oro
        2-Huevo de plata
        3-Huevo de bronce
        4-Salir de la tienda
        Total Carrito: ${new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }).format(calcularTotal(productos))}
        Total IVA: ${new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }).format(calcularIva(calcularTotal(productos)))}
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

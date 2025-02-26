let condition = true;
let totalCarrito = 0;
const IVA = 1.21;

const calcularIva = (precio) => precio * IVA;

do {
  let eleccion =
    prompt(`Bienvenido/a a nuestra tienda de Huevos Faberge, selecciona un producto:
        1-Huevo de oro
        2-Huevo de plata
        3-Huevo de bronce
        4-Ver total
        5-Salir de la tienda
        `);

  switch (eleccion) {
    case '1':
      totalCarrito += 100000;
      break;
    case '2':
      totalCarrito += 75000;
      break;
    case '3':
      totalCarrito += 50000;
      break;
    case '4':
      alert(`El total hasta el momento es $${totalCarrito}`);
      break;
    case '5':
      condition = !confirm('Estas seguro de querer salir?');
      break;
    default:
      alert('Esa opción no está disponible');
      break;
  }
} while (condition);

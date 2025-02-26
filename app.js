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
        5-Ver total con IVA
        6-Salir de la tienda
        `);

  //console.log(eleccion);
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
      alert(
        `El total hasta el momento con IVA es $${calcularIva(totalCarrito)}`
      );
      break;
    case '6':
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

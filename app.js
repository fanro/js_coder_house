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

const loadDom = (prods) => {
  let contenedor = document.querySelector('#product-list');
  prods.forEach((prod) => {
    //crean la lógica para cargar los prods en el DOM
    console.log(prod);

    let divProd = document.createElement('div');
    divProd.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');
    divProd.innerHTML = `
      <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${prod.img}" alt="">
          <div class="product-action">
            <a class="btn btn-outline-dark btn-square" onclick="addToCart(${
              prod.id
            })"><i class="fa fa-shopping-cart"></i></a>
            <a class="btn btn-outline-dark btn-square" onclick="addToFavorites(${
              prod.id
            })"><i class="far fa-heart"></i></a>
          </div>
        </div>
        <div class="text-center py-4">
          <a class="h6 text-decoration-none text-truncate" href="">${
            prod.nombre
          }</a>
          <div class="d-flex align-items-center justify-content-center mt-2">  
            ${
              prod.descuento
                ? ` <h5>${formatCurrency(
                    (1 - prod.descuento) * prod.precio
                  )}</h5><h6 class="text-muted ml-2"><del>${formatCurrency(
                    prod.precio
                  )}</del></h6>`
                : `<h5>${formatCurrency(prod.precio)}</h5>`
            }
          </div>
        </div>
      </div>`;

    contenedor.appendChild(divProd);
  });
};

const getData = async () => {
  let data = await fetch('./prods.json')
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  loadDom(data);
};

getData();

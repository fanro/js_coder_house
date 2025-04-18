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
  constructor(id, nombre, precio, imagen, descuento) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descuento = descuento;
  }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const refreshIndicadores = () => {
  let carritoCount = document.querySelector('#carrito-count');
  let favoritosCount = document.querySelector('#favoritos-count');

  carritoCount.innerHTML = carrito.length;
  favoritosCount.innerHTML = favoritos.length;
};

refreshIndicadores();

const huevos = [];

const addToFavorites = (id) => {
  let prod = huevos.find((prod) => prod.id == id);
  let mensaje = '';
  if (favoritos.some((item) => item.id == id)) {
    mensaje = 'El producto ya está en favoritos';
  } else {
    mensaje = 'Producto agregado a favoritos';
    favoritos.push(prod);
    guardarFavoritos(favoritos);
  }
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right,rgb(221, 59, 10), #96c93d)',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  refreshIndicadores();
};

const addToCart = (id) => {
  let mensaje = '';
  let prod = huevos.find((prod) => prod.id == id);
  if (carrito.some((item) => item.id == id)) {
    mensaje = 'El producto ya está en el carrito';
  } else {
    carrito.push(prod);
    guardarCarrito(carrito);
    mensaje = 'Producto agregado al carrito';
  }
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right,rgb(155, 201, 29), #96c93d)',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  refreshIndicadores();
};

const loadDom = (prods) => {
  let contenedor = document.querySelector('#product-list');
  prods.forEach((prod) => {
    let huevo = new HuevoFaberge(
      prod.id,
      prod.nombre,
      prod.precio,
      prod.img,
      prod.descuento
    );

    huevos.push(huevo);
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

const IVA = 0.21;

const calcularIva = (precio) => precio * IVA;

const formatCurrency = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(precio);
};

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const refreshIndicadores = () => {
  let carritoCount = document.querySelector('#carrito-count');
  let favoritosCount = document.querySelector('#favoritos-count');

  carritoCount.innerHTML = carrito.length;
  favoritosCount.innerHTML = favoritos.length;
};

const cleanDomCarrito = () => {
  let contenedor = document.querySelector('#cart-items');
  contenedor.innerHTML = '';
};

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((prod) => prod.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  refreshIndicadores();
  cleanDomCarrito();
  loadDomCarrito(carrito);
};

const modificarCantidad = (id, cantidad) => {
  if (cantidad >= 1) {
    let prod = carrito.find((prod) => prod.id === id);
    if (prod) {
      prod.cantidad = cantidad;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      refreshIndicadores();
      cleanDomCarrito();
      loadDomCarrito(carrito);
    }
  }
};

refreshIndicadores();

let totalCarrito = 0;
const refreshTotal = () => {
  let carritoCount = document.querySelector('#subtotal-carrito');
  carritoCount.innerHTML = formatCurrency(totalCarrito);
  let iva = document.querySelector('#calculo-iva');
  iva.innerHTML = formatCurrency(calcularIva(totalCarrito));
  let total = document.querySelector('#total-carrito');
  total.innerHTML = formatCurrency(totalCarrito + calcularIva(totalCarrito));
};

const loadDomCarrito = (prods) => {
  totalCarrito = 0;
  let contenedor = document.querySelector('#cart-items');
  prods.forEach((prod) => {
    let tr = document.createElement('tr');
    let precio = prod.descuento
      ? prod.precio * (1 - prod.descuento)
      : prod.precio;

    totalCarrito += precio * prod.cantidad;
    tr.innerHTML = `
                    <td class="align-middle"><img src="${
                      prod.img
                    }" alt="" style="width: 50px;">${prod.nombre}</td>
                    <td class="align-middle">            ${
                      prod.descuento
                        ? `${formatCurrency(
                            (1 - prod.descuento) * prod.precio
                          )} <br><del>${formatCurrency(prod.precio)}</del>`
                        : `${formatCurrency(prod.precio)}`
                    }</td>
                    <td class="align-middle">
                        <div class="input-group quantity mx-auto" style="width: 100px;">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-minus" onclick="modificarCantidad(${
                                  prod.id
                                }, ${prod.cantidad - 1})">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text"
                                class="form-control form-control-sm bg-secondary border-0 text-center"
                                value="${prod.cantidad}">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-plus" onclick="modificarCantidad(${
                                  prod.id
                                }, ${prod.cantidad + 1})">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle">${formatCurrency(
                      prod.cantidad * precio
                    )}</td>
                    <td class="align-middle"><button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${
                      prod.id
                    })"><i
                                class="fa fa-times"></i></button></td>`;

    contenedor.appendChild(tr);
  });

  refreshTotal();
};

loadDomCarrito(carrito);

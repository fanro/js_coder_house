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

refreshIndicadores();

const loadDomCarrito = (prods) => {
  console.log(prods);
  let contenedor = document.querySelector('#cart-items');
  prods.forEach((prod, inx) => {
    console.log(inx);
    let tr = document.createElement('tr');

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
                                <button class="btn btn-sm btn-primary btn-minus">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text"
                                class="form-control form-control-sm bg-secondary border-0 text-center"
                                value="1">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-plus">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle">$150</td>
                    <td class="align-middle"><button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${
                      prod.id
                    })"><i
                                class="fa fa-times"></i></button></td>`;

    contenedor.appendChild(tr);
  });
};

loadDomCarrito(carrito);

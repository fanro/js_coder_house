let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const refreshIndicadores = () => {
  let carritoCount = document.querySelector('#carrito-count');
  let favoritosCount = document.querySelector('#favoritos-count');

  carritoCount.innerHTML = carrito.length;
  favoritosCount.innerHTML = favoritos.length;
};

refreshIndicadores();

const eliminarDeFavoritos = (id) => {
  favoritos = favoritos.filter((prod) => prod.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  refreshIndicadores();
  cleanDomFavoritos();
  loadDomFavoritos(favoritos);
};

const formatCurrency = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(precio);
};

const cleanDomFavoritos = () => {
  let contenedor = document.querySelector('#favoritos-lista');
  contenedor.innerHTML = '';
};

const loadDomFavoritos = (prods) => {
  let contenedor = document.querySelector('#favoritos-lista');

  prods.forEach((prod) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
                <tr>
                    <td class="align-middle"><img src="${
                      prod.img
                    }" alt="" style="width: 50px;">${prod.nombre}</td>
                    <td class="align-middle"> ${
                      prod.descuento
                        ? `${formatCurrency(
                            (1 - prod.descuento) * prod.precio
                          )} <br><del>${formatCurrency(prod.precio)}</del>`
                        : `${formatCurrency(prod.precio)}`
                    }</td>
                    <td class="align-middle"><button class="btn btn-sm btn-danger" onclick="eliminarDeFavoritos(${
                      prod.id
                    })"><i
                                class="fa fa-times"></i></button></td>
                </tr>
        `;
    contenedor.appendChild(tr);
  });
};

loadDomFavoritos(favoritos);

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let currentSlide = 0;

cargarEventListeners();

function cargarEventListeners() {
    // agregar producto al carrito
    elementos1.addEventListener('click', comprarElemento);

    // para eliminar producto del carrito
    carrito.addEventListener('click', eliminarElemento);

    // para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Cambiar imágenes autom
    setInterval(nextSlide, 5000);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.closest('.producto');
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    // Obt la hora actual 
    const fechaHora = new Date().toLocaleString();

    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id'),
        agregadoEn: fechaHora // Agregar la hora 
    };

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    // Crear una nueva fila en la tabla del carrito
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
          <img src="${elemento.imagen}" width=100>
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>${elemento.agregadoEn}</td> <!-- Mostrar la hora de adición -->
        <td>
             <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.closest('tr').remove(); // Eliminar la fila del carrito
    }
}

function vaciarCarrito() {
    // Eliminar todas las filas del carrito
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('#carousel-images img');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.getElementById('carousel-images').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

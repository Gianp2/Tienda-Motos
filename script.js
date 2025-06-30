const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let currentSlide = 0;
let isTransitioning = false;
const slides = document.querySelectorAll('#carousel-images img');
const totalSlides = slides.length;
const carouselImages = document.getElementById('carousel-images');
const indicatorsContainer = document.getElementById('carousel-indicators');

// Reloj
function actualizarReloj() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  document.getElementById('reloj').innerText = `${horas}:${minutos}:${segundos}`;
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Mostrar y ocultar carrito con retardo
const submenu = document.querySelector('.submenu');
let timeoutCarrito;

submenu.addEventListener('mouseenter', () => {
  clearTimeout(timeoutCarrito);
  carrito.style.display = 'block';
});

submenu.addEventListener('mouseleave', () => {
  timeoutCarrito = setTimeout(() => {
    carrito.style.display = 'none';
  }, 500);
});

carrito.addEventListener('mouseenter', () => {
  clearTimeout(timeoutCarrito);
  carrito.style.display = 'block';
});

carrito.addEventListener('mouseleave', () => {
  timeoutCarrito = setTimeout(() => {
    carrito.style.display = 'none';
  }, 500);
});

// Carrusel
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
carouselImages.appendChild(firstClone);
carouselImages.insertBefore(lastClone, slides[0]);

const totalWithClones = totalSlides + 2;
carouselImages.style.width = `${totalWithClones * 100}%`;

for (let i = 0; i < totalSlides; i++) {
  const indicator = document.createElement('span');
  indicator.addEventListener('click', () => goToSlide(i));
  indicatorsContainer.appendChild(indicator);
}

function updateIndicators() {
  const indicators = indicatorsContainer.children;
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].classList.toggle('active', i === currentSlide % totalSlides);
  }
}

function showSlide(index, skipTransition = false) {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSlide = index;
  const offset = -(currentSlide + 1) * 100;
  carouselImages.style.transition = skipTransition ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  carouselImages.style.transform = `translateX(${offset / totalWithClones}%)`;

  if (currentSlide >= totalSlides) {
    setTimeout(() => {
      carouselImages.style.transition = 'none';
      currentSlide = 0;
      carouselImages.style.transform = `translateX(-${100 / totalWithClones}%)`;
      isTransitioning = false;
    }, 600);
  } else if (currentSlide < 0) {
    setTimeout(() => {
      carouselImages.style.transition = 'none';
      currentSlide = totalSlides - 1;
      carouselImages.style.transform = `translateX(-${(totalSlides * 100) / totalWithClones}%)`;
      isTransitioning = false;
    }, 600);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  updateIndicators();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
}

carouselImages.style.transform = `translateX(-${100 / totalWithClones}%)`;
updateIndicators();

let autoSlide = setInterval(nextSlide, 5000);

document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 5000);
});

// Carrito
let carritoItems = [];

function cargarEventListeners() {
  elementos1.addEventListener('click', comprarElemento);
  lista.addEventListener('click', eliminarElemento); // Cambiado de 'carrito' a 'lista' para mayor precisión
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const elemento = e.target.closest('.producto');
    leerDatosElemento(elemento);
  }
}

function leerDatosElemento(elemento) {
  const fechaHora = new Date().toLocaleString();
  const infoElemento = {
    imagen: elemento.querySelector('img').src,
    titulo: elemento.querySelector('h3').textContent,
    precio: elemento.querySelector('.precio').textContent.replace('$', ''),
    id: elemento.dataset.id,
    agregadoEn: fechaHora
  };
  carritoItems.push(infoElemento);
  insertarCarrito(infoElemento);
  updateContador();
}

function insertarCarrito(elemento) {
  const row = document.createElement('tr');
  row.classList.add('animado');
  row.innerHTML = `
    <td><img src="${elemento.imagen}" class="w-12 h-12 object-cover rounded" alt="${elemento.titulo}" /></td>
    <td>${elemento.titulo}</td>
    <td>$${elemento.precio}</td>
    <td>${elemento.agregadoEn}</td>
    <td><a href="#" class="borrar btn-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" data-id="${elemento.id}">X</a></td>
  `;
  lista.appendChild(row);
  setTimeout(() => {
    row.classList.remove('animado');
  }, 1000);
}

function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar')) {
    const id = e.target.getAttribute('data-id');
    carritoItems = carritoItems.filter(item => item.id !== id);
    e.target.closest('tr').remove();
    updateContador();
  }
}

function vaciarCarrito(e) {
  e.preventDefault();
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  carritoItems = [];
  updateContador();
}

function updateContador() {
  const contador = document.getElementById('contador-carrito');
  contador.innerText = carritoItems.length;
  contador.classList.add('animate__animated', 'animate__bounceIn');
  setTimeout(() => contador.classList.remove('animate__animated', 'animate__bounceIn'), 500);
}

cargarEventListeners();

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
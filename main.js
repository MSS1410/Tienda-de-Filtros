// Array de productos
const products = [
  {
    name: 'New Balance 530',
    marca: 'new_balance',
    category: ['hombre', 'mujer'],
    image: './assets/gallery2.jpg',
    link: 'https://www.newbalance.es/es/comprar-por-modelo/todas-las-530/?_gl=1*un8uyv*_up*MQ..&gclid=CjwKCAjwzIK1BhAuEiwAHQmU3qKANOiD67vAArnnxqC7HYk3eUesSNwVQdzGXO8erUc2hx0IkguGeBoC_30QAvD_BwE&gclsrc=aw.ds'
  },
  {
    name: 'Nike Dunk Low',
    marca: 'nike',
    category: ['hombre', 'mujer'],
    image: './assets/dunk3.jpeg',
    link: 'https://www.nike.com/es/ca/w/dunk-calcat-90aohzy7ok'
  },
  {
    name: 'Rebook C 85',
    marca: 'reebok',
    category: ['hombre', 'mujer'],
    image: './assets/rebk.jpg',
    link: 'https://www.reebok.eu/es-es/sets/club-c?cm_mmc=ReebokSEM_Google-_--_-Reebok+Club+C85-_-&cm_mmca1=ES&cm_mmca2=b&gad_source=1&gclid=CjwKCAjwzIK1BhAuEiwAHQmU3v-4TLUgYTo3chMlVgV3NYAq4b0fWsF0f2aiMAF5969y4dhszFvtORoCkPgQAvD_BwE&gclsrc=aw.ds'
  },
  {
    name: 'Nike Dunk Low Kids',
    marca: 'nike',
    category: ['ninos'],
    image: './assets/dunk.jpeg',
    link: 'https://www.nike.com/es/ca/w/dunk-calcat-90aohzy7ok'
  },
  {
    name: 'Addidas Samba Black',
    marca: 'addidas',
    category: ['mujer'], // Cambiado a array
    image: './assets/gallery3.jpg',
    link: 'https://www.adidas.es/negro-samba'
  },
  {
    name: 'Salomon ACS + OG',
    marca: 'salomon',
    category: ['hombre', 'mujer'],
    image: './assets/salo2.jpg',
    link: 'https://www.salomon.com/es-es/shop-emea/men/shoes/sportstyle/sneakers-collection.html'
  },
  {
    name: 'Addidas Adilette Summer',
    marca: 'addidas',
    category: ['hombre', 'mujer'],
    image: './assets/chadd.jpg',
    link: 'https://www.adidas.es/sandalias_chanclas?af_channel=Search&af_reengagement_window=30d&c=adidas-Product_Types-B-Exact-ROI&cm_mmc=AdieSEM_Google-_-adidas-Product_Types-B-Exact-ROI-_-Sliders%20%26%20Flip-Flops-_-adidas%20chanclas&cm_mmca1=ES&cm_mmca2=e&ds_agid=58700007015679116&ds_kid=43700063159585262&gad_source=1&gclid=CjwKCAjwzIK1BhAuEiwAHQmU3oifwOsHLyI7TIidXLb4ameQf7Yra56NFIDou9xyH21JGIfgS_rWJhoCPTMQAvD_BwE&gclsrc=aw.ds&is_retargeting=true&pid=googleadwords_temp'
  },
  {
    name: 'Fila Disruptor 2',
    marca: 'fila',
    category: ['hombre', 'mujer'],
    image: './assets/fila.jpg',
    link: 'https://www.fila.com/mens-disruptor-2-premium/1FM00139.html?fromList=Category%3A%20Sneakers&gridposition=18&cgid=men-sneakers'
  },
  {
    name: 'Martens Boots 1460 Style',
    marca: 'martens',
    category: ['hombre', 'mujer'],
    image: './assets/martens.jpeg',
    link: 'https://www.drmartens.com/es/es/botas-1460-de-piel-smooth-negro/p/11822006'
  },
  {
    name: 'Air Jordan',
    marca: 'jordan',
    category: ['hombre', 'mujer'],
    image: './assets/jordan.jpeg',
    link: 'https://www.nike.com/es/t/air-jordan-1-mid-zapatillas-8KzLMC/DV0991-101'
  }
]

// funcion render de productos
function pintarProducts(products) {
  const gallery = document.getElementById('gallery')
  gallery.innerHTML = '' // limpiar galeria
  // para decirle al usuario que no hay el elemento que busca
  if (products.length === 0) {
    const noExiste = document.createElement('p')
    noExiste.textContent =
      'Lo sentimos, actualmente no tenemos Sneakers que cumplan su búsqueda.'
    noExiste.style.color = 'red' // cambia el color del mensaje
    noExiste.style.textAlign = 'center'
    gallery.appendChild(noExiste)
    return
  }

  products.forEach((product) => {
    // a para producto
    const productLink = document.createElement('a')
    productLink.href = product.link

    // img
    const img = document.createElement('img')
    img.src = product.image
    img.alt = product.name

    // añaddir img a enlace
    productLink.appendChild(img)

    //  añadir enlace con img a galeria
    gallery.appendChild(productLink)
  })
}

// ver todo de inicio
pintarProducts(products)

// Modal
const menu = document.getElementById('filtros-menu')
const openMenuBtn = document.getElementById('open-menu')
const closeMenuSpan = document.getElementsByClassName('close')[0]

// abrir modal
openMenuBtn.onclick = function () {
  menu.style.display = 'block'
}

// cerrar modal
closeMenuSpan.onclick = function () {
  menu.style.display = 'none'
}

// cerrar modal con clic fuera del contenido del modal
window.onclick = function (event) {
  if (event.target == menu) {
    menu.style.display = 'none'
  }
}

// aplico filtros
const aplicarFiltrosBtn = document.getElementById('aplicar-filtros')

aplicarFiltrosBtn.onclick = function () {
  const categoriaSeleccionada = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((input) => input.value)

  const marcaSeleccionada = document.getElementById('marca').value

  let productosFiltrados = products

  if (categoriaSeleccionada.length > 0) {
    productosFiltrados = productosFiltrados.filter((product) => {
      // verificamos si el producto esta en el array y lo devolv
      if (Array.isArray(product.category)) {
        return product.category.some((cat) =>
          categoriaSeleccionada.includes(cat)
        )
      }
      return false
    })
  }

  if (marcaSeleccionada) {
    productosFiltrados = productosFiltrados.filter(
      (product) => product.marca === marcaSeleccionada
    )
  }

  pintarProducts(productosFiltrados)
  menu.style.display = 'none'
}

// Limpiar filtros
const resetFiltrosBtn = document.getElementById('reset-filters')

resetFiltrosBtn.onclick = function () {
  document
    .querySelectorAll('input[name="category"]:checked')
    .forEach((input) => (input.checked = false))
  document.getElementById('marca').value = ''
  pintarProducts(products)
}

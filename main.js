//  array de prodcts
const products = [
  {
    name: 'New Balance 530',
    marca: 'new_balance',
    category: ['hombre', 'mujer'],
    image: './assets/gallery2.jpg',
    link: 'https://www.newbalance.es/',
    sellCount: 1200
  },
  {
    name: 'Nike Dunk Low',
    marca: 'nike',
    category: ['hombre', 'mujer'],
    image: './assets/dunk3.jpeg',
    link: 'https://www.nike.com/',
    sellCount: 1800
  },
  {
    name: 'Reebok C 85',
    marca: 'reebok',
    category: ['hombre', 'mujer'],
    image: './assets/rebk.jpg',
    link: 'https://www.reebok.eu/',
    sellCount: 900
  },
  {
    name: 'Nike Dunk Low Kids',
    marca: 'nike',
    category: ['ninos'],
    image: './assets/dunk.jpeg',
    link: 'https://www.nike.com/',
    sellCount: 700
  },
  {
    name: 'Adidas Samba Black',
    marca: 'adidas',
    category: ['mujer'],
    image: './assets/gallery3.jpg',
    link: 'https://www.adidas.es/',
    sellCount: 2100
  },
  {
    name: 'Salomon ACS + OG',
    marca: 'salomon',
    category: ['hombre', 'mujer'],
    image: './assets/salo2.jpg',
    link: 'https://www.salomon.com/',
    sellCount: 400
  },
  {
    name: 'Adidas Adilette Summer',
    marca: 'adidas',
    category: ['hombre', 'mujer'],
    image: './assets/chadd.jpg',
    link: 'https://www.adidas.es/',
    sellCount: 300
  },
  {
    name: 'Fila Disruptor 2',
    marca: 'fila',
    category: ['hombre', 'mujer'],
    image: './assets/fila.jpg',
    link: 'https://www.fila.com/',
    sellCount: 650
  },
  {
    name: 'Martens Boots 1460',
    marca: 'martens',
    category: ['hombre', 'mujer'],
    image: './assets/martens.jpeg',
    link: 'https://www.drmartens.com/',
    sellCount: 500
  },
  {
    name: 'Air Jordan 1 Mid',
    marca: 'jordan',
    category: ['hombre', 'mujer'],
    image: './assets/jordan.jpeg',
    link: 'https://www.nike.com/',
    sellCount: 2500
  }
]

//  helper debounce
function debounce(fn, ms = 250) {
  let t
  return (...a) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...a), ms)
  }
}

// sugg para 0 resultados
function getSmartSuggestions({ texto, categorias, marca }) {
  let base = products.filter(
    (p) =>
      (!!marca && p.marca === marca) ||
      (categorias.length > 0 &&
        categorias.some((c) => (p.category || []).includes(c))) ||
      (!!texto && p.name.toLowerCase().includes(texto))
  )
  if (base.length === 0) base = [...products]

  const hasSell = base.some((p) => typeof p.sellCount === 'number')
  if (hasSell) base.sort((a, b) => (b.sellCount || 0) - (a.sellCount || 0))
  else base.sort(() => Math.random() - 0.5)

  const out = []
  const seen = new Set()
  for (const p of base) {
    const k = p.name + (p.marca || '')
    if (!seen.has(k)) {
      seen.add(k)
      out.push(p)
    }
    if (out.length === 3) break
  }
  return out
}

// tarjeta producto
function productCard(product) {
  const a = document.createElement('a')
  a.href = product.link || '#'
  a.target = '_blank'
  a.rel = 'noopener noreferrer'

  const card = document.createElement('div')
  card.className = 'product'
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h4>${product.name}</h4>
    <p class="meta">${(product.marca || '').replace('_', ' ')}</p>
  `
  a.appendChild(card)
  return a
}

// render de tarjetas con sugg resultados
function pintarProducts(list) {
  const gallery = document.getElementById('gallery')
  gallery.innerHTML = ''
  if (!list || list.length === 0) {
    const noExiste = document.createElement('div')
    noExiste.className = 'no-results'
    noExiste.innerHTML = `
      <p>Lo sentimos, no encontramos productos que cumplan tu búsqueda.</p>
      <h4>Quizá te interese:</h4>
      <div class="suggestions"></div>
    `
    gallery.appendChild(noExiste)

    const texto = (document.getElementById('search').value || '')
      .toLowerCase()
      .trim()
    const categorias = Array.from(
      document.querySelectorAll('input[name="category"]:checked')
    ).map((i) => i.value)
    const marca = document.getElementById('marca').value

    const suggestions = getSmartSuggestions({ texto, categorias, marca })
    const sugWrap = noExiste.querySelector('.suggestions')
    suggestions.forEach((p) => sugWrap.appendChild(productCard(p)))
    return
  }
  list.forEach((p) => gallery.appendChild(productCard(p)))
}

// filtrado combinado texto marca categoria
function filtrar() {
  const texto = (document.getElementById('search').value || '')
    .toLowerCase()
    .trim()
  const categorias = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((i) => i.value)
  const marca = document.getElementById('marca').value

  const result = products.filter((p) => {
    const byText = !texto || p.name.toLowerCase().includes(texto)
    const byCat =
      categorias.length === 0 ||
      categorias.some((c) => (p.category || []).includes(c))
    const byMarca = !marca || p.marca === marca
    return byText && byCat && byMarca
  })

  pintarProducts(result)
}

// UI iny por JS
function renderApp() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <header>
      <div class="header-top"><p>¡Ofertas Especiales!</p></div>
      <div class="header-main">
        <div class="logo">
          <img src="./assets/Foot-Locker-Logo.png" alt="Foot Locker Logo" />
        </div>
        <div class="search">
          <input type="text" id="search" placeholder="Busca tu producto" />
        </div>
        <div class="actions">
          <button id="login">Iniciar Sesión</button>
          <button id="cart" aria-label="Carrito">
            <img src="./assets/cart.png" alt="Carrito" />
          </button>
          <button id="create-account">Crear Cuenta</button>
        </div>
      </div>
      <div class="header-bottom">
        <button id="open-menu" aria-haspopup="dialog" aria-controls="filtros-menu">Añadir filtros</button>
      </div>

      <div id="filtros-menu" class="menu" role="dialog" aria-modal="true" aria-labelledby="filtros-title" style="display:none">
        <div class="menu-content">
          <span id="close-menu" class="close" aria-label="Cerrar">&times;</span>
          <h3 id="filtros-title">Filtros</h3>

          <div class="sticky-controls">
            <button id="reset-filters" class="reset-primary" type="button" aria-label="Limpiar filtros">Limpiar Filtros</button>
          </div>

          <div class="filter-group">
            <h4>Categoría</h4>
            <label><input type="checkbox" name="category" value="hombre" /> Hombre</label>
            <label><input type="checkbox" name="category" value="mujer" /> Mujer</label>
            <label><input type="checkbox" name="category" value="ninos" /> Niños</label>
          </div>

          <div class="filter-group">
            <h4>Marca</h4>
            <select id="marca" name="marca">
              <option value="">Todas</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
              <option value="reebok">Reebok</option>
              <option value="fila">Fila</option>
              <option value="salomon">Salomon</option>
              <option value="new_balance">New Balance</option>
              <option value="jordan">Jordan</option>
              <option value="martens">Martens</option>
            </select>
          </div>

          <button id="aplicar-filtros">Aplicar Filtros</button>
        </div>
      </div>
    </header>

    <main>
      <section id="selection" aria-label="Selección rápida">
        <button class="category-btn" data-category="hombre">Comprar para Hombre</button>
        <button class="category-btn" data-category="mujer">Comprar para Mujer</button>
        <button class="category-btn" data-category="ninos">Comprar para Niños</button>
      </section>

      <section id="gallery" aria-label="Galería de productos"></section>

      <section id="slogans" aria-label="Slogans">
        <div class="slogan-card"><h3>Envíos 24/48h</h3></div>
        <div class="slogan-card"><h3>Devoluciones fáciles</h3></div>
        <div class="slogan-card"><h3>Pagos seguros</h3></div>
      </section>

      <section id="large-gallery" aria-label="Destacados">
        <img src="./assets/largeimage1.avif" alt="Imagen destacada" />
      </section>

      <section id="filtros" aria-label="Filtros rápidos">
        <button id="filter-hombre">Hombre</button>
        <button id="filter-mujer">Mujer</button>
        <button id="filter-ninos">Niños</button>
        <button id="filter-best-sellers">Más Vendidos</button>
        <button id="filter-novedades">Novedades</button>
        <button id="reset-filters-inline" class="reset-secondary" type="button" aria-label="Limpiar filtros">Limpiar Filtros</button>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 Foot Locker</p>
      <ul>
        <li><a href="#about">Sobre Nosotros</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li><a href="#privacy">Privacidad</a></li>
      </ul>
    </footer>
  `

  attachBehaviors()
}

//events
function attachBehaviors() {
  // Render inicial
  pintarProducts(products)

  // busq debounce
  const search = document.getElementById('search')
  search.addEventListener('input', debounce(filtrar, 200))

  // select rapida
  document.querySelectorAll('.category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('input[name="category"]')
        .forEach((i) => (i.checked = false))
      const v = btn.dataset.category
      const input = document.querySelector(
        `input[name="category"][value="${v}"]`
      )
      if (input) input.checked = true
      filtrar()
    })
  })

  // modal de filtros
  const menu = document.getElementById('filtros-menu')
  document.getElementById('open-menu').onclick = () =>
    (menu.style.display = 'block')
  document.getElementById('close-menu').onclick = () =>
    (menu.style.display = 'none')
  window.addEventListener('click', (ev) => {
    if (ev.target === menu) menu.style.display = 'none'
  })

  // aplicar los filtros
  document.getElementById('aplicar-filtros').onclick = () => {
    filtrar()
    menu.style.display = 'none'
  }

  // limpieza
  function resetFiltros() {
    document
      .querySelectorAll('input[name="category"]:checked')
      .forEach((i) => (i.checked = false))
    document.getElementById('marca').value = ''
    search.value = ''
    pintarProducts(products)
    search.focus() // devuelve focus buscador
  }
  document.getElementById('reset-filters').onclick = resetFiltros
  document.getElementById('reset-filters-inline').onclick = resetFiltros

  // para filtrado rapido
  ;[
    ['filter-hombre', 'hombre'],
    ['filter-mujer', 'mujer'],
    ['filter-ninos', 'ninos']
  ].forEach(([id, cat]) => {
    const btn = document.getElementById(id)
    if (btn)
      btn.onclick = () => {
        document
          .querySelectorAll('input[name="category"]')
          .forEach((i) => (i.checked = false))
        const input = document.querySelector(
          `input[name="category"][value="${cat}"]`
        )
        if (input) input.checked = true
        filtrar()
      }
  })

  // ej best seller
  const bs = document.getElementById('filter-best-sellers')
  if (bs)
    bs.onclick = () =>
      pintarProducts(
        [...products]
          .sort((a, b) => (b.sellCount || 0) - (a.sellCount || 0))
          .slice(0, 6)
      )
  const nv = document.getElementById('filter-novedades')
  if (nv) nv.onclick = () => pintarProducts(products.slice(-6))
}

// up it
document.addEventListener('DOMContentLoaded', renderApp)

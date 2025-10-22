// datos de productos para el web
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

// helpers
function debounce(fn, ms = 250) {
  let t
  return (...a) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...a), ms)
  }
}

// helper para crear nodos, me evito proceso de escritura y facilita comprension y lectura del codigo
// asi puedo crear nodos y poner atributos/ hijos facil. me evito el "createElement, setAttribute y appendChild"
const el = (tag, attrs = {}, children = []) => {
  const n = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v
    else if (k === 'text') n.textContent = v
    else if (k in n) n[k] = v
    // id, src, alt, href, type, value, role, etc.
    else n.setAttribute(k, v)
  }
  ;(Array.isArray(children) ? children : [children])
    .filter(Boolean)
    .forEach((c) =>
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
    )
  return n
}

const clear = (node) => {
  while (node.firstChild) node.removeChild(node.firstChild)
}

// Suggs, Sacaremos 3 atleatorias si no hay resultados
/**
------ getSmartSuggestions
Devuelve siempre 3 zap atleatorios de los que tenemos
cuando? - cuando no hay results tras los filtros.
mediante la firma, se guardan parametros para no romper llamadas, lo ignoramos a proposito

 **/
function getSmartSuggestions(/* { texto, categorias, marca } */) {
  const pool = products.slice().sort(() => Math.random() - 0.5)
  const out = []
  const seen = new Set()
  for (const p of pool) {
    const k = p.name + (p.marca || '')
    if (!seen.has(k)) {
      seen.add(k)
      out.push(p)
    }
    if (out.length === 3) break
  }
  return out
}

//Cards y pintado
function productCard(product) {
  const a = el('a', {
    href: product.link || '#',
    target: '_blank',
    rel: 'noopener noreferrer'
  })

  // estructura tarjeta del dom:
  const card = el('div', { class: 'product' }, [
    el('img', { src: product.image, alt: product.name }),
    el('h4', { text: product.name }),
    el('p', {
      class: 'meta',
      text: (product.marca || '').replace('_', ' ')
    })
  ])

  a.appendChild(card)
  return a
}

function pintarProducts(list) {
  const gallery = document.getElementById('gallery')
  clear(gallery)

  if (!list || list.length === 0) {
    // mensaje con container de suggests
    const noExiste = el('div', { class: 'no-results' }, [
      el('p', { text: 'No hay resultados para los filtros seleccionados.' }),
      el('h4', { text: 'Quizá te interesen estas sugerencias:' }),
      el('div', { class: 'suggestions' })
    ])
    gallery.appendChild(noExiste)

    const suggestions = getSmartSuggestions()
    const sugWrap = noExiste.querySelector('.suggestions')
    suggestions.forEach((p) => sugWrap.appendChild(productCard(p)))
    return
  }

  list.forEach((p) => gallery.appendChild(productCard(p)))
}

//  filtrado con combinaciones
function filtrar() {
  const texto = (document.getElementById('search').value || '')
    .toLowerCase()
    .trim()
  const categorias = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((i) => i.value)
  const marca = document.getElementById('marca').value

  const result = products.filter((p) => {
    const byText = !texto || (p.name || '').toLowerCase().includes(texto)
    const byCat =
      categorias.length === 0 ||
      categorias.some((c) => (p.category || []).includes(c))
    const byMarca = !marca || p.marca === marca
    return byText && byCat && byMarca
  })

  pintarProducts(result)
}

// inyectamos en DOM
function renderApp() {
  const app = document.getElementById('app')
  // clean punto de montaje app
  clear(app)

  // HEADER
  const headerTop = el(
    'div',
    { class: 'header-top' },
    el('p', { text: '¡Ofertas Especiales!' })
  )
  const logoImg = el('img', {
    src: './assets/Foot-Locker-Logo.png',
    alt: 'Foot Locker Logo'
  })
  const logoBox = el('div', { class: 'logo' }, logoImg)

  // sesion y carrito
  const actions = el('div', { class: 'actions' }, [
    el('button', { id: 'login', text: 'Iniciar Sesión', type: 'button' }),
    el('button', { id: 'cart', ariaLabel: 'Carrito', type: 'button' }, [
      el('img', { src: './assets/cart.png', alt: 'Carrito' })
    ]),
    el('button', { id: 'create-account', text: 'Crear Cuenta', type: 'button' })
  ])

  // searcher en header

  const searchBox = el('div', { class: 'search' }, [
    el('input', {
      id: 'search',
      type: 'search',
      placeholder: 'Busca tu producto'
    })
  ])

  const headerMain = el('div', { class: 'header-main' }, [
    logoBox,
    searchBox,
    actions
  ])
  const openBtn = el('button', {
    id: 'open-menu',
    type: 'button',
    ariaHaspopup: 'dialog',
    ariaControls: 'filtros-menu',
    text: 'Añadir filtros'
  })
  const headerBottom = el('div', { class: 'header-bottom' }, openBtn)
  const header = el('header', {}, [headerTop, headerMain, headerBottom])

  // modal filtros juntos
  const modal = el('div', {
    id: 'filtros-menu',
    class: 'menu',
    role: 'dialog',
    ariaModal: 'true',
    ariaLabelledby: 'filtros-title',
    style: 'display:none'
  })

  const closeBtn = el('span', {
    id: 'close-menu',
    class: 'close',
    ariaLabel: 'Cerrar',
    role: 'button',
    tabIndex: 0,
    text: '×'
  })

  const sticky = el('div', { class: 'sticky-controls' }, [
    el('button', {
      id: 'reset-filters',
      class: 'reset-primary',
      type: 'button',
      ariaLabel: 'Limpiar filtros',
      text: 'Limpiar Filtros'
    })
  ])

  const gCat = el('div', { class: 'filter-group' }, [
    el('h4', { text: 'Categoría' }),
    el('label', {}, [
      el('input', { type: 'checkbox', name: 'category', value: 'hombre' }),
      document.createTextNode(' Hombre')
    ]),
    el('label', {}, [
      el('input', { type: 'checkbox', name: 'category', value: 'mujer' }),
      document.createTextNode(' Mujer')
    ]),
    el('label', {}, [
      el('input', { type: 'checkbox', name: 'category', value: 'ninos' }),
      document.createTextNode(' Niños')
    ])
  ])

  const gBrand = el('div', { class: 'filter-group' }, [
    el('h4', { text: 'Marca' }),
    (function () {
      const sel = el('select', { id: 'marca', name: 'marca' })
      const opts = [
        ['', 'Todas'],
        ['nike', 'Nike'],
        ['adidas', 'Adidas'],
        ['puma', 'Puma'],
        ['reebok', 'Reebok'],
        ['fila', 'Fila'],
        ['salomon', 'Salomon'],
        ['new_balance', 'New Balance'],
        ['jordan', 'Jordan'],
        ['martens', 'Martens']
      ]
      opts.forEach(([v, t]) =>
        sel.appendChild(el('option', { value: v, text: t }))
      )
      return sel
    })()
  ])

  const applyBtn = el('button', {
    id: 'aplicar-filtros',
    type: 'button',
    text: 'Aplicar Filtros'
  })

  const modalContent = el('div', { class: 'menu-content' }, [
    closeBtn,
    el('h3', { id: 'filtros-title', text: 'Filtros' }),
    sticky,
    gCat,
    gBrand,
    applyBtn
  ])

  modal.appendChild(modalContent)

  // MAIN
  const selection = el(
    'section',
    { id: 'selection', ariaLabel: 'Selección rápida' },
    [
      el('button', {
        class: 'category-btn',
        'data-category': 'hombre',
        type: 'button',
        text: 'Comprar para Hombre'
      }),
      el('button', {
        class: 'category-btn',
        'data-category': 'mujer',
        type: 'button',
        text: 'Comprar para Mujer'
      }),
      el('button', {
        class: 'category-btn',
        'data-category': 'ninos',
        type: 'button',
        text: 'Comprar para Niños'
      })
    ]
  )

  const gallery = el('section', {
    id: 'gallery',
    ariaLabel: 'Galería de productos'
  })

  const slogans = el('section', { id: 'slogans', ariaLabel: 'Slogans' }, [
    el('div', { class: 'slogan-card' }, el('h3', { text: 'Envíos 24/48h' })),
    el(
      'div',
      { class: 'slogan-card' },
      el('h3', { text: 'Devoluciones fáciles' })
    ),
    el('div', { class: 'slogan-card' }, el('h3', { text: 'Pagos seguros' }))
  ])

  const largeGallery = el(
    'section',
    { id: 'large-gallery', ariaLabel: 'Destacados' },
    [el('img', { src: './assets/largeimage1.avif', alt: 'Imagen destacada' })]
  )

  const filtrosRapidos = el(
    'section',
    { id: 'filtros', ariaLabel: 'Filtros rápidos' },
    [
      el('button', { id: 'filter-hombre', type: 'button', text: 'Hombre' }),
      el('button', { id: 'filter-mujer', type: 'button', text: 'Mujer' }),
      el('button', { id: 'filter-ninos', type: 'button', text: 'Niños' }),
      el('button', {
        id: 'reset-filters-inline',
        class: 'reset-secondary',
        type: 'button',
        ariaLabel: 'Limpiar filtros',
        text: 'Limpiar Filtros'
      })
    ]
  )

  const main = el('main', {}, [
    selection,
    gallery,
    slogans,
    largeGallery,
    filtrosRapidos
  ])

  // FOOTER
  const footer = el('footer', {}, [
    el('p', { text: '© 2024 Foot Locker' }),
    el('ul', {}, [
      el('li', {}, el('a', { href: '#about', text: 'Sobre Nosotros' })),
      el('li', {}, el('a', { href: '#contact', text: 'Contacto' })),
      el('li', {}, el('a', { href: '#privacy', text: 'Privacidad' }))
    ])
  ])

  // pintamos cada elemento en app ahora si con append
  app.appendChild(header)
  app.appendChild(modal)
  app.appendChild(main)
  app.appendChild(footer)

  adjuntarEventos()
}

// adjuntar events
/**

se lanza despues de renderApp y conecta la ui con la logica.
- pinta productos iniciales
- conecto buscador con debounce
- gestion de categorias
- abrir cerrar filtros
- aplica si es necesario el filtrado, con reset y repintado

-- mantengo responsabilidades separadas.
---renderApp() dibujara Ui // desde aqui cableamos funcionamioento

 */

function adjuntarEventos() {
  // Render inicial
  pintarProducts(products)

  // debounce en searcher
  // search en header
  const search = document.getElementById('search')
  search.addEventListener('input', debounce(filtrar, 200))

  // checkbox modal y filtros
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

  // abrir cerrar modal filtros
  const menu = document.getElementById('filtros-menu')
  document.getElementById('open-menu').onclick = () =>
    (menu.style.display = 'block')
  const close = () => (menu.style.display = 'none')
  document.getElementById('close-menu').onclick = close
  window.addEventListener('click', (ev) => {
    if (ev.target === menu) close()
  })
  window.addEventListener('keydown', (ev) => {
    if (menu.style.display === 'block' && ev.key === 'Escape') close()
  })

  // aplicar los filtros
  document.getElementById('aplicar-filtros').onclick = () => {
    filtrar()
    menu.style.display = 'none'
  }

  // limpiamos el filtrado
  function resetFiltros() {
    document
      .querySelectorAll('input[name="category"]:checked')
      .forEach((i) => (i.checked = false))
    document.getElementById('marca').value = ''
    search.value = ''
    pintarProducts(products)

    search.focus()
  }
  document.getElementById('reset-filters').onclick = resetFiltros
  const resetInline = document.getElementById('reset-filters-inline')
  if (resetInline)
    resetInline.onclick = resetFiltros

    // filtros fast fuera de modal
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
}

// inicializacion
document.addEventListener('DOMContentLoaded', renderApp)

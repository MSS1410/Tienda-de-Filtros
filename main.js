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


// Render completo de la app
function renderApp() {
  const app = document.getElementById('app');
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
          <button id="cart"><img src="./assets/cart.png" alt="Carrito" /></button>
          <button id="create-account">Crear Cuenta</button>
        </div>
      </div>
      <div class="header-bottom">
        <button id="open-menu">Añadir filtros</button>
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

      <section id="large-gallery" aria-label="Destacados"></section>

      <section id="filtros" aria-label="Filtros rápidos">
        <button id="filter-hombre">Hombre</button>
        <button id="filter-mujer">Mujer</button>
        <button id="filter-ninos">Niños</button>
        <button id="filter-best-sellers">Más Vendidos</button>
        <button id="filter-novedades">Novedades</button>
        <button id="reset-filters-inline" class="reset-secondary">Limpiar Filtros</button>
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
  `;

  attachBehaviors();
}

// Tarjeta de producto
function productCard(product) {
  const a = document.createElement('a');
  a.href = product.link || '#';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  const card = document.createElement('div');
  card.className = 'product';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h4>${product.name}</h4>
    <p class="meta">${(product.marca || '').replace('_',' ')}</p>
  `;
  a.appendChild(card);
  return a;
}

// Render de tarjetas (con sugerencias si no hay resultados)
function pintarProducts(list) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  if (!list || list.length === 0) {
    const noExiste = document.createElement('div');
    noExiste.className = 'no-results';
    noExiste.innerHTML = `
      <p>Lo sentimos, no encontramos productos que cumplan tu búsqueda.</p>
      <h4>Te sugerimos:</h4>
      <div class="suggestions"></div>
    `;
    gallery.appendChild(noExiste);

    // Sugerencias: 3 productos
    const suggestions = products.slice(0, 3);
    const sugWrap = noExiste.querySelector('.suggestions');
    suggestions.forEach(p => sugWrap.appendChild(productCard(p)));
    return;
  }
  list.forEach(p => gallery.appendChild(productCard(p)));
}

// Filtrado combinado: texto + categorías + marca
function filtrar() {
  const texto = (document.getElementById('search').value || '').toLowerCase().trim();
  const categorias = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(i => i.value);
  const marca = document.getElementById('marca').value;

  let result = products.filter(p => {
    const byText = !texto || p.name.toLowerCase().includes(texto);
    const byCat = categorias.length === 0 || categorias.some(c => (p.category || []).includes(c));
    const byMarca = !marca || p.marca === marca;
    return byText && byCat && byMarca;
  });

  pintarProducts(result);
}

// Eventos y render inicial
function attachBehaviors() {
  // Render inicial de productos
  pintarProducts(products);

  // Búsqueda en vivo
  document.getElementById('search').addEventListener('input', filtrar);

  // Selección rápida
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('input[name="category"]').forEach(i => (i.checked = false));
      const v = btn.dataset.category;
      const input = document.querySelector(`input[name="category"][value="${v}"]`);
      if (input) input.checked = true;
      filtrar();
    });
  });

  // Filtros (modal)
  const menu = document.getElementById('filtros-menu');
  document.getElementById('open-menu').onclick = () => (menu.style.display = 'block');
  document.getElementById('close-menu').onclick = () => (menu.style.display = 'none');
  window.addEventListener('click', (ev) => { if (ev.target === menu) menu.style.display = 'none'; });

  // Aplicar filtros
  document.getElementById('aplicar-filtros').onclick = () => { filtrar(); menu.style.display = 'none'; };

  // Limpiar (botón sticky y botón inline)
  function resetFiltros() {
    document.querySelectorAll('input[name="category"]:checked').forEach(i => (i.checked = false));
    document.getElementById('marca').value = '';
    document.getElementById('search').value = '';
    pintarProducts(products);
  }
  document.getElementById('reset-filters').onclick = resetFiltros;
  document.getElementById('reset-filters-inline').onclick = resetFiltros;

  // Filtros rápidos
  [['filter-hombre','hombre'], ['filter-mujer','mujer'], ['filter-ninos','ninos']].forEach(([id,cat]) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => {
      document.querySelectorAll('input[name="category"]').forEach(i => i.checked = false);
      const input = document.querySelector(`input[name="category"][value="${cat}"]`);
      if (input) input.checked = true;
      filtrar();
    };
  });

  // Best Sellers / Novedades (ejemplo)
  const bs = document.getElementById('filter-best-sellers');
  if (bs) bs.onclick = () => pintarProducts(products.slice(0,6));
  const nv = document.getElementById('filter-novedades');
  if (nv) nv.onclick = () => pintarProducts(products.slice(-6));
}

// Lanzar
document.addEventListener('DOMContentLoaded', renderApp);

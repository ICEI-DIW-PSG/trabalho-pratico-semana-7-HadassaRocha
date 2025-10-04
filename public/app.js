const noticias = [
  { id: 1, titulo: 'Veigh lança novo álbum chamado "EVOM"', descricao: 'Disponível em todas as plataformas digitais.', imagem: 'imagens/EVOM.jpg', categoria: 'LANÇAMENTO', corCategoria: 'danger' },
  { id: 2, titulo: 'Sidoka faz show histórico na Virada Cultural', descricao: 'Direito a invasão de fãs no palco durante sua apresentação.', imagem: 'imagens/SIDOKA.jpg', categoria: 'EVENTOS', corCategoria: 'primary' },
  { id: 3, titulo: 'Matuê se apresenta no último dia da FIB 2025', descricao: 'Artista abriu o show da noite.', imagem: 'imagens/MATUE.jpg', categoria: 'EVENTOS', corCategoria: 'primary' },
  { id: 4, titulo: 'The Town conta com apresentações de vários artistas', descricao: 'Dentre eles Travis Scott e Don Toliver.', imagem: 'imagens/thetown.jpg', categoria: 'EVENTOS', corCategoria: 'primary' }
];

function renderCardsLista(lista) {
  const container = document.querySelector('#noticiasContainer');
  container.innerHTML = '';

  lista.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <span class="badge bg-${item.corCategoria} mb-2">${item.categoria}</span>
          <h3 class="fs-6 fw-semibold">${item.titulo}</h3>
          <p>${item.descricao}</p>
          <a href="detalhes.html?id=${item.id}" class="btn btn-outline-dark btn-sm mt-2">Ver detalhes</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderCards(filtro = 'TODAS') {
  const listaFiltrada = filtro === 'TODAS' ? noticias : noticias.filter(n => n.categoria === filtro);
  renderCardsLista(listaFiltrada);
}

function setupFiltro() {
  const botoes = document.querySelectorAll('.filtro-btn');
  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.getAttribute('data-categoria');
      renderCards(categoria);

      const input = document.querySelector('#buscaInput');
      if (input) input.value = '';
    });
  });
}

function setupBusca() {
  const form = document.querySelector('form');
  const input = document.querySelector('#buscaInput');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const termo = input.value.toLowerCase();

    const listaFiltrada = noticias.filter(n =>
      n.titulo.toLowerCase().includes(termo) ||
      n.descricao.toLowerCase().includes(termo)
    );

    renderCardsLista(listaFiltrada);
  });
}

function renderDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const item = noticias.find(n => n.id === id);
  const container = document.querySelector('#detalhesContainer');

  if (!container) return;

  if (item) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-8 col-lg-6 mb-4';
    col.innerHTML = `
      <div class="card position-relative shadow-sm">
        <span class="badge bg-${item.corCategoria} position-absolute" style="top: 10px; left: 10px;">${item.categoria}</span>
        <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <h1 class="card-title fs-5 fw-bold">${item.titulo}</h1>
          <p class="card-text">${item.descricao}</p>
        </div>
      </div>
    `;
    container.appendChild(col);
  } else {
    container.innerHTML = `<p class="text-center">Notícia não encontrada.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#noticiasContainer')) {
    renderCards();
    setupFiltro();
    setupBusca(); 
  }

  if (document.querySelector('#detalhesContainer')) {
    renderDetalhes();
  }
});
const noticias = [
  {
    id: 1,
    titulo: 'Veigh lança novo álbum chamado "EVOM"',
    descricao: 'Disponível em todas as plataformas digitais.',
    imagem: 'imagens/EVOM.jpg',
    categoria: 'LANÇAMENTO',
    corCategoria: 'danger'
  },
  {
    id: 2,
    titulo: 'Sidoka faz show histórico na Virada Cultural',
    descricao: 'Direito a invasão de fãs no palco durante sua apresentação.',
    imagem: 'imagens/SIDOKA.jpg',
    categoria: 'EVENTOS',
    corCategoria: 'primary'
  },
  {
    id: 3,
    titulo: 'Matuê se apresenta no último dia da FIB 2025',
    descricao: 'Artista abriu o show da noite.',
    imagem: 'imagens/MATUE.jpg',
    categoria: 'EVENTOS',
    corCategoria: 'primary'
  },
  {
    id: 4,
    titulo: 'The Town conta com apresentações de vários artistas',
    descricao: 'Dentre eles Travis Scott e Don Toliver.',
    imagem: 'imagens/thetown.jpg',
    categoria: 'EVENTOS',
    corCategoria: 'primary'
  }
];

function renderCards(filtro = 'TODAS') {
  const container = document.querySelector('#noticiasContainer');
  container.innerHTML = '';

  const listaFiltrada = filtro === 'TODAS' ? noticias : noticias.filter(n => n.categoria === filtro);

  listaFiltrada.forEach(item => {
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

function setupFiltro() {
  const botoes = document.querySelectorAll('.filtro-btn');
  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.getAttribute('data-categoria');
      renderCards(categoria);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCards(); 
  setupFiltro(); 
});


import { renderizarProductos } from './renderer.js';
import { debounce } from './utils.js';

window.addEventListener('DOMContentLoaded', () => {
  fetch('./productos.json')
    .then(res => res.json())
    .then(productos => {
      let allProductos = productos, filteredProductos = [];
      let currentCat = null, currentSearch = '';
      const PAGE_SIZE = 50;
      let currentPage = 0;

      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      const btnOpen = document.getElementById('btn-toggle-sidebar');
      const btnClose = document.getElementById('btn-close-sidebar');
      const catButtons = sidebar.querySelectorAll('button[data-cat]');
      const inputSearch = document.getElementById('search');
      const container = document.getElementById('productos-container');

      btnOpen.addEventListener('click', () => {
        sidebar.classList.add('open');
        overlay.hidden = false;
        sidebar.setAttribute('aria-hidden', 'false');
      });

      btnClose.addEventListener('click', closeSidebar);
      overlay.addEventListener('click', closeSidebar);

      function closeSidebar() {
        document.activeElement.blur();
        sidebar.classList.remove('open');
        overlay.hidden = true;
        sidebar.setAttribute('aria-hidden', 'true');
      }

      catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          currentCat = btn.dataset.cat;
          catButtons.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          applyFilters();
          closeSidebar();
        });
      });

      inputSearch.addEventListener('input', debounce(() => {
        currentSearch = inputSearch.value;
        applyFilters();
      }, 300));

      function applyFilters() {
        filteredProductos = allProductos.filter(p => {
          const catMatch = !currentCat || p.categoria === currentCat;
          const searchMatch = p.nombre.toLowerCase().includes(currentSearch.toLowerCase());
          return catMatch && searchMatch;
        });
        currentPage = 0;
        renderizarProductos(paginate(filteredProductos, PAGE_SIZE, currentPage), container);
      }

      function paginate(arr, size, page) {
        return arr.slice(page * size, (page + 1) * size);
      }

      applyFilters();
    });
});
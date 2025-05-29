// main.js
import { fetchProductos } from './fetcher.js';
import { renderizarProductos, showError } from './renderer.js';
import { debounce } from './utils.js';

let allProductos=[], filteredProductos=[];
let currentCat=null, currentSearch='';
const PAGE_SIZE=50; let currentPage=0;

const sidebar=document.getElementById('sidebar');
const overlay=document.getElementById('overlay');
const btnOpen=document.getElementById('btn-toggle-sidebar');
const btnClose=document.getElementById('btn-close-sidebar');
const catButtons=sidebar.querySelectorAll('button[data-cat]');
const inputSearch=document.getElementById('search');

btnOpen.addEventListener('click',()=>{
  sidebar.classList.add('open'); overlay.hidden=false;
  sidebar.setAttribute('aria-hidden','false');
});
btnClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
function closeSidebar(){
  sidebar.classList.remove('open'); overlay.hidden=true;
  sidebar.setAttribute('aria-hidden','true');
  catButtons.forEach(b=>b.classList.remove('is-active'));
  currentCat=null; applyFilters();
}

catButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    catButtons.forEach(b=>b.classList.toggle('is-active',b===btn));
    currentCat=btn.dataset.cat; applyFilters(); closeSidebar();
  });
});

inputSearch.addEventListener('input', debounce(e=>{
  currentSearch=e.target.value.trim().toLowerCase(); applyFilters();
},200));

async function init(){
  try{
    document.getElementById('loader').hidden=false;
    allProductos=await fetchProductos();
    applyFilters();
    window.addEventListener('scroll', debounce(onScroll,100));
  }catch(e){ showError('No pudimos cargar los productos.'); }
  finally{ document.getElementById('loader').hidden=true; }
}

function applyFilters(){
  filteredProductos=allProductos.filter(p=>{
    if(currentCat && p.categoria!==currentCat) return false;
    if(currentSearch){
      const text=`${p.nombre} ${p.codigo} ${p.compatibilidad?.join(' ')}`.toLowerCase();
      return text.includes(currentSearch);
    }
    return true;
  });
  currentPage=0;
  document.getElementById('contenedor-productos').innerHTML='';
  cargarSiguiente();
}

function onScroll(){
  if(window.scrollY+window.innerHeight>=document.body.offsetHeight-200) cargarSiguiente();
}

function cargarSiguiente(){
  const start=currentPage*PAGE_SIZE;
  if(start>=filteredProductos.length) return;
  const slice=filteredProductos.slice(start,start+PAGE_SIZE);
  renderizarProductos(slice,{ append: currentPage>0 });
  currentPage++;
}

document.addEventListener('DOMContentLoaded', init);

// renderer.js
const cont = document.getElementById('contenedor-productos');
export function renderizarProductos(lista, { append=false }={}) {
  if (!append) cont.innerHTML = '';
  if (lista.length===0 && !append) {
    cont.innerHTML='<p class="info">No hay productos.</p>';
    return;
  }
  lista.forEach(p=> {
    const card=document.createElement('article');
    card.className='service-card';
    card.innerHTML=`
      <h2>${p.nombre}</h2>
      <div class="codigo">${p.codigo}</div>
      <div class="precio">$${p.precio.toFixed(2)}</div>
      <a href="${p.url}" target="_blank">Detalles</a>`;
    cont.appendChild(card);
  });
}
export function showError(msg){ cont.innerHTML=`<p class="error">${msg}</p>`; }

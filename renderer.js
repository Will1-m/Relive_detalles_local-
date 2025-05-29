export function renderizarProductos(productos, contenedor) {
  contenedor.innerHTML = '';

  if (!productos.length) {
    contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }

  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto';

    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p><strong>Categoría:</strong> ${p.categoria}</p>
      <p><strong>Precio:</strong> $${p.precio}</p>
      ${p.descripcion ? `<p>${p.descripcion}</p>` : ''}
      ${p.imagen ? `<img src="img/${p.imagen}" alt="${p.nombre}" loading="lazy">` : ''}
      <button class="ver-mas" data-id="${p.codigo}">Ver más</button>
    `;

    contenedor.appendChild(card);
  });

  // Manejo del modal
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('modal-close');

  document.querySelectorAll('.ver-mas').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = productos.find(p => p.codigo === btn.dataset.id);
      modalBody.innerHTML = `
        <h2>${prod.nombre}</h2>
        <p><strong>Categoría:</strong> ${prod.categoria}</p>
        <p><strong>Precio:</strong> $${prod.precio}</p>
        ${prod.descripcion ? `<p>${prod.descripcion}</p>` : ''}
        ${prod.imagen ? `<img src="img/${prod.imagen}" alt="${prod.nombre}" style="max-width:100%">` : ''}
        ${prod.url ? `<p style="font-size:0.9em;color:gray;">Referencia: ${prod.url}</p>` : ''}
      `;
      modal.classList.remove('hidden');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}
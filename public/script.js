async function cargarProductos() {
  const res = await fetch('/api/productos');
  const productos = await res.json();

  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  productos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - Cantidad: ${p.cantidad}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => eliminarProducto(p.id);
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

async function agregarProducto() {
  const nombre = document.getElementById('nombre').value;
  const cantidad = document.getElementById('cantidad').value;

  if (!nombre || !cantidad) {
    alert('Por favor, complete todos los campos');
    return;
  }

  await fetch('/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, cantidad })
  });

  document.getElementById('nombre').value = '';
  document.getElementById('cantidad').value = '';
  cargarProductos();
}

async function eliminarProducto(id) {
  await fetch(`/api/productos/${id}`, { method: 'DELETE' });
  cargarProductos();
}

document.getElementById('agregar').addEventListener('click', agregarProducto);
cargarProductos();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'data', 'productos.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// Leer productos
app.get('/api/productos', (req, res) => {
  const data = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH))
    : [];
  res.json(data);
});

// Agregar producto
app.post('/api/productos', (req, res) => {
  const data = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH))
    : [];

  const nuevoProducto = {
    id: Date.now(),
    nombre: req.body.nombre,
    cantidad: parseInt(req.body.cantidad, 10)
  };

  data.push(nuevoProducto);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ message: 'Producto agregado', producto: nuevoProducto });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  let data = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH))
    : [];

  const id = parseInt(req.params.id, 10);
  data = data.filter(p => p.id !== id);

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ message: 'Producto eliminado' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

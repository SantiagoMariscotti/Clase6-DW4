import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let DB = process.env.DB;
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Esquema y modelo para Producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
});
const Producto = mongoose.model('Producto', productoSchema);

// Esquema y modelo para Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  correo: String
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// CRUD para productos

// Operación para obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

// Operación para agregar un nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const nuevoProducto = new Producto({ nombre, precio, descripcion });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).send('Error al agregar producto');
  }
});

// Operación para actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, precio, descripcion },
      { new: true }
    );
    if (!productoActualizado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).send('Error al actualizar producto');
  }
});

// Operación para eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json({ mensaje: 'Producto eliminado', producto: productoEliminado });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).send('Error al eliminar producto');
  }
});

// CRUD para usuarios

// Operación para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error al obtener usuarios');
  }
});

// Operación para agregar un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, edad, correo } = req.body;
    const nuevoUsuario = new Usuario({ nombre, edad, correo });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).send('Error al agregar usuario');
  }
});

// Operación para actualizar un usuario por ID
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, correo } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, edad, correo },
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar usuario');
  }
});

// Operación para eliminar un usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error al eliminar usuario');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

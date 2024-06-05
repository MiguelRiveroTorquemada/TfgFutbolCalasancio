<template>
    <div class="card">
      <h2>Agregar Producto</h2>
      <form @submit.prevent="agregarProducto">
        <div class="form-group">
          <label for="nombreProducto">Nombre del Producto:</label>
          <input
            type="text"
            id="nombreProducto"
            v-model="producto.nombreProducto"
            required
          />
        </div>
        <div class="form-group">
          <label for="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            v-model="producto.precio"
            required
            step="0.01"
          />
        </div>
        <!-- Otros campos para atributos adicionales si es necesario -->
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        producto: {
          nombreProducto: '',
          precio: 0,
          // Inicializa otros atributos aquí si es necesario
        },
      };
    },
    methods: {
      ...mapActions(['addProductos', 'fetchProductos']),
      agregarProducto() {
        this.addProductos(this.producto)
          .then(() => {
            alert('Producto agregado con éxito');
            this.fetchProductos();
            this.resetForm();
          })
          .catch((error) => {
            console.error('Error al agregar el producto:', error);
            alert('Hubo un error al agregar el producto.');
          });
      },
      resetForm() {
        this.producto = {
          nombreProducto: '',
          precio: 0,
          // Reinicia otros atributos aquí si es necesario
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    width: calc(100% - 20px);
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  
<template>
  <div class="form-container">
    <h2 class="title">ÚNETE A NUESTRO CLUB</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="nombre" class="label">Nombre:</label>
        <input type="text" id="nombre" v-model="cliente.nombre" class="input" required />
      </div>
      <div class="form-group">
        <label for="apellidos" class="label">Apellidos:</label>
        <input type="text" id="apellidos" v-model="cliente.apellidos" class="input" required />
      </div>
      <div class="form-group">
        <label for="direccion" class="label">Direccion:</label>
        <input type="text" id="direccion" v-model="cliente.direccion" class="input" required />
      </div>
      <div class="form-group">
        <label for="email" class="label">Email:</label>
        <input type="email" id="email" v-model="cliente.email" class="input" required />
      </div>
      <div class="form-group">
        <label for="dni" class="label">DNI:</label>
        <input type="text" id="dni" v-model="cliente.dni" class="input" required />
      </div>
      <div class="form-group">
        <label for="password" class="label">Password:</label>
        <input type="password" id="password" v-model="cliente.password" class="input" required />
      </div>
      <button type="submit" class="button">Unete con nostros</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      cliente: {
        nombre: '',
        apellidos: '',
        direccion:'',
        email: '',
        dni: '',
        password:''
      }
    };
  },
  methods: {
    ...mapActions(['addClientes']),
    submitForm() {
    this.$store.dispatch('addClientes', this.cliente)
      .then(() => {
        alert('Cliente añadido con éxito');
        // Limpia el formulario
        this.cliente.nombre = '';
        this.cliente.apellidos = '';
        this.cliente.direccion = '';
        this.cliente.email = '';
        this.cliente.dni = '';
        this.cliente.password = '';
        
        // Redirige o realiza cualquier otra acción necesaria
      })
      .catch(error => {
        console.error('Error al añadir el cliente:', error);
        alert('Error al añadir el cliente: ' + error.message); // Mostrar mensaje de error al usuario
      });
  }

  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFD700; /* Amarillo */
  background-image: linear-gradient(45deg, rgba(30, 144, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(30, 144, 255, 0.2) 50%, rgba(30, 144, 255, 0.2) 75%, transparent 75%, transparent);
  padding: 40px 20px;
}

.title {
  color: #1E90FF; /* Azul medio */
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  width: 400px;
  padding: 20px;
  background-color: #FFFFFF; /* Blanco */
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  font-size: 18px;
  color: #000000; /* Negro */
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #D2B48C; /* Marrón claro */
  border-radius: 8px;
}

.button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  color: #FFFFFF; /* Blanco */
  background-color: #2C3E50; /* Azul oscuro */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #4682B4; /* Azul acero */
}

</style>
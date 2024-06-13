<template>
  <div class="form-container">
    <h2 class="title">INICIAR SESIÓN</h2>
    <div class="form-wrapper">
      <form @submit.prevent="submitForm" class="form">
        <div class="form-content">
          <div class="form-group">
            <label for="email" class="label">Email:</label>
            <input type="email" id="email" v-model="loginData.email" class="input" required />
          </div>
          <div class="form-group">
            <label for="password" class="label">Contraseña:</label>
            <input type="password" id="password" v-model="loginData.password" class="input" required />
          </div>
          <button type="submit" class="button" :disabled="loading">Iniciar sesión</button>
          <div v-if="loading" class="loading-indicator">Iniciando sesión...</div>
          <div v-if="error" class="error">{{ error }}</div>
        </div>
      </form>
      <!-- Aquí agregamos la imagen -->
      <div class="image-container">
        <img src="@/assets/escudo-calasancio.png" alt="Imagen de fondo" class="form-image" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      loading: false,
      error: null // Agrega una variable para manejar errores
    };
  },
  methods: {
    ...mapActions(['login', 'fetchClientesId']), // Asegúrate de incluir 'fetchClientesId' aquí
    submitForm() {
      this.loading = true;
      this.error = null;
      this.$store.dispatch('login', this.loginData)
        .then(() => {
          this.loading = false;
          alert('Inicio de sesión exitoso');
          this.$store.dispatch('fetchClientesId', this.$store.state.clienteLogueadoId); // Pasar el ID del cliente almacenado en el estado
          const clienteId = this.$store.state.clienteLogueadoId;
          this.$router.push({ name: 'ListCliente', params: { id: clienteId } });
          this.$store.commit('setAuthenticated', true); // Establecer isAuthenticated en true
        })
        .catch(error => {
          this.loading = false;
          console.error('Error al iniciar sesión:', error);
          this.error = 'Error al iniciar sesión: ' + error.message;
        });
    }
  }
};
</script>

<style scoped>
.form-container {
  width: 50%;
  margin: 0 auto;
  margin-top: 250px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 90px rgba(0, 0, 255, 0.5); /* Difuminado azul alrededor del formulario */
  height: 400px; /* Ajusta la altura según sea necesario */
  display: flex;
  flex-direction: column;
}

.form-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
}

.form-wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px; /* Agrega margen inferior para separar la imagen del botón */
}

.form {
  width: 70%; /* Ancho del formulario */
}

.image-container {
  width: 25%; /* Ancho de la imagen */
  margin-bottom: 90px; /* Ajusta el margen inferior de la imagen */
}

.form-image {
  max-width: 80%;
  height: auto;
  border-radius: 10px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #000000; /* Color del texto */
}

.label {
  color: #000000; /* Color de las etiquetas */
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
}

.button {
  width: 40%;
  padding: 10px;
  margin-top: 10px;
  background: linear-gradient(135deg, #0040ff, #ffe100); /* Gradiente de azul a amarillo */
  color: #000000; /* Color del texto del botón */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #dddddd; /* Color del botón al pasar el cursor */
}

.loading-indicator {
  margin-top: 10px;
  font-style: italic;
  color: #ffffff; /* Color del texto de carga */
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

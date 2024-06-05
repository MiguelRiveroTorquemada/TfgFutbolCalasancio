<template>
  <div class="form-container">
    <h2>Agregar Jugador</h2>
    <form @submit.prevent="agregarJugador" class="form">
      <div class="form-group">
        <label for="nombre">Nombre del jugador:</label>
        <input
          type="text"
          id="nombre"
          v-model="jugador.nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="apellidos">Apellidos:</label>
        <input
          type="text"
          id="apellidos"
          v-model="jugador.apellidos"
          required
        />
      </div>
      <div class="form-group">
        <label for="posicion">Posición:</label>
        <input
          type="text"
          id="posicion"
          v-model="jugador.posicion"
          required
        />
      </div>
      <div class="form-group">
        <label for="altura">Altura:</label>
        <input
          type="number"
          id="altura"
          v-model="jugador.altura"
          required
        />
      </div>
      <div class="form-group">
        <label for="pie">Pie:</label>
        <input
          type="number"
          id="pie"
          v-model="jugador.pie"
          required
        />
      </div>
      <div class="form-group">
        <label for="numeroCamiseta">Número de Camiseta:</label>
        <input
          type="number"
          id="numeroCamiseta"
          v-model="jugador.numeroCamiseta"
          required
        />
      </div>
     
    
      <!-- Otros campos para atributos adicionales si es necesario -->
      <button type="submit">Agregar Jugador</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      jugador: {
        nombre: '',
        apellidos: '',
        posicion:'',
        altura:'',
        pie:'',
        numeroCamiseta:'',
       
      },
    };
  },
  methods: {
    ...mapActions(['addJugadores', 'fetchJugadores']),
    agregarJugador() {
      this.addJugadores(this.jugador)
        .then(() => {
          alert('Jugador agregado con éxito');
          this.fetchJugadores();
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error al agregar el jugador:', error);
          alert('Hubo un error al agregar el jugador.');
        });
    },
    resetForm() {
      this.jugador = {
        nombre: '',
        apellidos: '',
        posicion:'',
        altura:'',
        pie:'',
        numeroCamiseta:'',
        partidosJugados:'',
        goles:'',
      };
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 800px;
  margin: 30px auto; /* Añadir margen y centrar horizontalmente */
  padding: 80px; /* Añadir espacio interior */
  background-color: white; /* Fondo blanco */
  border-radius: 8px; /* Añadir bordes redondeados */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Añadir sombra suave */
}
.form {
  width: 100%;
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

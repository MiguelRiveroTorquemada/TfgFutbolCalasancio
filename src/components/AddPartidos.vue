<template>
    <div class="container-frame">
      <h1>Agregar Partido</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombrePartido">Nombre del Partido</label>
          <input type="text" id="nombrePartido" v-model="partido.nombrePartido" required>
        </div>
        <div class="form-group">
          <label for="primerEquipo">Primer Equipo</label>
          <input type="text" id="primerEquipo" v-model="partido.primerEquipo" required>
        </div>
        <div class="form-group">
          <label for="segundoEquipo">Segundo Equipo</label>
          <input type="text" id="segundoEquipo" v-model="partido.segundoEquipo" required>
        </div>
        <div class="form-group">
          <label for="puntuacion">Puntuación</label>
          <input type="text" id="puntuacion" v-model="partido.puntuacion" required>
        </div>
        <div class="form-group">
          <label for="ganado">Ganado</label>
          <select id="ganado" v-model="partido.ganado" required>
            <option :value="true">Sí</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input type="date" id="fecha" v-model="partido.fecha" required>
        </div>
        
        <!-- Mensaje de éxito -->
        <div v-if="partidoAgregado" class="mensaje-exito">
          Partido añadido correctamente
        </div>
        
        <!-- Botón para enviar el formulario -->
        <button type="submit" class="btn-submit">Agregar Partido</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddPartidos',
    data() {
      return {
        partido: {
          nombrePartido: '',
          primerEquipo: '',
          segundoEquipo: '',
          puntuacion: '',
          ganado: true,
          fecha: '',
          jugadores: []
        },
        partidoAgregado: false
      };
    },
    methods: {
      submitForm() {
        this.$store.dispatch('addPartidos', this.partido).then(() => {
          this.partidoAgregado = true;
          setTimeout(() => {
            this.partidoAgregado = false;
          }, 3000);
          this.$emit('partido-agregado');
        }).catch(error => {
          console.error('Error al agregar el partido:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .container-frame {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="date"],
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  select {
    cursor: pointer;
  }
  
  .btn-submit {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  
  .mensaje-exito {
    margin-top: 10px;
    padding: 10px;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
    border-radius: 5px;
  }
  </style>
  
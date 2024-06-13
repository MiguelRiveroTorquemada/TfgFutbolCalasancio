<template>
  <form @submit.prevent="submitForm" class="update-form">
    <!-- Campos de entrada para actualizar el partido -->
    <div class="form-group">
      <label for="nombrePartido">Nombre del Partido</label>
      <input v-model="partido.nombrePartido" id="nombrePartido" class="form-control" placeholder="Nombre del Partido" />
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="primerEquipo">Primer Equipo</label>
        <input v-model="partido.primerEquipo" id="primerEquipo" class="form-control" placeholder="Primer Equipo" />
      </div>
      <div class="form-group col-md-6">
        <label for="segundoEquipo">Segundo Equipo</label>
        <input v-model="partido.segundoEquipo" id="segundoEquipo" class="form-control" placeholder="Segundo Equipo" />
      </div>
    </div>
    
    <!-- Campos para jugadores -->
    <div v-for="(jugador, index) in partido.jugadores" :key="index" class="jugador">
      <h5>Jugador {{ index + 1 }}</h5>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="nombreJugador">Nombre del Jugador</label>
          <input v-model="jugador.nombre" id="nombreJugador" class="form-control" placeholder="Nombre del Jugador" />
        </div>
        <div class="form-group col-md-6">
          <label for="apellidosJugador">Apellidos del Jugador</label>
          <input v-model="jugador.apellidos" id="apellidosJugador" class="form-control" placeholder="Apellidos del Jugador" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="posicionJugador">Posición</label>
          <input v-model="jugador.posicion" id="posicionJugador" class="form-control" placeholder="Posición" />
        </div>
        <div class="form-group col-md-4">
          <label for="alturaJugador">Altura</label>
          <input v-model="jugador.altura" type="number" id="alturaJugador" class="form-control" placeholder="Altura" />
        </div>
        <div class="form-group col-md-4">
          <label for="pieJugador">Pie</label>
          <input v-model="jugador.pie" id="pieJugador" class="form-control" placeholder="Pie" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="numeroCamisetaJugador">Número de Camiseta</label>
          <input v-model="jugador.numeroCamiseta" type="number" id="numeroCamisetaJugador" class="form-control" placeholder="Número de Camiseta" required />
        </div>
        <div class="form-group col-md-6">
          <label for="partidosJugadosJugador">Partidos Jugados</label>
          <input v-model="jugador.partidosJugados" type="checkbox" id="partidosJugadosJugador" class="form-check-input" />
        </div>
      </div>
      <div class="form-group">
        <label for="golesJugador">Goles</label>
        <input v-model="jugador.goles" type="number" id="golesJugador" class="form-control" placeholder="Goles" />
      </div>
    </div>
    
    <button type="submit" class="btn btn-primary">Actualizar Partido</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['partidoId'],

  data() {
    return {
      partido: {
        id: '',
        nombrePartido: '',
        primerEquipo: '',
        segundoEquipo: '',
        jugadores: [
          {
            nombre: '',
            apellidos: '',
            posicion: '',
            altura: 0,
            pie: '',
            numeroCamiseta: 0,
            partidosJugados: false,
            goles: 0
          }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['updateJugadores', 'fetchPartidos']),

    submitForm() {
      this.updateJugadores(this.partido)
        .then(() => {
          console.log('Partido actualizado exitosamente');
          this.$emit('close');
          this.fetchPartidos();
        })
        .catch(error => {
          console.error('Error actualizando partido:', error);
        });
    }
  },

  watch: {
    partidoId(newPartidoId) {
      this.partido.id = newPartidoId;
    }
  }
};
</script>

<style scoped>
.update-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-control, .form-check-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.jugador {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #fff;
}

.jugador .form-row {
  margin-bottom: 10px;
}

.jugador h5 {
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
}
</style>

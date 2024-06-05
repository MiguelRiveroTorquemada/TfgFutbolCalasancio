<template>
  <form @submit.prevent="submitForm" class="update-form">
    <!-- Campos de entrada para actualizar el partido -->
    <div class="form-group">
      <label for="nombrePartido">Nombre del Partido</label>
      <input v-model="partido.nombrePartido" id="nombrePartido" class="form-control" placeholder="Nombre del Partido" />
    </div>
    <div class="form-group">
      <label for="primerEquipo">Primer Equipo</label>
      <input v-model="partido.primerEquipo" id="primerEquipo" class="form-control" placeholder="Primer Equipo" />
    </div>
    <div class="form-group">
      <label for="segundoEquipo">Segundo Equipo</label>
      <input v-model="partido.segundoEquipo" id="segundoEquipo" class="form-control" placeholder="Segundo Equipo" />
    </div>
    
    <!-- Campos para jugadores -->
    <div v-for="(jugador, index) in partido.jugadores" :key="index" class="jugador">
      <div class="form-group">
        <label for="nombreJugador">Nombre del Jugador</label>
        <input v-model="jugador.nombre" id="nombreJugador" class="form-control" placeholder="Nombre del Jugador" />
      </div>
      <div class="form-group">
        <label for="apellidosJugador">Apellidos del Jugador</label>
        <input v-model="jugador.apellidos" id="apellidosJugador" class="form-control" placeholder="Apellidos del Jugador" />
      </div>
      <div class="form-group">
        <label for="posicionJugador">Posición</label>
        <input v-model="jugador.posicion" id="posicionJugador" class="form-control" placeholder="Posición" />
      </div>
      <div class="form-group">
        <label for="alturaJugador">Altura</label>
        <input v-model="jugador.altura" type="number" id="alturaJugador" class="form-control" placeholder="Altura" />
      </div>
      <div class="form-group">
        <label for="pieJugador">Pie</label>
        <input v-model="jugador.pie" id="pieJugador" class="form-control" placeholder="Pie" />
      </div>
      <div class="form-group">
        <label for="numeroCamisetaJugador">Número de Camiseta</label>
        <input v-model="jugador.numeroCamiseta" type="number" id="numeroCamisetaJugador" class="form-control" placeholder="Número de Camiseta" required />
      </div>
      <div class="form-group">
        <label for="partidosJugadosJugador">Partidos Jugados</label>
        <input v-model="jugador.partidosJugados" type="checkbox" id="partidosJugadosJugador" />
      </div>
      <div class="form-group">
        <label for="golesJugador">Goles</label>
        <input v-model="jugador.goles" type="number" id="golesJugador" class="form-control" placeholder="Goles" />
      </div>
      <!--<div class="form-group">
        <label for="golesPorPartidoJugador">Goles por Partido</label>
        <input v-model="jugador.golesPorPartido" type="number" id="golesPorPartidoJugador" class="form-control" placeholder="Goles por Partido" />
      </div>-->
    </div>
    
    <button type="submit" class="btn btn-primary">Actualizar Partido</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['partidoId'], // Agregar la propiedad partidoId

  data() {
    return {
      partido: {
        id: this.partidoId, // Usar el partidoId recibido como ID del partido
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
            goles: 0,
            //golesPorPartido: 0,
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(['updatePartidos','updateJugadores','fetchPartidos']),
    submitForm() {
      this.updateJugadores(this.partido)
        .then(() => {
          console.log('Partido actualizado exitosamente');
          this.$emit('close'); // Emitir evento para cerrar el modal
          this.fetchPartidos(); // Actualizar los datos automáticamente
        })
        .catch(error => {
          console.error('Error actualizando partido:', error);
        });
    }
  }
};
</script>

<style scoped>
.update-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
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
}

.jugador .form-group {
  margin-bottom: 10px;
}

.jugador .form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.jugador label {
  font-weight: bold;
}
</style>

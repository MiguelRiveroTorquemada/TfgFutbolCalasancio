<template>
  <div class="container-frame">
    <h1>Partidos</h1>
    <div class="tabla-container">
      <div class="table-wrapper">
        <table v-if="Partidos.length">
          <thead>
            <tr>
              <th>Nombre del Partido</th>
              <th>Primer Equipo</th>
              <th>Segundo Equipo</th>
              <th>Puntuación</th>
              <th>Ganado</th>
              <th>Fecha</th>
              <th>Jugadores</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="partido in Partidos" :key="partido.id">
              <td contenteditable="true" @input="updateField(partido.id, 'nombrePartido', $event.target.innerText)">{{ partido.nombrePartido }}</td>
              <td contenteditable="true" @input="updateField(partido.id, 'primerEquipo', $event.target.innerText)">{{ partido.primerEquipo }}</td>
              <td contenteditable="true" @input="updateField(partido.id, 'segundoEquipo', $event.target.innerText)">{{ partido.segundoEquipo }}</td>
              <td contenteditable="true" @input="updateField(partido.id, 'puntuacion', parseInt($event.target.innerText))">{{ partido.puntuacion }}</td>
              <td>
                <select @change="updateField(partido.id, 'ganado', $event.target.value === 'Sí')" :value="partido.ganado ? 'Sí' : 'No'">
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>{{ new Date(partido.fecha).toLocaleDateString() }}</td>
              <td>
                <details>
                  <summary>Ver jugadores</summary>
                  <table class="jugadores-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Posición</th>
                        <th>Altura</th>
                        <th>Pie</th>
                        <th>Número de Camiseta</th>
                        <th>Partidos Jugados</th>
                        <th>Goles</th>
                       <!-- <th>Goles por Partido</th>-->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="jugador in partido.jugadores" :key="jugador.id">
                        <td>{{ jugador.nombre }} {{ jugador.apellidos }}</td>
                        <td>{{ jugador.posicion }}</td>
                        <td>{{ jugador.altura }} m</td>
                        <td>{{ jugador.pie }}</td>
                        <td>{{ jugador.numeroCamiseta }}</td>
                        <td>{{ jugador.partidosJugados ? 'Sí' : 'No' }}</td>
                        <td>{{ jugador.goles }}</td>
                        <!--<td>{{ jugador.golesPorPartido }}</td>-->
                      </tr>
                    </tbody>
                  </table>
                </details>
              </td>
              <td>
                <button @click="openDialog(partido.id)">Agregar Jugador</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Cargando partidos...</p>
      </div>
    </div>
    <dialog ref="dialog">
      <update-partidos :partido-id="currentPartidoId" @close="closeDialog"/>
      <button @click="closeDialog" class="close-button"><i class="fas fa-times"></i></button>
    </dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UpdatePartidos from './UpdatePartidos.vue'; // Asegúrate de tener este componente

export default {
  name: 'Partidos',
  components: {
    UpdatePartidos,
  },
  data() {
    return {
      currentPartidoId: null,
    };
  },
  computed: {
    ...mapState(['Partidos']),
  },
  created() {
    this.fetchPartidos();
  },
  methods: {
    ...mapActions(['fetchPartidos', 'updatePartidoOnly', 'updateJugadores']),
    updateField(id, field, value) {
      const partido = this.Partidos.find(p => p.id === id);
      partido[field] = value;
      this.updatePartidoOnly(partido);
    },
    openDialog(partidoId) {
      this.currentPartidoId = partidoId;
      this.$refs.dialog.showModal();
    },
    closeDialog() {
      this.$refs.dialog.close();
      this.currentPartidoId = null;
      this.fetchPartidos(); // Actualizar los datos automáticamente al cerrar el diálogo
    },
  },
};
</script>

<style scoped>
.container-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Asegura que el fondo cubra toda la pantalla */
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(243, 255, 140), white); /* Degradado de amarillo a blanco */
}

.tabla-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centrar el contenido horizontalmente */
  width: 100%;
  max-width: 800px;
  margin: 0 auto; /* Centrar el contenedor en la página */
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.close-button:hover {
  color: red; /* Cambiar el color del icono al pasar el ratón sobre él */
}


.table-wrapper {
  position: relative;
  z-index: 2; /* Asegura que el contenido esté por encima del degradado */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Sombra difuminada */
}

.table-wrapper::before {
  content: '';
  position: absolute;
  top: -20px; /* Ajusta el desplazamiento vertical */
  left: -20px; /* Ajusta el desplazamiento horizontal */
  right: -20px; /* Ajusta el desplazamiento horizontal */
  bottom: -20px; /* Ajusta el desplazamiento vertical */
  border-radius: inherit;
  box-shadow: 0 0 40px rgba(0, 0, 255, 0.75); /* Ajusta el difuminado y la intensidad del color */
  z-index: -1; /* Asegura que el degradado exterior esté detrás del contenido */
}

h1 {
  font-family: Arial, sans-serif;
  margin-bottom: 90px; /* Aumenta el margen inferior */
  color: #333;
  text-align: center; /* Centrar el texto del título */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

td {
  background-color: #fff;
}

tbody tr:nth-child(even) td {
  background-color: #f9f9f9;
}

p {
  font-family: Arial, sans-serif;
  color: #666;
  text-align: center;
}

details summary {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  margin-top: 5px;
  text-align: left;
}

details summary:hover {
  background-color: #e2e2e2;
}

.jugadores-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.jugadores-table th, .jugadores-table td {
  padding: 5px;
  border: 1px solid #ddd;
}

.jugadores-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.jugadores-table td {
  background-color: #fff;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

dialog {
  padding: 20px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  margin: auto;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

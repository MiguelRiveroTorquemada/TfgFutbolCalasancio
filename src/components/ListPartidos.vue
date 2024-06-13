<template>
  <div class="container-frame">
    <button class="add-partido-button" v-if="$store.state.isAdmin" @click="openAddPartidoDialog">Agregar Partido</button>

    <div class="tabla-container">
  <div>
    <h1>Partidos</h1>
    <div class="filter-container">
      <label for="fechaFilter" class="filter-label">Filtrar por Fecha:</label>
      <input type="date" id="fechaFilter" v-model="fechaFiltro" @input="filterByDate" class="filter-input">
    </div>
  </div>

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
              <th v-if="$store.state.isAdmin">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="partido in filteredPartidos" :key="partido.id">
              <td :contenteditable="$store.state.isAdmin" @blur="updateField(partido.id, 'nombrePartido', $event.target.innerText)">{{ partido.nombrePartido }}</td>
              <td :contenteditable="$store.state.isAdmin" @blur="updateField(partido.id, 'primerEquipo', $event.target.innerText)">{{ partido.primerEquipo }}</td>
              <td :contenteditable="$store.state.isAdmin" @blur="updateField(partido.id, 'segundoEquipo', $event.target.innerText)">{{ partido.segundoEquipo }}</td>
              <td :contenteditable="$store.state.isAdmin" @blur="updateField(partido.id, 'puntuacion', $event.target.innerText)">{{ partido.puntuacion }}</td>
              <td>
                <select :disabled="!$store.state.isAdmin" @change="updateField(partido.id, 'ganado', $event.target.value === 'Sí')" :value="partido.ganado ? 'Sí' : 'No'" class="select-field">
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td :contenteditable="$store.state.isAdmin" @blur="updateField(partido.id, 'fecha', new Date($event.target.innerText).toISOString())">{{ new Date(partido.fecha).toLocaleDateString() }}</td>
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
                      </tr>
                    </tbody>
                  </table>
                </details>
              </td>
              <td>
                <button v-if="$store.state.isAdmin" @click="openDialog(partido.id)">Agregar Jugador</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Cargando partidos...</p>
      </div>
    </div>

    <!-- Diálogos para actualizar y agregar partidos -->
    <dialog ref="updateDialog">
      <update-partidos :partido-id="currentPartidoId" @close="closeDialog"/>
      <button @click="closeDialog" class="close-button"><i class="fas fa-times"></i></button>
    </dialog>
    <dialog ref="addDialog">
      <add-partidos @addPartidos="addNewPartido" @close="closeAddDialog"/>
      <button @click="closeAddDialog" class="close-button"><i class="fas fa-times"></i></button>
    </dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UpdatePartidos from './UpdatePartidos.vue';
import AddPartidos from './AddPartidos.vue';

export default {
  name: 'Partidos',
  components: {
    UpdatePartidos,
    AddPartidos,
  },
  data() {
    return {
      currentPartidoId: null,
      fechaFiltro: '', // Propiedad para almacenar la fecha seleccionada para filtrar
    };
  },
  computed: {
    ...mapState(['Partidos']),
    // Filtra los partidos según la fecha seleccionada
    filteredPartidos() {
      if (!this.fechaFiltro) {
        return this.Partidos;
      } else {
        return this.Partidos.filter(partido => {
          // Convierte la fecha del partido a formato yyyy-mm-dd para comparar
          const partidoDate = new Date(partido.fecha).toISOString().slice(0, 10);
          return partidoDate === this.fechaFiltro;
        });
      }
    },
  },
  created() {
    this.fetchPartidos();
  },
  methods: {
    ...mapActions(['fetchPartidos', 'updatePartidoOnly', 'addPartidos']),
    updateField(id, field, value) {
      const partido = this.Partidos.find(p => p.id === id);
      partido[field] = value;
      this.updatePartidoOnly(partido);
    },
    openDialog(partidoId) {
      this.currentPartidoId = partidoId;
      this.$refs.updateDialog.showModal();
    },
    closeDialog() {
      this.$refs.updateDialog.close();
      this.currentPartidoId = null;
      this.fetchPartidos();
    },
    openAddPartidoDialog() {
      this.$refs.addDialog.showModal();
    },
    closeAddDialog() {
      this.$refs.addDialog.close();
    },
    addNewPartido(partido) {
      this.addPartidos(partido);
      this.closeAddDialog();
      this.fetchPartidos();
    },
    filterByDate() {
      // Este método se activa cuando cambia la fecha en el filtro
      // La lista de partidos filtrados se actualiza automáticamente
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
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(243, 255, 140), white);
  margin-top: 100px;
}

.tabla-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 80px;
}

.tabla-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px; /* Ajuste del margen entre el h1 y el filtro */
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  width: 100%;
}

.filter-label {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}

.filter-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: red;
}

.table-wrapper {
  position: relative;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.table-wrapper::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border-radius: inherit;
  box-shadow: 0 0 40px rgba(0, 0, 255, 0.75);
  z-index: -1;
}

.add-partido-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 100px;
  margin-bottom: 10px;
}

.add-partido-button:hover {
  background-color: #0056b3;
}

h1 {
  font-family: Arial, sans-serif;
  margin-bottom: 20px; /* Ajuste del margen inferior del h1 */
  margin-top: 40px;
  color: #333;
  text-align: center;
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

<template>
  <div> 
    <v-row justify="center">
      
      <v-btn v-if="$store.state.isAdmin"  @click="showAddJugadorDialog = true" class="add-jugador-btn" dark>
        <i class="material-icons">add</i>
      </v-btn>
    </v-row>
 
    <div class="jugadores-container">
      
      <div class="presentacion-container">
  <div class="imagen-lateral">
    <img src="../assets/1.jpg" alt="Equipo Calasancio">
  </div>
  <div class="texto">
    <h1>Presentación del Equipo Regional Calasancio</h1>
    <p>
      <strong>El equipo regional Calasancio está experimentando un emocionante ascenso en su trayectoria.</strong> Fundado sobre los cimientos de la pasión por el fútbol y el compromiso con la excelencia, el equipo se ha destacado en cada encuentro con su dedicación y habilidades excepcionales.
    </p>
    <p>
      En este espacio, te damos la bienvenida a explorar y conocer a fondo a cada uno de nuestros jugadores. Desde sus habilidades técnicas hasta sus estadísticas de juego, aquí encontrarás una visión completa de la capacidad y el potencial de cada integrante del equipo.
    </p>
    <p>
      Acompáñanos en este emocionante viaje a través del mundo del fútbol, donde cada partido es una oportunidad para demostrar nuestro compromiso con el deporte y el espíritu competitivo.
    </p>
  </div>
</div>

      <div class="card-container" v-if="Jugadores.length">
        
        <div class="card" v-for="jugador in Jugadores" :key="jugador.id">
          <div class="card-header">
            <h2>
              <input v-model="jugador.nombre" :disabled="!$store.state.isAdmin" />
              <input v-model="jugador.apellidos" :disabled="!$store.state.isAdmin" />
            </h2>
            <input v-model="jugador.posicion" :disabled="!$store.state.isAdmin" />
          </div>
          <div class="card-body">
            <div class="image-container">
              <img :src="require(`../assets/assets/${jugador.numeroCamiseta}.jpeg`)" alt="Foto del jugador">
            </div>
            <p><strong>Altura:</strong> <input v-model="jugador.altura" :disabled="!$store.state.isAdmin" /> m</p>
            <p><strong>Pie:</strong> <input v-model="jugador.pie" :disabled="!$store.state.isAdmin" /></p>
            <p><strong>Número de Camiseta:</strong> <input v-model="jugador.numeroCamiseta" :disabled="!$store.state.isAdmin" /></p>
           <!-- <p><strong>Partidos Jugados:</strong> <input type="checkbox" v-model="jugador.partidosJugados" :disabled="!$store.state.isAdmin" /></p>-->
            <p><strong>Goles:</strong> <input v-model="jugador.goles" :disabled="!$store.state.isAdmin" /></p>
            <p><strong>Goles por Partido:</strong> <input v-model="jugador.golesPorPartido" :disabled="!$store.state.isAdmin" /></p>
            
            <!-- Botón para actualizar -->
            <button  v-if="$store.state.isAdmin" @click="actualizarJugador(jugador)" class="update-button">Actualizar</button>
            <button   v-if="$store.state.isAdmin" @click="eliminarJugador(jugador.numeroCamiseta)" class="delete-button">
              <i class="material-icons">clear</i>
            </button>
          </div>
        </div>
        <v-dialog v-model="showAddJugadorDialog" max-width="800px" class="custom-dialog">
          <AddJugadores @close="showAddJugadorDialog = false" />
        </v-dialog>
      </div>
      <p v-else>Cargando jugadores...</p>
    </div>
  </div>
</template>



<script>
import AddJugadores from './AddJugadores.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Jugadores',
  components: {
    AddJugadores,
  },
  data() {
    return {
      showAddJugadorDialog: false,
    };
  },
  computed: {
    ...mapState(['Jugadores']),
  },
  created() {
    this.fetchJugadores();
  },
  methods: {
    ...mapActions(['fetchJugadores', 'deleteJugadores', 'updateJugadoresComponent']),
    eliminarJugador(numeroCamiseta) {
      this.deleteJugadores(numeroCamiseta)
        .then(() => {
          return this.fetchJugadores();
        })
        .catch(error => {
          console.error('Error eliminando jugador:', error);
        });
    },
    actualizarJugador(jugador) {
  const { id } = jugador;
  this.$store.dispatch('updateJugadoresComponent', { id, jugador })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Si la respuesta es 204 No Content, no intentar convertir a JSON
      if (response.status === 204) {
        console.log('Jugadores actualizados exitosamente');
        return null;
      }
      return response.json();
    })
    .then(data => {
      // Si data es null, la respuesta fue 204 No Content
      if (data === null) {
        console.log('Jugadores actualizados exitosamente');
      } else {
        console.log('Jugadores actualizados con respuesta:', data);
      }
      return this.fetchJugadores();
    })
    .catch(error => {
      console.error('Error actualizando jugador:', error);
    });
}


  },
};
</script>

<style scoped>
.jugadores-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
}

h1 {
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  text-align: center;
}
.presentacion-container {
  display: flex;
  align-items: center;
  border: 2px solid #ccc; /* Marco alrededor del contenedor */
  padding: 20px;
  margin-left: 30px;
  margin-right:30px ;
  margin-bottom: 50px;
}

.imagen-lateral img {
  width: 600px; /* Tamaño de la imagen */
  margin-right: 20px; /* Espacio entre la imagen y el texto */
}

.texto {
  flex: 1; /* El texto ocupa todo el espacio restante */
}

.texto h1 {
  font-size: 28px;
}

.texto p {
  font-size: 18px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
}

.card-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.card-header span {
  font-size: 16px;
  color: #666;
}

.card-body {
  padding: 20px;
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 0 0 40px rgba(0, 0, 255, 0.5); /* Ajusta el difuminado */

}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body p {
  margin: 8px 0;
  font-size: 16px;
  color: #333;
}

.delete-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.delete-button:hover {
  background-color: #ff3333;
}

.add-jugador-btn {
  background: linear-gradient(to right, #ffff00, #ffd700); /* Degradado de amarillo */
  margin-top: 250px;
  margin-bottom: -150px;
}

.update-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-button:hover {
  background-color: #45a049;
}
.material-icons {
  font-size: 18px;
}

</style>

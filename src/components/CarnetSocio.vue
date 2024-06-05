<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">Lista de Socios con Carnet</v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="9">
                <v-text-field v-model="emailCliente" label="Buscar por Email" outlined></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-btn color="primary" @click="buscarPorEmail">Buscar</v-btn>
              </v-col>
            </v-row>
            <v-table class="custom-table">
              <thead>
                <tr>
                  <th>ID del Carnet</th>
                  <th>Cliente</th>
                  <th>Dirección</th>
                  <th>Email</th>
                  <th>DNI</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="socio in filteredCarnetSocios" :key="socio.id">
                  <td>{{ socio.id }}</td>
                  <td>
                    <input v-model="socio.cliente.nombre">
                    <input v-model="socio.cliente.apellidos">
                  </td>
                  <td><input v-model="socio.cliente.direccion"></td>
                  <td><input v-model="socio.cliente.email"></td>
                  <td><input v-model="socio.cliente.dni"></td>
                  <td><input v-model="socio.precio"></td>
                  <td>
                    <v-btn class="custom-edit-btn" color="primary" @click="editar(socio)">Editar</v-btn>
                    <v-btn class="custom-delete-btn" color="error" @click="eliminar(socio.id)">Eliminar</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    emailCliente: "",
    isDataUpdated: false // Bandera para controlar si los datos se han actualizado
  }),
  computed: {
    ...mapState(["CarnetSocios","Clientes"]),
    filteredCarnetSocios() {
      // Filtrar los socios con carnets por email
      return this.CarnetSocios.filter(socio => socio.cliente.email.toLowerCase().includes(this.emailCliente.toLowerCase()));
    }
  },
  methods: {
    ...mapActions(["fetchCarnetSocios", "updateCarnetSocio", "deleteCarnetSocio","fetchCarnetSociosEmail"]),
    buscarPorEmail() {
      // Si el campo de email no está vacío, buscar los socios con carnets por email
      if (this.emailCliente.trim() !== "") {
        this.fetchCarnetSociosEmail({ email: this.emailCliente });
      } else {
        // Si el campo de email está vacío, recuperar todos los socios con carnets
        this.fetchCarnetSocios();
      }
    },
    editar(socio) {
      this.updateCarnetSocio(socio)
        .then(() => {
          this.isDataUpdated = true; // Establecer la bandera a true después de actualizar los datos
        })
        .catch(error => {
          console.error('Error actualizando socio:', error);
        });
    },
    eliminar(id) {
      this.deleteCarnetSocio(id)
        .then(() => {
          this.fetchCarnetSocios();
        })
        .catch(error => {
          console.error('Error eliminando socio:', error);
        });
    }
  },
  created() {
    this.fetchCarnetSocios();
  },
  updated() {
    // Verificar si los datos se han actualizado antes de realizar otra llamada a fetchCarnetSocios()
    if (this.isDataUpdated) {
      this.fetchCarnetSocios();
      this.isDataUpdated = false; // Restablecer la bandera a false después de actualizar los datos
    }
  }
};
</script>

<style scoped>
.custom-card {
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-card-title {
  font-size: 24px;
  color: #333;
  text-align: center;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th, .custom-table td {
  padding: 20px;
  text-align: left;
  border: 1px solid #ddd;
}

.custom-table th {
  background-color: #e0e0e0;
  text-align: center;
}

.custom-table tr:nth-child(even) {
  background-color: #fafafa;
}

/* Estilo para centrar la lista encapsulada */
.custom-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.custom-edit-btn, .custom-delete-btn {
  color: white !important;
}

.custom-edit-btn:hover, .custom-delete-btn:hover {
  color: white !important;
}

.custom-edit-btn {
  background-color: #007bff; /* Azul */
}

.custom-delete-btn {
  background-color: #dc3545; /* Rojo */
}
</style>

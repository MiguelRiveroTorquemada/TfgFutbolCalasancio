<template>
  <v-container fluid>
    <v-row justify="center"> <!-- Cambio en la justificación -->
      <v-col cols="12" md="5" class="my-2"> <!-- Ajuste de tamaño y margen -->
        <!-- Contenido de la cesta -->
        <v-card class="centered-card smaller-card">
          <v-card-text>
            <h2 class="text-center basket-title">Tu cesta</h2>
            <!-- Mensaje si el carrito está vacío -->
            <div v-if="productosEnCarrito.length === 0" class="text-center">
              <p>El carrito está vacío.</p>
            </div>
            <!-- Envolver cada producto en un v-card -->
            <v-card v-for="(producto, index) in productosEnCarrito" :key="index" class="mb-2 product-item-card">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ producto.nombreProducto }}</v-list-item-title>
                    <v-list-item-subtitle>Precio: €{{ producto.precio }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <!-- Línea difuminada encima del total -->
            <div class="line"></div>
          </v-card-text>
          <!-- Total debajo de la lista de productos -->
          <h3 class="text-center mt-2">Total: €{{ total }}</h3>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5" class="my-2"> <!-- Ajuste de tamaño y margen -->
        <!-- Contenido del formulario -->
        <v-card class="centered-card smaller-card">
          <v-card-text>
            <p class="text-center">¿Ya tienes una cuenta? Inicia sesión</p>
            <v-text-field label="Email" v-model="email" type="email"></v-text-field>
            <v-text-field label="Password" v-model="password" type="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="comprar" class="blue-gradient-btn">Completar pedido</v-btn>
            <v-btn @click="volver" class="blue-gradient-btn">Seguir Comprando</v-btn>
            <v-btn v-if="!email || !password" @click="mostrarFormularioCliente" class="blue-gradient-btn" dark>Tus detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Diálogo modal para agregar cliente -->
    <v-dialog v-model="mostrarDialogoCliente" max-width="500px">
      <v-card>
        <v-card-title>Agregar Cliente</v-card-title>
        <v-card-text>
          <add-clientes @clienteAgregado="clienteAgregado"></add-clientes>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { mapState, mapActions } from "vuex";
import AddClientes from '@/components/AddClientes.vue';

export default {
  components: {
    AddClientes,
  },
  data() {
    return {
      email: null,
      password: null,
      mostrarDialogoCliente: false
    };
  },
  computed: {
    ...mapState(["Carritos"]),
    productosEnCarrito() {
      return this.Carritos;
    },
    total() {
      return this.productosEnCarrito.reduce((total, item) => total + item.precio, 0);
    }
  },
  methods: {
    ...mapActions(["addCarritos", "verificarCredenciales", "fetchClientes"]),
    async comprar() {
      const idsProductosEnCarrito = this.productosEnCarrito.map(producto => producto.id);
      if (this.email && this.password) {
        const credencialesValidas = await this.verificarCredenciales({ email: this.email, password: this.password });
        if (credencialesValidas) {
          await this.addCarritos({ productoIds: idsProductosEnCarrito, email: this.email, password: this.password });
          // Actualizar la página
          this.$router.go(0);
        } else {
          this.mostrarDialogoCliente = true;
        }
      } else {
        this.mostrarDialogoCliente = true;
      }
    },
    mostrarFormularioCliente() {
      this.mostrarDialogoCliente = true;
    },
    clienteAgregado(email) {
      this.email = email;
      this.mostrarDialogoCliente = false;
    },
    volver() {
      this.$router.push({ name: 'ListProductos' });
    },
    irAAgregarCliente() {
      this.$router.push({ name: 'AddClientes' });
    },
  },
  created() {
    this.fetchClientes();
  }
};
</script>


<style scoped>
.container-frame {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Sombra difuminada */
  position: relative;
  z-index: 2; /* Asegura que el formulario esté por encima del degradado */
}

.centered-card::before {
  content: '';
  position: absolute;
  top: -20px; /* Ajusta el desplazamiento vertical */
  left: -20px; /* Ajusta el desplazamiento horizontal */
  right: -20px; /* Ajusta el desplazamiento horizontal */
  bottom: -20px; /* Ajusta el desplazamiento vertical */
  border-radius: inherit;
  box-shadow: 0 0 40px rgba(0, 0, 255, 0.5); /* Ajusta el difuminado */
  z-index: -1;
}

/* Ajuste para el interior del recuadro */
.centered-card > * {
  background-color: white; /* Establece el fondo del contenido como blanco */
}
.centered-card .basket-title {
  margin-bottom: 30px; /* Ajusta el margen superior */
}


.line {
  border-top: 1px dashed rgba(0, 0, 0, 0.3);
  margin: 20px auto; /* Ajusta el margen */
  width: 50%; /* Ajusta el ancho de la línea */
}

/* Estilos ya existentes */
.mb-2 {
  margin-bottom: 16px;
}

.centered-card {
  margin: 16px auto;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

.text-center {
  text-align: center;
}

.blue-gradient-btn {
  background: linear-gradient(to right, #007bff, #0047ab);
  color: white;
}

/* Ajuste de tamaño de columna */
.v-col {
  max-width: 400px; /* Aumenta el ancho máximo del formulario */
}

/* Ajuste de margen */
.my-2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* Ajuste para tarjetas más grandes y rectangulares */
.smaller-card {
  width: 100%; /* Ajusta el ancho al 100% del contenedor */
  max-width: 500px; /* Define un ancho máximo mayor */
  margin-left: auto; /* Mueve la caja hacia la derecha */
  border-radius: 12px; /* Hace los bordes más redondeados */
}
.product-item-card {
  padding: 16px; /* Ajusta el relleno interno */
  margin-bottom: 16px; /* Ajusta el margen inferior */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


</style>

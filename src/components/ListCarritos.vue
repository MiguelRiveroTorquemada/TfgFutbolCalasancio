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
            <!-- Botones más pequeños y cuadrados -->
            <v-btn @click="processPaymentCarrito" class="blue-gradient-btn small-square-btn">Completar pedido</v-btn>
            <v-btn @click="volver" class="blue-gradient-btn small-square-btn">Seguir Comprando</v-btn>
            <v-btn v-if="!email || !password" @click="mostrarFormularioCliente" class="blue-gradient-btn small-square-btn" dark>Tus detalles</v-btn>
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
    ...mapActions(["processPaymentCarrito", "fetchClientes","addClientes"]),
    async processPaymentCarrito() {
  const idsProductosEnCarrito = this.productosEnCarrito.map(producto => producto && producto.id);
  try {
    const clienteExiste = await this.$store.dispatch("verificarCredenciales", {
      email: this.email,
      password: this.password
    });

    if (!clienteExiste) {
      // Si el cliente no existe, muestra el formulario para agregar un nuevo cliente
      this.mostrarDialogoCliente = true;
      return; // Detener el proceso de pago
    }

    // Continuar con el proceso de pago
    await this.$store.dispatch("processPaymentCarrito", {
      productoIds: idsProductosEnCarrito,
      carnetSocioId: null,
      email: this.email,
      password: this.password
    });
    
    // Actualizar la página
    this.$router.go(0);
  } catch (error) {
    console.error('Error al procesar el pago:', error);

    // Manejar el error y mostrar el diálogo del cliente si es necesario
    this.mostrarDialogoCliente = true;
  }
},

irAAgregarCliente() {
  // Navegar a la página de agregar cliente
  this.$router.push({ name: 'addClientes' });
},


    mostrarFormularioCliente() {
      this.mostrarDialogoCliente = true;
    },
    clienteAgregado(email) {
      this.email = email;
      this.mostrarDialogoCliente = false;
    },
    volver() {
  // Verifica si la ruta actual no es "/ListProductos"
  if (this.$route.path !== '/ListProductos') {
    // Navega a "/ListProductos" solo si la ruta actual es diferente
    this.$router.push({ name: 'ListProductos' });
  }
},

  },
  created() {
    this.fetchClientes();
  }
};
</script>


<style scoped>
/* Estilo para hacer los botones más pequeños y cuadrados */
.small-square-btn {
  width: 150px; /* Ancho deseado para los botones */
  height: 40px; /* Altura deseada para los botones */
  border-radius: 0; /* Hacer los botones cuadrados */
  padding: 5px 10px; /* Ajustar el relleno interno */
  font-size: 14px; /* Tamaño del texto */
  margin-right: 10px; /* Agregar margen entre los botones */
}

/* Estilos existentes */
.container {
  margin-top: 230px;
}

.container-frame {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.centered-card::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border-radius: inherit;
  box-shadow: 0 0 40px rgba(0, 0, 255, 0.5);
  z-index: -1;
}

.centered-card > * {
  background-color: white;
}

.centered-card .basket-title {
  margin-bottom: 30px;
}

.line {
  border-top: 1px dashed rgba(0, 0, 0, 0.3);
  margin: 20px auto;
  width: 50%;
}

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

.v-col {
  max-width: 400px;
}

.my-2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.smaller-card {
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  border-radius: 12px;
}

.product-item-card {
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

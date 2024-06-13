<template>
  <div>
    <!-- Imagen como cabecera de la página -->
    <div class="header"></div>
    
    <v-container fluid>
      <!-- Botón para agregar nuevos productos -->
      <v-row justify="center">
        <v-btn v-if="$store.state.isAdmin" @click="showAddProductDialog = true" class="add-product-btn" dark>
          +
        </v-btn>
      </v-row>

      <v-row justify="center" class="product-row">
        <v-col v-for="producto in filteredProductos" :key="producto.id" cols="12" md="4" class="product-col">
          <div class="container-frame">
            <div class="centered-card">
              <img :src="getImageUrl(producto.id)" alt="Imagen del producto" style="width: 400px;">
              <v-card-title>
                <span v-if="!producto.editable || !$store.state.isAdmin" @click="enableEditing(producto)">{{ producto.nombreProducto }}</span>
                <input v-else v-model="producto.nombreProducto">
              </v-card-title>
              <v-card-subtitle>
                <span v-if="!producto.editable || !$store.state.isAdmin" @click="enableEditing(producto)">{{ producto.descripcion }}</span>
                <input v-else v-model="producto.descripcion">
              </v-card-subtitle>
              <v-card-text>
                <div v-if="!producto.editable || !$store.state.isAdmin" @click="enableEditing(producto)">Precio: €{{ producto.precio }}</div>
                <input v-else v-model.number="producto.precio" type="number" step="0.01">
              </v-card-text>
              <v-btn @click="comprar(producto)" class="blue-gradient-btn" dark>
                Agregar al carrito
              </v-btn>
              <!-- Botones para eliminar y actualizar producto -->
              <v-btn v-if="$store.state.isAdmin" @click="eliminarProducto(producto.id)" class="red-gradient-btn" dark>
                Eliminar
              </v-btn>
              <v-btn v-if="$store.state.isAdmin" @click="actualizarProducto(producto)" class="green-gradient-btn" dark>
                Guardar
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <!-- Desplegable del componente ListCarritos -->
      <v-dialog v-model="showCarritosDialog" class="custom-dialog">
        <template v-slot:activator="{ on }"></template>
        <ListCarritos />
      </v-dialog>
      
      <!-- Desplegable del componente AddProductos -->
      <v-dialog v-model="showAddProductDialog" max-width="500px" class="custom-dialog">
        <template v-slot:activator="{ on }"></template>
        <AddProductos @close="showAddProductDialog = false" />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListCarritos from "./ListCarritos.vue";
import AddProductos from "./AddProductos.vue";

export default {
  components: {
    ListCarritos,
    AddProductos
  },
  data() {
    return {
      nombreProducto: "",
      showCarritosDialog: false,
      showAddProductDialog: false // Estado para controlar el diálogo de agregar productos
    };
  },
  computed: {
    ...mapState(["Productos"]),
    filteredProductos() {
      if (this.nombreProducto.trim() === "") {
        return this.Productos;
      }
      const lowerNombre = this.nombreProducto.toLowerCase();
      return this.Productos.filter(producto =>
        producto.nombreProducto.toLowerCase().includes(lowerNombre)
      );
    }
  },
  methods: {
    ...mapActions(["fetchProductos", "deleteProductos", "updateProductos", "addProductos", "processPaymentCarrito"]),
    comprar(producto) {
      this.$store.commit("processPaymentCarrito", producto);
      // Mostrar el desplegable automáticamente al agregar un producto al carrito
      this.showCarritosDialog = true;
    },
    eliminarProducto(id) {
      this.deleteProductos(id)
        .then(() => {
          // Después de eliminar el producto, vuelve a cargar los productos actualizados
          return this.fetchProductos();
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    },
    actualizarProducto(producto) {
      this.updateProductos(producto)
        .then(() => {
          // Después de actualizar el producto, vuelve a cargar los productos actualizados
          return this.fetchProductos();
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    },
    getImageUrl(id) {
      const imageUrls = {
        1: require("../assets/taza.jpg"),
        2: require("../assets/camiseta.jpg"),
        3: require("../assets/bufanda.jpg"),
        4: require("../assets/bufanda.jpg"),
        5: require("../assets/bufanda.jpg"),
        6: require("../assets/1.jpg")
      };
      return imageUrls[id];
    },
    enableEditing(producto) {
      if (this.$store.state.isAdmin) {
        // Habilitar la edición en línea para el producto solo si es admin
        this.$set(producto, 'editable', true);
      }
    }
  },
  created() {
    this.fetchProductos();
  }
};
</script>

<style scoped>
/* Estilo para la imagen de la cabecera */
.header {
  height: 600px; /* Altura deseada del header */
  background-image: url('@/assets/5.jpg'); /* Ruta de la imagen */
  background-size: cover; /* Redimensiona la imagen para cubrir todo el contenedor sin deformarse */
  margin-top: 100px;

}
.container-frame {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  height: 400px;
  margin-bottom: 100px;
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

.centered-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.line {
  border-top: 1px dashed rgba(0, 0, 255, 0.3);
  margin: 20px auto;
  width: 50%;
}

.blue-gradient-btn {
  background: linear-gradient(to right, #007bff, #0047ab);
  color: white;
}

.red-gradient-btn {
  background: linear-gradient(to right, #ff0000, #ab0000);
  color: white;
}

.green-gradient-btn {
  background: linear-gradient(to right, #00ff00, #00ab00);
  color: white;
}

.add-product-btn {
  background: linear-gradient(to right, #ffff00, #ffd700); /* Degradado de amarillo */
  color: black; /* Cambiar el color del texto a negro para mejor legibilidad */
  margin-top: 40px; /* Incrementar el margen superior */
  margin-bottom: 20px;
}

.product-row {
  margin-left: 40px;
  margin-right: -20px;
}

.product-col {
  padding-left: 20px;
  padding-right: 20px;
  padding-left: 15px;
  padding-right: 75px;
  margin-bottom: 30px;
  margin-top: 60px;
}

/* Estilo para el fondo blanco del desplegable */
.custom-dialog .v-dialog__content {
  background-color: white;
}
</style>

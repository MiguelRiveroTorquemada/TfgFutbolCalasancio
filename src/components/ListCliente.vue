<template>
  <div>
    <div class="carrito-list" v-if="clienteLogueadoId !== null">
      <div v-for="carrito in carritos" :key="carrito.id" class="carrito-card">
        <h2>Listado de Carritos</h2>

        <div v-for="cliente in carrito.clientes" :key="cliente.id" class="cliente-info">
          <h4>Cliente:</h4>
          <p><strong>Nombre:</strong> {{ cliente.nombre }} {{ cliente.apellidos }}</p>
          <p><strong>Email:</strong> {{ cliente.email }}</p>
          <p><strong>Dirección:</strong> {{ cliente.direccion }}</p>
        </div>
        
        <p><strong>Total:</strong> {{ carrito.total }}</p>
        <ul>
          <li v-for="producto in carrito.items" :key="producto.id">
            <strong>Producto</strong>   {{ producto.nombreProducto }} - <strong>Precio:</strong> {{ producto.precio }}
          </li>
        </ul>
        <p><strong>Estado de envio:</strong> {{ carrito.enviado }}</p>
        
      </div>
    </div>
    <div v-else>
      <p>Inicia sesión para ver tus carritos.</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      Carritos: [],
      Clientes: []
    };
  },
  created() {
    if (this.clienteLogueadoId !== null) {
      this.$store.dispatch('fetchClientesId', this.clienteLogueadoId);
    }
  },
  computed: {
    carritos() {
      return this.$store.state.Carritos;
    },
    clienteLogueadoId() {
      return this.$store.state.clienteLogueadoId;
    }
  }
};
</script>

<style scoped>
.carrito-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 230px;
}

.carrito-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  width: 30%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.carrito-card h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.carrito-card p {
  margin-bottom: 15px;
}

.carrito-card ul {
  padding-left: 20px;
}

.carrito-card ul li {
  margin-bottom: 5px;
}

.carrito-card ul li::before {
  content: "\2022";
  color: #666;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.cliente-info {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>

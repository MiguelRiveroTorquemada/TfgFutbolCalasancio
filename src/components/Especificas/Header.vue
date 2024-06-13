<template>
  <div class="header-container ">
    <!-- Línea divisoria con marco azul difuminado -->
    <div class="linea-divisoria"></div>

    <!-- Menú de navegación -->
    <nav class="menu-navegacion contenedor">
      <div class="enlaces">
        <li></li>

        <!-- Desplegable para Bodas y Comuniones -->
        <li class="desplegable">
          <router-link to="/Equipos" class="enlace-negro">EQUIPO</router-link>

          <ul class="submenu">
            <li>
              <router-link to="/ListPartidos" class="enlace-negro"
                >PARTIDOS</router-link
              >
            </li>
            <li>
              <router-link to="/ListJugadores" class="enlace-negro"
                >JUGADORES</router-link
              >
            </li>
          </ul>
        </li>
        <!-- Fin del Desplegable -->

        <li>
          <router-link to="/ListCarnetSocio" class="enlace-negro">
            UNETE</router-link
          >
        </li>

        <li>
          <router-link to="/ListProductos" class="enlace-negro"
            >TIENDA</router-link
          >
        </li>
        <li class="imagen-en-medio">
          <!--<img src="@/assets/image.png" alt="Flor" class="flor-icono-medio" />-->
        </li>

        <!-- <li><router-link   to="/AddClientes" class="enlace-negro">UNETE</router-link></li>-->

        <li>
          <button @click="logout" class="enlace-negro">
            <i class="fas fa-user-circle"></i>
            <!-- Icono de usuario -->
          </button>
        </li>

        <li><span class="separador"></span></li>
        <li>
          <button @click="logout" class="enlace-negro">
            <i class="fas fa-sign-out-alt"></i>
            <!-- Icono de logout -->
          </button>
        </li>

        <router-link
          to="/ListCarritos"
          class="carrito-link enlace-negro"
          @click="redirectToOrders"
        >
          <div class="carrito-icono">
            <v-icon>mdi-cart</v-icon>
          </div></router-link
        >

        <li>
          <router-link
            to="/ListCliente"
            v-if="$store.state.clienteLogueadoId"
            class="enlace-negro"
            >Tus compras
          </router-link>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    redirectToOrders() {
      this.$router.push({ name: "ListOrders" });
    },
    logout() {
      // Llama a la acción de Vuex para cerrar sesión
      this.$store.dispatch("logout");

      // Redirige a la página de inicio de sesión u otra página deseada
      this.$router.push("/login"); // Ajusta la ruta según tu configuración
    },
  },
};
</script>

<style scoped>



.header-container {
  position: fixed;
  border-top: 1px solid transparent; /* Línea inicialmente transparente */
  box-shadow: inset 0 0 30px rgba(0, 0, 255, 0.5); /* Difuminado azul hacia dentro del header */
  border-image-slice: 1; /* Ajuste para el gradiente */
  top: 0;
  width: 100%;
  background-color: white; /* Cambia el color de fondo según tus preferencias */
  box-shadow: inset 0 0 30px rgba(0, 0, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.1); /* Añade la sombra también al header fijo */
  z-index: 1000;
}



.contenedor {
  width: 90%;
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: var(--paddingSecciones);
}

.menu-navegacion {
  z-index: 9999;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  left: -40px;
}
.header-fijo {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white; /* Cambia el color de fondo según tus preferencias */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra si lo deseas */
  z-index: 1000;
}

.enlaces li {
  list-style: none;
  display: inline-block;
}

.enlace-negro,
.submenu a.enlace-negro {
  color: black; /* Color negro para los enlaces */
  text-decoration: none;
  margin-left: 20px;
}

.enlace-negro:hover,
.submenu a.enlace-negro:hover {
  color: maroon; /* Cambiar a color granate al pasar el ratón sobre el enlace */
  text-decoration: underline;
}

.desplegable {
  list-style: none;
  display: inline-block;
  position: relative;
}

.desplegable span {
  color: var(--colorFondo);
  text-decoration: none;
  margin-left: 20px;
  cursor: pointer;
}

.submenu {
  position: fixed;
  display: none;
  background-color: var(--colorFondo);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 9999;
}

.desplegable:hover .submenu {
  display: block;
}

.submenu li {
  list-style: none;
  margin: 10px 0;
}

.submenu a {
  color: var(--colorFondo);
  text-decoration: none;
}

.submenu a:hover {
  text-decoration: underline;
}

.carrito-icono {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.carrito-link {
  display: inline-block;
  margin-left: 20px;
}

.flor-icono-medio {
  width: 90px; /* Ajusta el tamaño según tus preferencias */
  height: auto; /* Mantén la proporción original de la imagen */
  margin: 20px;
}

.header-fijo {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white; /* Cambia el color de fondo según tus preferencias */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra si lo deseas */
  z-index: 1000;
}
</style>

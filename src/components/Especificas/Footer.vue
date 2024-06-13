<template>
  <footer class="footer-container">
    <div class="footer-content">
      <!-- Contenido adicional si es necesario -->
      <div class="center-links">
        <router-link to="/ListProductos" class="enlace-negro">Tienda</router-link>
        <router-link to="/ListCarnetSocio" class="enlace-negro">¿Quieres ser socio?</router-link>
        <router-link to="/Equipos" class="enlace-negro">Sobre el equipo</router-link>
      </div>
      
      <!-- Aquí se agregan las imágenes -->
      <div v-for="(imagen, index) in imagenes" :key="index">
        <img :src="imagen.src" :alt="imagen.alt" class="patrocinador-img">
        
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      imagenes: [
        { src: require('/src/assets/patrocinador1.jpg'), alt: 'Patrocinador 1' },
        { src: require('/src/assets/Patrocinador2.jpg'), alt: 'Patrocinador 2' },
        { src: require('/src/assets/patrocinador3.jpg'), alt: 'Patrocinador 3' },
        // Agrega más imágenes según sea necesario
      ]
    };
  }
};
</script>

<style scoped>
.footer-container {
  background-color: #001affb3;
  width: 100%;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-links {
  display: flex;
  align-items: center;
}

.enlace-negro {
  color: black;
  margin: 10px 15px;
  text-decoration: none;
  font-size: 18px;
}

.enlace-negro:hover {
  color: #800000;
  text-decoration: underline;
}

.lightwidget-container {
  height: 250px;
  overflow-y: auto;
}

/* Estilos para la imagen */
.patrocinador-img {
  max-width: 200px; /* Ajusta el tamaño según sea necesario */
  margin-top: 10px; /* Ajusta el margen superior según sea necesario */
}
</style>

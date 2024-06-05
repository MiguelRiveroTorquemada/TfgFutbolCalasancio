<template>
  <footer class="footer-container">
    <div class="footer-content">
      <!-- Contenido adicional si es necesario -->
      <div class="footer-links">
        <v-btn icon href="https://wa.me/634598613" target="_blank" rel="noopener noreferrer">
          <v-icon>mdi-whatsapp</v-icon>
        </v-btn>
        <v-btn icon href="https://www.instagram.com/fotografiandreaa/?hl=es" target="_blank" rel="noopener noreferrer">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <div class="center-links">
          <router-link to="/ListPresets" class="enlace-negro">PRESETS</router-link>
          <router-link to="/testimonios" class="enlace-negro">TESTIMONIOS</router-link>
          <router-link to="/contacto" class="enlace-negro">CONTACTO</router-link>
        </div>
      </div>

      <!-- Widget de LightWidget (Grid pequeño) en el lado derecho y más arriba -->
      <div id="lightwidget-container" class="lightwidget-container"></div>
    </div>
  </footer>
</template>

<script>
export default {
  mounted() {
    // Carga dinámica del script de LightWidget
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.head.appendChild(script);

    // Inicialización del widget de LightWidget después de cargar el script
    script.onload = () => {
      // Reemplaza el contenido del widget con el nuevo enlace proporcionado
      const embedCode = '<!-- LightWidget WIDGET --><script src="https://cdn.lightwidget.com/widgets/lightwidget.js"><\/script><iframe src="//lightwidget.com/widgets/da67cdd78def5812b0de332792b219e9.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"><\/iframe>';
      document.getElementById('lightwidget-container').innerHTML = embedCode;
    };
  },
};
</script>


<style scoped>
.footer-container {
  background-color: #8b4513b3;
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
</style>
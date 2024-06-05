<template>
    <v-app>
      <!-- App Bar -->
      <v-app-bar app color="white" elevate-on-scroll>
        <v-img src="logo.png" max-height="64" contain></v-img>
        <v-spacer></v-spacer>
        <!-- Aquí podrías incluir botones de inicio de sesión, carrito, etc. -->
      </v-app-bar>
  
      <!-- Contenido principal -->
      <v-main>
        <!-- Contenido de la página, como secciones, tarjetas, etc. -->
        <v-container fluid>
          <!-- Tarjeta con imagen y texto -->
          <v-row justify="center">
            <v-col cols="12" lg="15">
              <v-card
                elevation="2"
                class="pb-5 custom-card d-flex align-center"
                @click="navigateToPartidos"
              >
                <!-- Contenedor de la imagen -->
                <div class="image-container" @mouseenter="handleMouseEnter(1)" @mouseleave="handleMouseLeave(1)">
                  <!-- Imagen -->
                  <v-img
                    src="../assets/1.jpg"
                    class="zoomable-image"
                    :class="{ 'zoomed': isZoomed[1] }"
                  ></v-img>
                </div>
  
                <!-- Texto a la derecha de la imagen -->
                <v-card-title class="text-h4 font-weight-bold ml-4">
                  <h3 style="white-space: pre-wrap; font-size: 90%;">Equipo con aspiración de ascenso a la tercera división de la competición nacional</h3>
                  <p style="font-size: 60%;">¿Quieres tener más información? </p>
                  <p style="font-size: 60%;"> Pincha aquí</p>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
  
          <!-- Otras tres tarjetas con imágenes -->
          <v-row justify="center">
            <v-col cols="12" lg="4">
              <v-card elevation="2" class="pb-5 small-card">
                <div class="small-image-container" @mouseenter="handleMouseEnter(2)" @mouseleave="handleMouseLeave(2)">
                  <v-img
                    src="../assets/2.jpg"
                    class="zoomable-image"
                    :class="{ 'zoomed': isZoomed[2] }"
                  ></v-img>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" lg="4">
              <v-card elevation="2" class="pb-5 small-card">
                <div class="small-image-container" @mouseenter="handleMouseEnter(3)" @mouseleave="handleMouseLeave(3)">
                  <v-img
                    src="../assets/3.jpg"
                    class="zoomable-image"
                    :class="{ 'zoomed': isZoomed[3] }"
                  ></v-img>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" lg="4">
              <v-card elevation="2" class="pb-5 small-card">
                <div class="small-image-container" @mouseenter="handleMouseEnter(4)" @mouseleave="handleMouseLeave(4)">
                  <v-img
                    src="../assets/4.jpg"
                    class="zoomable-image"
                    :class="{ 'zoomed': isZoomed[4] }"
                  ></v-img>
                </div>
              </v-card>
            </v-col>
            <v-row justify="center">
      <v-col cols="9">
        <v-img src="../assets/Captura.jpg"></v-img>
      </v-col>
    </v-row>
          </v-row>
          
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        isZoomed: { 1: false, 2: false, 3: false, 4: false }
      };
    },
    methods: {
      navigateToPartidos() {
        this.$router.push({ path: 'ListPartidos' });
      },
      handleMouseEnter(index) {
        this.isZoomed[index] = true;
      },
      handleMouseLeave(index) {
        this.isZoomed[index] = false;
      }
    }
  };
  </script>
  
  <style>
/* Ancho del 30% para col-lg-4 en pantallas grandes (min-width: 1264px) */
@media (min-width: 1264px) {
  .col-lg-4 {
    flex: 0 0 33.3333333333%;
    max-width: 40%;
  }
}

/* Estilo personalizado para la tarjeta principal */
.custom-card {
  margin: 0 20px; /* Margen de 20px a cada lado */
  overflow: hidden; /* Para que la imagen no se salga de los límites de la tarjeta */
}

/* Contenedor de la imagen */
.image-container {
  position: relative;
  width: 300%;
  height: 600px; /* Aumentar la altura para hacer la cápsula más grande */
  overflow: hidden; /* Asegura que la imagen no se salga del contenedor */
}

/* Efecto de zoom para la imagen */
.zoomable-image {
  transition: transform 0.6s ease; /* Transición más larga para un efecto más gradual */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.zoomed {
  transform: scale(1.1); /* Cambia este valor para ajustar el nivel de zoom */
}

/* Estilo personalizado para las tarjetas inferiores */
.small-card {
  margin: 0 20px; /* Margen de 20px a cada lado */
  overflow: hidden; /* Para que la imagen no se salga de los límites de la tarjeta */
}

.small-image-container {
  position: relative;
  width: 100%;
  height: 300px; /* Altura más pequeña para las tarjetas inferiores */
  overflow: hidden; /* Asegura que la imagen no se salga del contenedor */
}
</style>


<template>
    <div>
      <ListCarnetSocio></ListCarnetSocio>
      <CarnetSocio></CarnetSocio>
    </div>
  </template>
    
  
  <script>
  import ListCarnetSocio from "@/components/ListCarnetSocio.vue";
  import CarnetSocio from "@/components/CarnetSocio.vue";
  export default {
    components: {

      ListCarnetSocio,
      CarnetSocio
    },
  
    /*     created() {
          this.cargarDatos();
      },
  
      data() {
          return {
              Items: []
          }
      },
       */
      
  };
  </script>
  
  <style>
  </style>
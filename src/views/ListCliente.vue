
<template>
    <div>
      <Equipos></Equipos>
      <ListCliente></ListCliente>
    </div>
  </template>
    
  
  <script>
  import ListCliente from "@/components/ListCliente.vue";
  import Equipos from "@/components/Equipos.vue";

  export default {
    components: {
        ListCliente,
        Equipos,

    },
  
  
  };
  </script>
  
  <style>
  </style>
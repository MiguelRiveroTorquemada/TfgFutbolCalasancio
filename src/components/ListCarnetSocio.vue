<template>
  <v-container fluid class="container">
    <v-row>
      <!-- Columna izquierda para el texto y la imagen -->
      <v-col cols="12" md="6">
        <div class="texto-superior">
          <div class="image-container">
            <h3>¿Todavía no eres socio? Únete a nuestro club y consigue tus ventajas</h3>
            <img src="../assets/2.jpg" alt="Descripción de la imagen">
          </div>
        </div>
      </v-col>
      <!-- Columna derecha para el formulario -->
      <v-col cols="12" md="6">
        <!-- Formulario para agregar clientes -->
        <v-form class="blurred-border form" @submit.prevent="onSubmit" @reset="onReset">
          <v-text-field
            v-model="nuevoCliente.nombre"
            :counter="20"
            type="text"
            label="Nombre"
            :rules="[rules.required, rules.maxLength(20)]"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCliente.apellidos"
            type="text"
            label="Apellidos"
            :rules="[rules.maxLength(400)]"
            maxlength="400"
          ></v-text-field>
          
          <v-text-field
            v-model="nuevoCliente.email"
            type="email"
            label="Email"
            :rules="[rules.required, rules.email, rules.maxLength(400)]"
            maxlength="400"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCliente.dni"
            type="text"
            label="DNI"
            :rules="[rules.required, rules.maxLength(20)]"
            maxlength="20"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCliente.direccion"
            type="text"
            label="Direccion"
            :rules="[rules.required, rules.maxLength(20)]"
            maxlength="20"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCliente.password"
            type="text"
            label="Password"
            :rules="[rules.required, rules.maxLength(20)]"
            maxlength="20"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCliente.precio"
            type="number"
            label="Precio"
            :value="20"
            readonly
            required
          >
            <template v-slot:append-outer>
              <span>€</span>
            </template>
          </v-text-field>

          <v-btn type="submit" class="custom-btn" dark>Comprar</v-btn>
          <!--  <v-btn type="reset" color="error" variant="danger">Reset</v-btn>-->
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    nombreCliente: "",
    nuevoCliente: {
      nombre: "",
      apellidos: "",
      email: "",
      dni: "",
      direccion:"",
      password:"",
      precio: 20 // Precio fijo del carnet de socio
    },
    rules: {
      required: value => !!value || 'Campo requerido.',
      email: value => {
        const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        return pattern.test(value) || 'Correo electrónico no válido.';
      },
      maxLength: max => value => value.length <= max || `Máximo ${max} caracteres.`,
    }
  }),
  computed: {
    ...mapState(["CarnetSocios"]),
    filteredCarnetSocios() {
      if (this.nombreCliente.trim() === "") {
        return this.CarnetSocios;
      }
      const lowerNombre = this.nombreCliente.toLowerCase();
      return this.CarnetSocios.filter(socio =>
        (socio.cliente.nombre.toLowerCase().includes(lowerNombre) ||
        socio.cliente.apellidos.toLowerCase().includes(lowerNombre))
      );
    }
  },
  methods: {
    ...mapActions(["fetchCarnetSocios", "addCarnetSocios"]),
    onSubmit() {
      const nuevoSocio = { cliente: { ...this.nuevoCliente }, precio: this.nuevoCliente.precio }; // Añade el precio fijo
      this.addCarnetSocios(nuevoSocio).then(() => {
        this.nuevoCliente = { nombre: "", apellidos: "", email: "", dni: "", direccion: "", password: "", precio: 20 }; // Resetea el precio también
        this.fetchCarnetSocios(); // Refresca la lista después de añadir
      });
    },
    onReset() {
      this.nuevoCliente = { nombre: "", apellidos: "", email: "", dni: "", direccion: "", password: "", precio: 20 }; // Resetea el precio también
    }
  },
  created() {
    this.fetchCarnetSocios();
  }
};
</script>

<style scoped>
.container {
  /* Estilos del contenedor */
}

/* Estilo para el contenedor del texto superior */
.texto-superior {
  margin-bottom: 20px; /* Espacio inferior */
}

/* Estilo para el texto en el lado izquierdo */
.texto-superior h3 {
  margin-top: 0; /* Quita el margen superior */
}

/* Estilo para el contenedor de la imagen */
.image-container {
  width: 100%; /* Ancho completo */
  overflow: hidden; /* Ocultar desbordamiento */
  margin-right: 20px; /* Espacio a la derecha de la imagen */
  margin-left: 5%;
  transition: transform 0.3s ease-in-out; /* Transición suave para el zoom */
}
.image-container img {
  width: 100%; /* Ancho completo */
  height: auto; /* Altura automática */
  display: block; /* Quitar el espacio en línea inferior */
  transition: transform 0.3s ease-in-out; /* Transición suave para el zoom */
}

.image-container:hover img {
  transform: scale(1.1); /* Agrandar la imagen al pasar el ratón */
}

/* Estilo para el formulario */
.form {
  width: 90%; /* Ancho del formulario */
  margin: 0 auto; /* Centrar horizontalmente */
  padding: 20px; /* Espacio interior */
  border: 1px solid rgba(0, 0, 255, 0.2); /* Borde difuminado azul */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.2); /* Sombra azul */
}

.custom-btn {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white; /* Color de texto blanco */
  border-radius: 5px; /* Bordes redondeados */
  transition: background 0.3s; /* Transición suave */
}

.custom-btn:hover {
  background: linear-gradient(135deg, #0056b3, #007bff); /* Cambio de degradado al pasar el ratón */
}
</style>

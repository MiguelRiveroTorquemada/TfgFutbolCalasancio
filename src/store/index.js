import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router'; // Ajusta la importación según la estructura de tu proyecto
import CarnetSocio from '@/components/CarnetSocio.vue';
import { loadStripe } from "@stripe/stripe-js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Productos: [],
    CarnetSocios: [],
    Carritos: [],
    Clientes: [],
    Jugadores:[],
    Partidos:[],
    clienteLogueadoId: null,
    isAdmin: false // Añadimos la propiedad isAdmin

  },
  getters: {
    // Define tus getters aquí si los necesitas
  },
  mutations: {

   // mutations.js (o donde tengas tus mutaciones de Vuex)

   setCarritosClientes(state, data) {
    state.Carritos = data;
  },
  setClienteLogueado(state, { clienteId, isAdmin }) {
    state.clienteLogueadoId = clienteId;
    state.isAdmin = isAdmin; // Guardamos si es admin
  },

    setProductos(state, payload) {
      state.Productos = payload;
    },
    addProductos(state, payload) {
      state.Productos = payload;
    },
    setCarnetSocios(state, payload) {
      state.CarnetSocios = payload;
    },
    setCarnetSocios(state, payload) {
      state.CarnetSocios = payload;
    },
   /* addCarnetSocios(state, payload) {
      state.CarnetSocios.push(payload);
    },
  
    */
   
    setCarritos(state, payload) {
      state.Carritos = payload;
    },
    /*addCarritos(state, payload) {
      state.Carritos.push(payload);
    },*/
    processPaymentCarrito(state, payload) {
      state.Carritos.push(payload);
    },
    setClientes(state, payload) {
      state.Clientes = payload;
    },
    addClientes(state, payload) {
      state.Clientes.push(payload);
    },
    deleteCarnetSocio(state, id) {
      state.CarnetSocios = state.CarnetSocios.filter(socio => socio.id !== id);
    },
    deleteJugadores(state, numeroCamiseta) {
      state.Jugadores = state.Jugadores.filter(jugador => jugador.numeroCamiseta !== numeroCamiseta);
    },
    setJugadores(state, payload) {
      state.Jugadores = payload;
    },
    addJugadores(state, payload) {
      state.Jugadores.push(payload);
    },
    setPartidos(state, payload) {
      state.Partidos = payload;
    },
    addPartidos(state, partido) {
      state.Partidos.push(partido);
    },
    deleteProductos(state, id) {
      state.Productos = state.Productos.filter(producto => producto.id !== id);
    },
  },
  
  actions: {
// actions.js (o donde tengas tus acciones de Vuex)

login({ commit, dispatch, state }, loginData) {
  console.log('Iniciando sesión con:', loginData);
  return dispatch('fetchClientes')
    .then(() => {
      console.log('Clientes en el estado:', state.Clientes);
      const cliente = state.Clientes.find(cliente => cliente.email === loginData.email && cliente.password === loginData.password);
      if (cliente) {
        console.log('Cliente encontrado:', cliente);
        commit('setClienteLogueado', { clienteId: cliente.id, isAdmin: cliente.isAdmin }); // Guarda el ID del cliente logueado y si es admin
        return Promise.resolve();
      } else {
        console.warn('Credenciales inválidas');
        throw new Error('Credenciales inválidas');
      }
    })
    .catch(error => {
      console.error('Error en login:', error);
      if (error.message === 'Credenciales inválidas') {
        return Promise.reject(error);
      } else {
        return Promise.reject(new Error('Error al cargar los datos de clientes'));
      }
    });
},


    processPayment({ commit }, paymentData) {
      return new Promise(async (resolve, reject) => {
        try {
          // Carga la librería de Stripe
          const stripe = await loadStripe(
            "pk_test_51OKO1bLkVoGrpMmaK3Fe02eWUa8lekesqoimB8CZ4xXONuBe5cW7JVl39DjUifxLQyS26apczZQbcI7oZM6SiUCy00RJmnUj7G"
          );
    
       
    
          // Realiza la solicitud al servidor con todos los datos del formulario
          const response = await fetch(
            "https://localhost:7123/CarnetSocio/CreateStripeSession",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...paymentData,
                StripeSessionId: "", // Deja esto vacío por ahora
                StripeCustomerId: "",
              }),
            }
          );
    
          // Verifica si la respuesta del servidor fue exitosa (código de estado 200)
          if (response.ok) {
            const responseData = await response.json();
            console.log("Respuesta del servidor:", responseData);
    
            // Suponiendo que la respuesta contiene una propiedad 'sessionId'
            if (responseData && responseData.sessionId) {
              // Redirige al usuario a la página de pago de Stripe
              const { error } = await stripe.redirectToCheckout({
                sessionId: responseData.sessionId,
              });
    
              if (error) {
                console.error("Error al redirigir a Checkout:", error);
                return reject(error);
              } else {
                console.log("Redirigido a Checkout exitosamente");
                // Redirige al usuario a la página de éxito de tu elección
                window.location.href = "http://localhost:8080/#/";
                resolve(); // Resuelve la promesa para indicar que el pago se procesó correctamente
              }
            }
          } else {
            console.error("Error al procesar la solicitud:", response.status, response.statusText);
            reject(new Error("Error al procesar la solicitud"));
          }
        } catch (error) {
          console.error("Error al procesar el pago:", error);
          reject(error);
        }
      });
    },    
processPaymentCarrito({ commit }, { productoIds, email, password }) {
  return new Promise((resolve, reject) => {
    // Verificar credenciales del usuario
    this.dispatch('verificarCredenciales', { email, password })
      .then(isCredentialsValid => {
        if (!isCredentialsValid) {
          throw new Error('Credenciales inválidas');
        }

        // Cargar la librería de Stripe
        return loadStripe(
          "pk_test_51OKO1bLkVoGrpMmaK3Fe02eWUa8lekesqoimB8CZ4xXONuBe5cW7JVl39DjUifxLQyS26apczZQbcI7oZM6SiUCy00RJmnUj7G"
        );
      })
      .then(stripe => {
        // Realiza la solicitud al servidor con todos los datos del carrito
        return fetch(
          `https://localhost:7123/Carrito/CreateStripeSession?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productoIds), // Aquí asumo que productoIds es un array de IDs
          }
        );
      })
      .then(response => {
        // Verifica si la respuesta del servidor fue exitosa (código de estado 200)
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error al procesar la solicitud:", response.status, response.statusText);
          reject(new Error("Error al procesar la solicitud"));
        }
      })
      .then(responseData => {
        console.log("Respuesta del servidor:", responseData);

        // Suponiendo que la respuesta contiene una propiedad 'sessionId'
        if (responseData && responseData.sessionId) {
          // Redirige al usuario a la página de pago de Stripe
          return stripe.redirectToCheckout({
            sessionId: responseData.sessionId,
          });
        }
      })
      .then(({ error }) => {
        if (error) {
          console.error("Error al redirigir a Checkout:", error);
          reject(error);
        } else {
          console.log("Redirigido a Checkout exitosamente");
          // Redirige al usuario a la página de éxito de tu elección
          window.location.href = "http://localhost:8080/#/";
          resolve(); // Resuelve la promesa para indicar que el pago se procesó correctamente
        }
      })
      .catch(error => {
        console.error("Error al procesar el pago:", error);
        reject(error);
      });
  });
},

verificarCredenciales({ state }, { email, password }) {
  console.log('Verificando credenciales:', email, password);
  console.log('Clientes actuales:', state.Clientes);
  const cliente = state.Clientes.find(cliente => cliente.email === email && cliente.password === password);
  console.log('Cliente encontrado:', cliente);
  
  if (cliente) {
    return Promise.resolve(true); // Las credenciales son válidas
  } else {
    return Promise.reject(new Error('Credenciales inválidas')); // Las credenciales son inválidas
  }
},

    fetchProductos({ commit }) {
      console.log('Fetching Productos...');
      fetch('https://localhost:7123/Producto')
        .then(result => result.json())
        .then(data => commit('setProductos', data))
        .catch(error => {
          console.error('Error fetching productos:', error);
        });
    },
    deleteProductos({ commit, dispatch }, id) {
      return fetch(`https://localhost:7123/Producto/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(result => {
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        // La solicitud DELETE puede no devolver un cuerpo JSON válido, por lo que no intentamos analizarlo
        return result.text();
      })
      .then(() => {
        commit('deleteProductos', id);
        // Después de eliminar el producto, vuelve a cargar los productos actualizados
        dispatch('fetchProductos');
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        throw error; // Propaga el error para manejarlo en el componente si es necesario
      });
    },
    deleteJugadores({ commit, dispatch }, numeroCamiseta) {
      return fetch(`https://localhost:7123/Jugador/${numeroCamiseta}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(result => {
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        // La solicitud DELETE puede no devolver un cuerpo JSON válido, por lo que no intentamos analizarlo
        return result.text();
      })
      .then(() => {
        commit('deleteJugadores', numeroCamiseta);
        // Después de eliminar el producto, vuelve a cargar los jugadores actualizados
        dispatch('fetchJugadores');
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        throw error; // Propaga el error para manejarlo en el componente si es necesario
      });
    },
    addJugadores({ commit }, jugador) {
      fetch('https://localhost:7123/Jugador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jugador),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no se completó correctamente');
          }
          commit('addJugadores', jugador); // Agrega el jugador en el frontend sin esperar el ID del servidor
        })

        .catch(error => {
          console.error('Error al agregar el jugador:', error);
          alert('Ya existe jugador con ese numero de camiseta.');
        });
    },
    
    updateProductos({ dispatch }, Producto) {
      return fetch(`https://localhost:7123/Producto/${Producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Producto),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Check if response is not empty before trying to parse JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // If the response is not JSON or empty, return an empty object
          return {};
        }
      })
      .then(() => {
        // Después de actualizar, vuelve a obtener los productos actualizados
        return dispatch('fetchProductos');
      })
      .catch(error => {
        console.error('Error updating producto:', error);
        throw error; // Rethrow the error for the component to handle
      });
    }
,    
    fetchCarnetSocios({ commit }) {
      console.log('Fetching CarnetSocios...');
      fetch('https://localhost:7123/CarnetSocio')
        .then(result => result.json())
        .then(data => commit('setCarnetSocios', data))
        .catch(error => {
          console.error('Error fetching carnet socios:', error);
        });
    },
    fetchCarnetSociosEmail({ commit }, { email }) {
      console.log('Fetching CarnetSocios by email...');
      fetch(`https://localhost:7123/CarnetSocio/ByEmail?email=${email}`)
        .then(result => result.json())
        .then(data => commit('setCarnetSocios', data))
        .catch(error => {
          console.error('Error fetching carnet socios by email:', error);
        });
    },
    
   /* addCarnetSocios({ commit }, carnetSocioAñadidos) {
      fetch('https://localhost:7123/CarnetSocio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carnetSocioAñadidos),
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            commit('addCarnetSocios', data);
            const carrito = { id: data.id };
            commit('addCarritos', carrito);
          } else {
            console.error('Error: La respuesta del servidor no contiene un ID válido:', data);
          }
        })
        .catch(error => {
          console.error('Error al agregar el carnet de socio:', error);
        });
    },*/
    fetchCarritos({ commit }) {
      console.log('Fetching Carrito...');
      fetch('https://localhost:7123/Carrito')
        .then(result => result.json())
        .then(data => commit('setCarritos', data))
        .catch(error => {
          console.error('Error fetching Carrito:', error);
        });
    },
    fetchClientes({ commit }) {
      console.log('Fetching Clientes...');
      return fetch(`https://localhost:7123/Cliente`)
        .then(result => {
          if (!result.ok) {
            throw new Error('Error fetching clientes');
          }
          return result.json();
        })
        .then(data => {
          console.log('Clientes fetched:', data);
          commit('setClientes', data); // Asume que la API devuelve una lista de clientes
        })
        .catch(error => {
          console.error('Error fetching Clientes:', error);
        });
    },
    fetchClientesId({ commit }, clienteId) {
      console.log('Fetching Carritos...');
      fetch(`https://localhost:7123/Carrito/ByClienteId/${clienteId}`)
        .then(result => result.json())
        .then(data => {
          console.log('Carritos fetched:', data);
          commit('setCarritos', data);
        })
        .catch(error => {
          console.error('Error fetching Carritos:', error);
        });
    },
    
    updateCarnetSocio({ commit }, CarnetSocio) {
      fetch(`https://localhost:7123/CarnetSocio/${CarnetSocio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CarnetSocio),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Check if response is not empty before trying to parse JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          } else {
            // If the response is not JSON or empty, return an empty object
            return {};
          }
        })
        .then(data => {
          // Actualiza el usuario en el estado con los nuevos datos
          commit('setCarnetSocios', data);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          throw error; // Rethrow the error for the component to handle
        });
    },
    deleteCarnetSocio({ commit, dispatch }, id) {
      fetch(`https://localhost:7123/CarnetSocio/${id}`, { // Concatena el id al final de la URL base
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
        .then(result => {
          if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
          }
    
          // La solicitud DELETE puede no devolver un cuerpo JSON válido, por lo que no intentamos analizarlo
          return result.text();
        })
        .then(() => {
          commit('deleteCarnetSocio', id);
          // Después de eliminar la orden, vuelve a cargar las órdenes actualizadas
          dispatch('fetchCarnetSocios');
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
    
    
    },
    /*
    addCarritos({ commit }, { productoIds, email, password  }) {
      console.log('Agregando carrito con productos:', productoIds);
      return fetch(`https://localhost:7123/Carrito?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoIds)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al procesar la solicitud.');
      })
      .then(data => {
        console.log('Respuesta de la API:', data);
        commit('addCarritos', data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
    },
    verificarCredenciales({ state }, { email, password  }) {
      console.log('Verificando credenciales:', email, password );
      console.log('Clientes actuales:', state.Clientes);
      const cliente = state.Clientes.find(cliente => cliente.email === email && cliente.password  === password ); // Verificar si el cliente con el correo electrónico y la password  proporcionados existe
      console.log('Cliente encontrado:', cliente);
      return Promise.resolve(!!cliente);
    },
    */
    
    addClientes({ commit }, clienteAñadido) {
      return new Promise((resolve, reject) => {
        fetch('https://localhost:7123/Cliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteAñadido),
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Ya estas registrado con este correo');
        }).then(data => {
          commit('addClientes', data);
          resolve(data); // Resolver la promesa con los datos agregados
        })
        .catch(error => {
          console.error('Ya estas registrado con este correo:', error);
          reject(error); // Rechazar la promesa con el error
        });
      });
    },
    addProductos({ commit }, productoAñadido) {
      fetch('https://localhost:7123/Producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoAñadido),
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al procesar la solicitud.');
      }).then(data => {
        commit('addProductos', data);
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });
    },
    addPartidos({ commit }, partidoAñadido) {
      fetch('https://localhost:7123/Partidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partidoAñadido),
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al procesar la solicitud.');
      }).then(data => {
        commit('addPartidos', data);
      })
      .catch(error => {
        console.error('Error al agregar el partido:', error);
      });
    },
    fetchJugadores({ commit }) {
      console.log('Fetching Jugadores...');
      fetch('https://localhost:7123/Jugador')
        .then(result => result.json())
        .then(data => commit('setJugadores', data))
        .catch(error => {
          console.error('Error fetching Carrito:', error);
        });
    },
    fetchPartidos({ commit }) {
      console.log('Fetching Partidos...');
      fetch('https://localhost:7123/Partidos')
        .then(result => result.json())
        .then(data => commit('setPartidos', data))
        .catch(error => {
          console.error('Error fetching productos:', error);
        });
    },
    updatePartidos({ dispatch }, partido) {
      return fetch(`https://localhost:7123/Partidos/${partido.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partido),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Si la respuesta es 204 No Content, no intentar convertir a JSON
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then(data => {
        // Si data es null, la respuesta fue 204 No Content
        if (data === null) {
          console.log('Partido actualizado exitosamente');
        } else {
          console.log('Partido actualizado con respuesta:', data);
        }
        dispatch('fetchJugadores');
      })
      .catch(error => {
        console.error('Error updating partido:', error);
        throw error;
      });
    },
    
    updatePartidoOnly ({ dispatch }, partido) {
      return fetch(`https://localhost:7123/Partidos/${partido.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partido),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Si la respuesta es 204 No Content, no intentar convertir a JSON
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then(data => {
        // Si data es null, la respuesta fue 204 No Content
        if (data === null) {
          console.log('Partido actualizado exitosamente');
        } else {
          console.log('Partido actualizado con respuesta:', data);
        }
        dispatch('fetchPartidos'); // Dispatch para refrescar la lista de partidos si es necesario
      })
      .catch(error => {
        console.error('Error updating partido:', error);
        throw error;
      });
    },
    
    updateJugadores({ dispatch }, { id, jugadores }) {
      return fetch(`https://localhost:7123/Partidos/${id}/jugadores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jugadores),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Si la respuesta es 204 No Content, no intentar convertir a JSON
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then(data => {
        // Si data es null, la respuesta fue 204 No Content
        if (data === null) {
          console.log('Jugadores actualizados exitosamente');
        } else {
          console.log('Jugadores actualizados con respuesta:', data);
        }
        dispatch('fetchJugadores', id); // Dispatch para refrescar la lista de jugadores del partido si es necesario
      })
      .catch(error => {
        console.error('Error updating jugadores:', error);
        throw error;
      });
    },


    updateJugadoresComponent({ dispatch }, { id, jugador }) {
      return fetch(`https://localhost:7123/Jugador/${jugador.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jugador),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Si la respuesta es 204 No Content, no intentar convertir a JSON
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then(data => {
        // Si data es null, la respuesta fue 204 No Content
        if (data === null) {
          console.log('Jugadores actualizados exitosamente');
        } else {
          console.log('Jugadores actualizados con respuesta:', data);
        }
        dispatch('fetchJugadores', id); // Dispatch para refrescar la lista de jugadores del partido si es necesario
      })
      .catch(error => {
        console.error('Error updating jugadores:', error);
        throw error;
      });
    }
    
    
  
    // otras acciones
  

  },
  modules: {
    // Define tus módulos aquí si los necesitas
  },
});

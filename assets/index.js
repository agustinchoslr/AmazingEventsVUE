
//crea una instancia de Vue
const { createApp } = Vue
createApp({
data() {
return {
  // datos:{},
  dataEvents:[],
  checked:[],
  categorias:[],
  eventosFiltrados:[],
  buscador:"",
  eventCheck:[]

}
}, 
created(){
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response=>response.json())
  .then(datos=> { 
    this.dataEvents=datos.events
  this.categorias=[... new Set(this.dataEvents.map(event=>event.category))]})
  .catch(error=>console.error("flaco, fijate este error: " + error.message))

},
computed:{
  filtroCheck(){
    
    // Si NO hay checks seleccionados,
    // se muestran todos los eventos.
    if (this.checked.length == 0) {
      this.eventCheck = this.dataEvents;
    } else {
      // Si hay checkbox seleccionadas,
      // se filtran los eventos de las categorías seleccionadas.
      this.eventCheck = this.dataEvents.filter(evento => {
        return this.checked.includes(evento.category);
      });
    }
    if (this.buscador == "") {
      this.eventosFiltrados = this.eventCheck;
    } else {
      // Si se escribe en el search,
      // filtra eventos que contienen lo buscado, con trim lowercase etc.
      this.eventosFiltrados = this.eventCheck.filter(evento => {
        return evento.name.toLowerCase().search(this.buscador.toLowerCase().trim()) != -1;
      });
    }
    
    // Se devuelve la lista final de eventos filtrados.
    // return this.eventosFiltrados;

    // this.eventosFiltrados= this.buscador==""?this.eventCheck: this.eventCheck.filter(event=>event.name.toLowerCase().search(this.buscador.toLowerCase().trim())!=-1) 
  }
}
//inicializa la instancia de Vue
}).mount('#app')




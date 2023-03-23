const { createApp } = Vue
createApp({
data() {
return {
  datos:{},
  dataEvents:[],
  checked:[],
  categorias:[],
  eventosFiltrados:[],
  buscador:"",
  eventPast: [],
  eventCheck:[]

}
}, 
created(){
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response=>response.json())
  .then(datos=> { 
    this.datos = datos;
    this.dataEvents=datos.events;
    console.table(this.datos)

    this.eventPast = this.dataEvents.filter(evento => Date.parse(evento.date) < Date.parse(this.datos.currentDate))
    console.log(this.eventPast)

    this.categorias=[... new Set(this.dataEvents.map(event=>event.category))]})
  .catch(error=>console.error("flaco, fijate este error: " + error.message))

},
computed:{
  filtroCheck(){
    
    // Si NO hay checks seleccionados,
    // se muestran todos los eventos.
    if (this.checked.length == 0) {
      this.eventCheck = this.eventPast;
    } else {
      // Si hay checkbox seleccionadas,
      // se filtran los eventos de las categorías seleccionadas.
        this.eventCheck = this.eventPast.filter(evento => 
          this.checked.includes(evento.category));
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




















// fetch('https://mindhub-xj03.onrender.com/api/amazing').then( response => response.json()).then(data => {
//   console.log(data.events)

// // - Capturando elemntos del DOM e insertando HTML con bucle (Fragment)

// let contenedor = document.getElementById('cards-container');
// let fragment = document.createDocumentFragment()
// const fechaReferencia = new Date(data.currentDate)
// // URL SEARCH PARAMS

// const id = new URLSearchParams(location.search).get("id")
// //fin url search params

// // console.log(data.events);
// // console.log(fechaReferencia);

// mostrarPastEvents();

// function mostrarPastEvents() {
//   for (let evento of data.events) {
//     if (fechaReferencia > Date.parse(evento.date)) {
//       let firstDiv = document.createElement('div')
//       firstDiv.classList.add('m-1')
//       firstDiv.innerHTML = `
//      <div class="card" style="width: 15rem;">
//        <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
//        <div class="card-body">
//          <div class="text-center">
//            <h5 class="card-title">${evento.name}</h5>
//            <p class="card-text">${evento.description}</p>
//          </div>
//          <div class="d-flex justify-content-end mt-4">
//            <a href="./details.html" class="btn btn-primary justify-content-end">Details</a>
//          </div>
//        </div>
//      </div>
//      </div>
//    `;
//       fragment.appendChild(firstDiv)
//     }
//   }


//   contenedor.appendChild(fragment)
// }



// // console.log(data.events);

// //aprendiendo método new Set y Array.from (autodidácticamente)
// const categorias = Array.from(new Set(data.events.map(iterador => iterador.category)));

// // // HACIENDOLO CON 2 VARIABLES. UNA PARA CREAR EL ARRAY FILTRANDO CON UN IF:*****************
// // let catSinFiltrar = [data.events.map(iterador => iterador.category)];
// // const catFiltradas = [];
// // // console.log(catSinFiltrar);

// // for (let categoria of catSinFiltrar) {
// //   // console.log(categoria);
// //   if (!catFiltradas.includes(categoria)) {
// //     catFiltradas.push(categoria)
// //   }
// // }; 

// // console.log(catFiltradas);
// // //NO ENTIENDO POR QUÉ NO FILTRA************************


// // FRAGMENT PARA CREAR LOS CHECKBOXES DE CATEGORÍAS //
// let fragmentForCategories = document.createDocumentFragment();
// const categoryChecks = document.querySelector("#category-checks");

// categorias.forEach((categoria) => {
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.classList.add("form-check-input");
//   checkbox.id = `${categoria}`;
//   const label = document.createElement("label");
//   label.classList.add("form-check-label");
//   label.htmlFor = `${categoria}`;
//   label.textContent = categoria;

//   const div = document.createElement("div");
//   div.classList.add("form-check", "form-check-inline");
//   div.appendChild(checkbox);
//   div.appendChild(label);

//   fragmentForCategories.appendChild(div);
// });

// categoryChecks.appendChild(fragmentForCategories);

// //**********************capturando checkboxs *********************************** */

// const checkboxCapturados = document.querySelectorAll('input[type=checkbox]')
// // console. log(checkboxCapturados);
// checkboxCapturados.forEach(checkbox => { checkbox.addEventListener('change', categoriasFiltradas) });

// function categoriasFiltradas() {
//   const inputsChequeados = Array.from(checkboxCapturados).filter(checkbox => checkbox.checked).map(function (checkbox) {
//     return checkbox.id;
//   });

//   const eventosFiltrados = data.events.filter(evento => inputsChequeados.includes(evento.category))
//   console.log(eventosFiltrados);

//   // function filterArrayByArray(arrayString, arrayObject){
//   //   return arrayString.length === 0 ? arrayObject : arrayObject.filter(elemento => arrayString.includes(elemento.category))
//   // }

//   // MOSTRANDO CONTENIDO A PARTIR DEL FILTRO DE CHECKBOX CAPTURADO***

//   if (eventosFiltrados.length === 0) {
//     const cardsContainer = document.getElementById("cards-container");
//     cardsContainer.innerHTML = "";
//     console.log("No hay filtros seleccionados en los checkboxes");
//     mostrarPastEvents();
//   } else {

//     const cardsContainer = document.getElementById("cards-container");
//     cardsContainer.innerHTML = "";

//     eventosFiltrados.forEach(function (evento) {
//       if (fechaReferencia > Date.parse(evento.date)) {
//         const cardDiv = document.createElement("div");
//         cardDiv.classList.add("m-1");
//         cardDiv.innerHTML = `
//           <div class="card" style="width: 15rem;">
//             <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
//             <div class="card-body">
//               <div class="text-center">
//                 <h5 class="card-title">${evento.name}</h5>
//                 <p class="card-text">${evento.description}</p>
//               </div>
//               <div class="d-flex justify-content-end mt-4">
//                 <a href="./details.html?id=${evento._id}" class="btn btn-primary justify-content-end">Details</a>
//               </div>
//             </div>
//           </div>
//         `;
//         cardsContainer.appendChild(cardDiv);
//       }
//     });
//   }
// }
// //**********************capturando el BUSCADOR - buscador PROPIAMENTE DICHO *********************************** */


// const searchInput = document.getElementById("search-input");

// searchInput.addEventListener("input", function () {
//   const searchText = searchInput.value.trim();

//   const eventosFiltrados = data.events.filter(function (event) {
//     return event.name.toLowerCase().includes(searchText.toLowerCase());

//   });

//   actualizarCardsHtml(eventosFiltrados);


// });




// //**********************PARA CREAR CARDS A PARTIR DEL BUSCADOR *********************************** */


// function crearCardHtml(evento) {
//   return `
//     <div class="m-1">
//       <div class="card" style="width: 15rem;">
//         <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
//         <div class="card-body">
//           <div class="text-center">
//             <h5 class="card-title">${evento.name}</h5>
//             <p class="card-text">${evento.description}</p>
//           </div>
//           <div class="d-flex justify-content-end mt-4">
//             <a href="./details.html?id=${evento._id}" class="btn btn-primary justify-content-end">Details</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
// }



// function actualizarCardsHtml(eventosFiltrados) {
//   const cardsContainer = document.getElementById("cards-container");
//   cardsContainer.innerHTML = "";

//   eventosFiltrados.forEach(function (evento) {
//     if (fechaReferencia > Date.parse(evento.date)) {
//       const cardHtml = crearCardHtml(evento);
//       cardsContainer.innerHTML += cardHtml;
    
// }
// });
// }
// });

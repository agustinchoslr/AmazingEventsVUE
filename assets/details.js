const id = new URLSearchParams(location.search).get("id")
fetch('https://mindhub-xj03.onrender.com/api/amazing').then( response => response.json()).then(data => {
  console.log(data.events)
const detalle = data.events.find(elemento => elemento._id == id)
// console.log(detalle)

let contenedorDetalles = document.getElementById('actualizable');
let fragmentDetalles = document.createDocumentFragment();

if (id < data.events.length && id > 0) {
createCard(detalle)
} else {
    alert("Te pasaron mal el link; volvé a buscar entre los eventos el deseado")
    window.location.href ='./'
}

function createCard(detalle) {
  let div = document.createElement('div')
  div.classList.add('row');
  div.classList.add('g-0');

  div.innerHTML = `
  <div class="col-md-4">
  <img src=${detalle.image} class="img-fluid rounded-start border m-2" alt=${detalle.name}>
</div>
<div class="col-md-8">
  <div class="card-body border m-2 overflow-y-scroll card-max-heigth">
    <h5 class="card-title">${detalle.name}</h5>
    <span class="card-text">${detalle.description}</span>

    <p class="card-text"><small class="text-muted">Event Date: ${detalle.date} <br>category: ${detalle.category} <br>price: ${detalle.price} <br>place: ${detalle.place} <br>capacity: ${detalle.capacity}
        <br>assitance: ${detalle.assistance}</small></p>
  </div>
</div>
</div>
`
  fragmentDetalles.appendChild(div)
}
contenedorDetalles.appendChild(fragmentDetalles);

});


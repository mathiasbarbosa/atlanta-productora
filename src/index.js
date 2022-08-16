



const generarInterfaz = (arr) => {
  let galery = document.querySelector("#galery")
  arr.map( el => {
    galery.innerHTML += `
                        <div class="item-galery" style="background-image:url(${el.frame})";>
                        <a class="item-description" href="${el.link}" target="_blank">
                          <div>
                            <p class="titulo">${el.titulo}</p>
                            <p class="realizacion">${el.realizacion}</p>
                            <p class="fecha">${el.anio}</p>
                          </div>
                        </a>
                      </div>
                      `
  })
}

fetch('./src/listaTrabajos.json')
  .then(response => response.json())
  .then(data => {
    generarInterfaz(data)
  })

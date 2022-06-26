



const generarInterfaz = (arr) => {
  let galery = document.querySelector("#galery")
  arr.map( el => {
    galery.innerHTML += `
                        <div class="item-galery" style="background-image:url(${el.frame})";>
                        <a class="item-description" href="${el.link}">
                          <div>
                            <p>${el.titulo}</p>
                            <p>${el.realizacion}</p>
                            <p>${el.anio}</p>
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
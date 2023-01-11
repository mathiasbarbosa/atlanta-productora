



const generarInterfaz = (arr) => {
  let galery = document.querySelector("#galery")
  arr.map( el => {
    galery.innerHTML += `
                        <div class="item-galery"  data-aos="zoom-in-up"  data-aos-delay="250" style="background-image:url(${el.frame})"; > 
                          <div class="item-container">
                            <a class="item-description" href="${el.link}" target="_blank">
                              <div>
                                <p class="titulo">${el.titulo}</p>
                                <p class="realizacion">${el.realizacion}</p>
                                <p class="fecha">${el.anio}</p>
                              </div>
                            </a>
                            <video src="${el.gif}" class="item-gif"  autoplay loop muted></video>
                          </div>
                      </div>
                      `
  })
}


fetch('./src/listaTrabajos.json')
  .then(response => response.json())
  .then(data => {
    generarInterfaz(data)
  })

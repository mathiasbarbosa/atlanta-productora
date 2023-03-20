
const btnChangeColor = document.querySelector('#changeColor')
const logoHome = document.querySelector('#logoHome')
const iconHome = document.querySelector('#iconHome')

const generarInterfaz = (arr) => {
  let galery = document.querySelector("#galery")
  arr.map( el => {
    galery.innerHTML += `
                        <div class="item-galery"  data-aos="zoom-in-up"  data-aos-delay="100" style="background-image:url(${el.frame})"; > 
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




 document.addEventListener('DOMContentLoaded', () => {


  fetch('./src/listaTrabajos.json')
  .then(response => response.json())
  .then(data => {
    generarInterfaz(data)
  })

  btnChangeColor.addEventListener('click', () => {
    let root = document.querySelector(':root');
    let currentColor = getComputedStyle(root).getPropertyValue('--primary-color');
   
    if (currentColor.trim() == "#000000") {
      // root.style.setProperty('--primary-color', '#010664');
      root.style.setProperty('--primary-color', '#010436');
      root.style.setProperty('--secondary-color', '#01054b');
      logoHome.src = './media/logoblanyAzul.svg'
      iconHome.src = './media/logoblanyAzul.svg'
    } else {
      root.style.setProperty('--primary-color', '#000000');
      root.style.setProperty('--secondary-color', '#202020');
      logoHome.src = './media/logonegroyblanc.svg'
      iconHome.src = './media/logoNavnegroyBlanc.png'
    }
  })

 })
const tabs = document.querySelectorAll('.nav-link');
const navCheck = document.querySelector('.nav__checkbox')
const navMobile = document.querySelector('#navMobile')
const header = document.querySelector('#header')
const referenceShowNav = document.querySelector('#referenceShowNav')
let viewport = window.visualViewport.width

const generarInterfaz = (arr) => {
  let galery = document.querySelector("#galery-videos")
  let fragment = document.createDocumentFragment()
  arr.map(el => {
    let div = document.createElement('div')
    div.classList.add('item-galery')
    div.style.backgroundImage = `url(${el.frame})`
    div.setAttribute('data-aos', 'zoom-in-up')

    let video = window.innerWidth > 500 ? `<video src="${el.gif}" class="item-gif" loading="lazy" autoplay loop muted/> ` : ''
    let badge = el.proximamente ? '<span class="badge text-bg-light position-absolute" style="top: 10px; left: 10px; z-index:50; padding: 6px">PRÓXIMAMENTE</span>' : ''
    div.innerHTML += `
                          ${badge}
                          <div class="item-container">
                          <a class="item-description" href="${el.link}" target=${el.proximamente ? '' : '_blank'}>
                              <div>
                                <p class="titulo">${el.titulo}</p>
                                <p class="realizacion">${el.realizacion}</p>
                                <p class="fecha">${el.anio}</p>
                              </div>
                            </a>
                            ${video}
                          </div>
                      `
    fragment.append(div)
  })

  galery.append(fragment)
}

const generarInterfazPubli = (arr) => {
  const containerGalery = document.querySelector('#galery-publicidad')
  let fragment = document.createDocumentFragment()

  arr.map((item, i) => {

    let containerPubli = document.createElement('div')
    containerPubli.classList.add('galery-publicidad-item')
    containerPubli.setAttribute("data-aos", "zoom-in-up")
    containerPubli.setAttribute("data-aos-delay", 250)


    let carouselSlide = document.createElement('div')
    carouselSlide.classList.add('carousel', 'slide')
    carouselSlide.id = `carousel_slide_${i}`

    let carouselIndicators = document.createElement('div')
    carouselIndicators.classList.add('carousel-indicators')
    let carouselInner = document.createElement('div')
    carouselInner.id = `carousel_inner_${i}`
    carouselInner.classList.add('carousel-inner')

    let count = 0;
    // crea cada uno de los items del carousel
    for (const itemPubliMulti of item.multimedia) {
      let button = document.createElement('button')
      button.setAttribute('data-bs-target', `#${carouselSlide.id}`)
      button.setAttribute('data-bs-slide-to', count)
      button.setAttribute('aria-label', `Slide ${count}`)
      carouselIndicators.append(button)

      let carouselItem = document.createElement('div')
      carouselItem.classList.add('carousel-item')
      if (!itemPubliMulti.includes('webm')) {
        let img = document.createElement('img')
        img.classList.add('d-block', 'w-100', 'carousel-item-imagen')
        img.setAttribute('src', itemPubliMulti)
        carouselItem.append(img)
      } else {
        carouselItem.innerHTML += `<video src="${itemPubliMulti}" class="carousel-item-imagen d-block"  autoplay loop muted  width="430px"></video>`

      }

      let carouselCaption = document.createElement('div')
      carouselCaption.classList.add("carousel-caption", "d-none", "d-md-block")
      let h5 = document.createElement('h5')
      let p = document.createElement('p')


      carouselCaption.append(h5)
      carouselCaption.append(p)
      carouselItem.append(carouselCaption)
      carouselInner.append(carouselItem)

      count++
    }


    carouselInner.children[0].children[1].children[0].textContent = item.trabajosP
    carouselInner.children[0].children[1].children[1].textContent = item.descripcion

    carouselInner.children[0].classList.add('active')
    carouselIndicators.children[0].classList.add('active')
    carouselIndicators.children[0].setAttribute('aria-current', true)


    carouselSlide.append(carouselIndicators)
    carouselSlide.append(carouselInner)
    containerPubli.append(carouselSlide)

    let buttonPrev = document.createElement('button')
    buttonPrev.classList.add('carousel-control-prev')
    buttonPrev.setAttribute('data-bs-target', `#${carouselSlide.id}`)
    buttonPrev.setAttribute('data-bs-slide', `prev`)
    let spanPrev = document.createElement('span')
    spanPrev.classList.add('carousel-control-prev-icon')
    spanPrev.setAttribute('aria-hidden', 'true')
    let spanPrevious = document.createElement('span')
    spanPrevious.classList.add('visually-hidden')
    spanPrevious.textContent = 'Previous'

    buttonPrev.append(spanPrev)
    buttonPrev.append(spanPrevious)
    carouselSlide.append(buttonPrev)

    let buttonNext = document.createElement('button')
    buttonNext.classList.add('carousel-control-next')
    buttonNext.setAttribute('data-bs-target', `#${carouselSlide.id}`)
    buttonNext.setAttribute('data-bs-slide', `next`)
    let spanNext = document.createElement('span')
    spanNext.classList.add('carousel-control-next-icon')
    spanNext.setAttribute('aria-hidden', 'true')
    let spanNextText = document.createElement('span')
    spanNextText.classList.add('visually-hidden')
    spanNextText.textContent = 'Next'

    buttonNext.append(spanNext)
    buttonNext.append(spanNextText)
    carouselSlide.append(buttonNext)

    fragment.append(containerPubli)
  })
  containerGalery.append(fragment)
}

// const showWsp = () => {
//   let scrollPosition = window.scrollY

//   let referencePosition = referenceShowWsp.offsetTop - 570
//   console.log(referencePosition);

//   // let showPosition = referencePosition + referenceShowWsp.offsetHeight
//   // console.log(showPosition);

//   if(scrollPosition >= referencePosition){
//     wspIcon.classList.remove('hidden')
//   }else{
//     wspIcon.classList.add('hidden')
//   }
// }

const showNav = () => {
  let scrollPosition = window.scrollY

  let referencePosition = referenceShowNav.offsetTop

  let showPosition = referencePosition + referenceShowNav.offsetHeight


  if (scrollPosition >= showPosition) {
    header.classList.remove('hidden')
    // header.style.display = 'none'
  } else {
    header.classList.add('hidden')
    // header.style.display = 'flex'
  }
}

if (viewport >= 1000) {
  header.classList.add('hidden')
  window.addEventListener('scroll', showNav)
}

document.addEventListener('DOMContentLoaded', () => {


  fetch('./src/listaTrabajos.json')
    .then(response => response.json())
    .then(data => {
      generarInterfaz(data)
    })


  fetch('./src/publicidadTrabajos.json')
    .then(result => result.json())
    .then(data => generarInterfazPubli(data))

  // tabs.forEach(tab => {
  //   tab.addEventListener('click', (e) => {
  //     e.preventDefault();

  //     // Hide all tabs
  //     const tabContents = document.querySelectorAll('.tab-pane');
  //     tabContents.forEach(content => {
  //       content.classList.remove('active', 'show');
  //       content.classList.add('d-none')
  //     });

  //     // Show selected tab
  //     const target = e.target.id 
  //     const selectedTab = document.querySelector(`[aria-labelledby=${target}]`);
  //     selectedTab.classList.remove('d-none');
  //     selectedTab.classList.add('active', 'show');

  //   });
  // });

  navCheck.addEventListener('change', () => {
    if (navCheck.checked) {
      navMobile.style.display = 'flex'
    } else {
      navMobile.style.display = 'none'
    }
  })


})
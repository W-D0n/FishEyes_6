// export default class Lightbox {
//   static activate () {
//     document.body.insertAdjacentHTML('beforeend', `
//           <div class="lightbox" id="lightbox" style="display: none;">
//               <div class="lightbox__inner">
//                   <button type="button" class="lightbox__close">
//                       &times;
//                   </button>
//                   <div class="lightbox__content"></div>
//               </div>
//           </div>
//       `)

//     const lightBox = document.querySelector('#lightbox')
//     const btnClose = lightBox.querySelector('.lightbox__close')
//     const content = lightBox.querySelector('.lightbox__content')
//     const closeLightbox = () => {
//       lightBox.style.display = 'none'
//       content.innerHTML = ''
//     }

//     lightBox.addEventListener('mousedown', e => {
//       if (e.target.matches('#lightbox')) {
//         closeLightbox()
//       }
//     })

//     btnClose.addEventListener('click', () => {
//       closeLightbox()
//     })
//   }

//   static show (htmlOrElement) {
//     const content = document.querySelector('#lightbox .lightbox__content')

//     document.querySelector('#lightbox').style.display = null

//     if (typeof htmlOrElement === 'string') {
//       content.innerHTML = htmlOrElement
//     } else {
//       content.innerHTML = ''
//       content.appendChild(htmlOrElement)
//     }
//   }
// }

/**
 * @property {HTMLElement} element
 */
export default class NewLightbox {
  static init () {
    const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
      .forEach(link => link.addEventListener('click', e => {
        e.preventDefault()
        NewLightbox(e.currentTarget.getAttribute('href'))
      }))
  }

  /**
 * @param {string} url de l'image
 */
  constructor (url) {
    // const main = document.getElementById('#main-content')
    this.element = this.buildDom(url)
    this.loadImg(url)
    this.onKeyUp = this.onKeyUp.bind(this)
    document.body.appendChild(this.element)
    document.addEventListener('keyup', this.onKeyUp)
    // main.insertAdjacentHTML('beforeend', element)
  }

  /**
 * @param {string} url de l'image
 */
  loadImg (url) {
    const image = new Image()
    const container = this.element.querySelector('.lightbox__container')
    const loader = document.createElement('div')
    loader.classList.add('lightbox__loader')
    container.appendChild(loader)
    image.onload = function () {
      container.removeChild(loader)
      container.appendChild(image)
    }
    image.src = url
  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    }
  }

  /**
   * Close lightbox
   * @param {MouseEvent} e
   */
  close (e) {
    e.preventDefault()
    this.element.classList.add('fadeout')
    window.setTimeout(() => {
      this.element.remove()
    }, 500)
  }

  /**
 * @param {string} url de l'image
 * @returns {HTMLElement}
 */
  buildDom (url) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `
      <button class="lightbox__close">Fermer</button>
      <button class="lightbox__next">Suivant</button>
      <button class="lightbox__prev">Précédent</button>
      <div class="lightbox__container"></div>
    `
    dom.querySelector('lightbox__close').addEventListener('click', this.close.bind(this))
    return dom
  }
}
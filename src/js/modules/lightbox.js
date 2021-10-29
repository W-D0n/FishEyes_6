import { getMediaList } from './photographers.js'

getMediaList().then(mediaList => { Lightbox.init(mediaList) })

/**
 * @property {HTMLElement} element
 * @property {string[]} images lightbox's images path
 * @property {string} url currently displayed content
 */
export default class Lightbox {
  static init (mediaList) {
    const links = Array.from(document.getElementsByClassName('media__content'))
    const gallery = links.map(link => link.getAttribute('src'))

    links.forEach(link => link.addEventListener('click', e => {
      e.preventDefault()
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute('src'), gallery, mediaList)
    }))
  }

  /**
   * @param {string} url content's URL
   * @param {string} gallery array of src
   * @param {string[]} images lightbox's images path
   */
  constructor (src, srcList, mediaData) {
    this.data = mediaData
    this.srcList = srcList
    this.src = src
    this.element = this.buildDom(src)
    this.currentIndex = srcList.indexOf(src)
    document.body.appendChild(this.element)

    this.render(src)
    // this.title = this.getTitle(this.src, mediaData)
    this.getTitle(this.src, mediaData)
    // this.alt = this.getAlt(this.src, mediaData)
    // console.log('current alt : ', this.getAlt(this.src, mediaData))

    this.onKeyUp = this.onKeyUp.bind(this)
    document.addEventListener('keyup', this.onKeyUp)
  }

  getTitle (src, data) {
    const currentSrc = src.split('/').pop()
    const currentObj = data.filter(el => el.content === currentSrc)
    console.log('currentObj : ', currentObj)
    const { alt, content } = currentObj
    console.log('alt : ', alt)
    console.log('content : ', content)
  }

  getAlt (src, data) {
    data.forEach(el => {
      if (src === el.content) {
        console.log('Alt : ', el.alt)
        return el.alt
      } else {
        console.log('No Alt')
      }
    })
  }

  /**
   * Keyboard integration
   * @param {KeyboardEvent} e
   */
  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    }
    if (e.key === 'ArrowLeft') {
      this.prev(e)
    }
    if (e.key === 'ArrowRight') {
      this.next(e)
    }
  }

  /**
   * Close lightbox with a fade effect after waiting 500ms
   * @param {MouseEvent|KeyboardEvent} e
   */
  close (e) {
    e.preventDefault()
    this.element.classList.add('fadeOut')
    window.setTimeout(() => {
      this.element.remove()
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  /**
   * Previous / Next media
   * @param {MouseEvent|KeyboardEvent} e
   */
  next (e) {
    e.preventDefault()
    this.currentIndex++
    if (this.currentIndex === this.srcList.length) {
      this.currentIndex = 0
    }
    this.render(this.srcList[this.currentIndex], this.title, this.alt)
  }

  prev (e) {
    e.preventDefault()
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.srcList.length - 1
    }
    this.render(this.srcList[this.currentIndex], this.title, this.alt)
  }

  /**
   *
   * @param {string} url
   * @returns {HTMLElement} dom
   */
  buildDom (src) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close" aria-label="Close lightbox">Fermer</button>
    <button class="lightbox__next">Suivant</button>
    <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container" id="lightbox"></div>`
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
    return dom
  }

  render (src) {
    this.extension = src.split('.').pop()

    const container = document.getElementById('lightbox')
    container.innerHTML = ''
    if (this.extension === 'mp4') {
      container.insertAdjacentHTML('afterbegin',
      `<figure>
        <video class="lightbox__content" alt="" autoplay controls loop muted>
            <source src="${src}" type="video/mp4">
            <p></p>
        </video>
      </figure>
        `)
    } else {
      container.insertAdjacentHTML('afterbegin',
        `<figure> 
          <img class="lightbox__content" alt="" src="${src}"></img>
          <figcaption></figcaption>
        </figure>
        `)
    }
  }
}
// exéc fonction anonyme immédiatement
// permet d'utiliser l'async/await (il faut être dans une fonction pour pouvoir utiliser l'asyncro) : (()=>{})()
// (async () => {
//   const mediaList = await getMediaList()
//   Lightbox.init()
// })()
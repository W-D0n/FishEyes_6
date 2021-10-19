class Photographer {
  constructor (data) {
    this.name = data.name
    this.id = data.id
    this.city = data.city
    this.country = data.country
    this.tags = data.tags
    this.tagline = data.tagline
    this.price = data.price
    this.portrait = data.portrait
  }
}
class Media {
  constructor (data) {
    this.mediaId = data.mediaId
    this.photographerId = data.photographerId
    this.title = data.title
    this.content = data.content
    this.tags = data.tags
    this.likes = data.likes
    this.date = data.date
    this.price = data.price
  }
}

class Lightbox {
  constructor (medias, htmlSelector) {
    this.medias = medias
    this.container = htmlSelector
  }

  init () {
    this.buildDOM(this.container)
  }

  show () {

  }

  close () {
    console.log('close')
  }

  next () {
    console.log('next')
  }

  prev () {
    console.log('prev')
  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    } else if (e.key === 'ArrowLeft') {
      this.prev(e)
    } else if (e.key === 'ArrowRight') {
      this.next(e)
    }
  }

  buildDOM (parent) {
    const dom = document.getElementById('lightbox')
    dom.innerHTML = `
      <button class="lightbox__close">Fermer</button>
      <button class="lightbox__next">Suivant</button>
      <button class="lightbox__prev">Précédent</button>
      <ul class="lightbox__container"></ul>
      `
    dom.querySelector('.lightbox__close').addEventListener('click', this.close)
    dom.querySelector('.lightbox__next').addEventListener('click', this.next)
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev)
    return dom
  }
}

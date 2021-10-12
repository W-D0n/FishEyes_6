import { fnGetData, fnCreatePhotographer, fnCreateGallery, fnCreateFilter } from './functions.js'
import Lightbox from './lightbox'

const apiUrl = '/src/assets/data/FishEyeData.json'

fnGetData(apiUrl).then((data) => {
  // 1 : Create photographer's card

  // Getting id from URL
  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  // Getting html context
  const main = document.getElementById('main-content')

  // Creating photographers profil
  const { photographers, media } = data
  photographers.forEach(photographers => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographers

    if (id === urlId) {
      fnCreatePhotographer(name, id, city, country, tags, tagline, price, portrait)
    }
  })
  // 2 : Create filter
  // Creating html context for the gallery
  const filterContainer = document.createElement('div')
  main.appendChild(filterContainer)
  filterContainer.setAttribute('class', 'custom-select')
  fnCreateFilter(filterContainer)

  // 3 : Create gallery

  // Creating html context for the gallery
  const galleryContainer = document.createElement('div')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')

  // Creating gallery with each image/video
  media.forEach(media => {
    const { mediaId, photographerId, title, content, tags, likes, date, price } = media
    if (photographerId === urlId) {
      // console.log('Image: ' + content)
      fnCreateGallery(mediaId, photographerId, title, content, tags, likes, date, price)
    }
  })
})
Lightbox.activate()
import { fnGetData, fnCreateProfil, fnCreateGallery } from './functions.js'

const apiUrl = '/src/assets/data/FishEyeData.json'

fnGetData(apiUrl).then((data) => {
  // Getting id from URL
  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  // console.log(urlId)

  const { photographers, media } = data
  photographers.forEach(photographers => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographers
    // console.log(id)

    if (id === urlId) {
      // console.log('GOOD')
      fnCreateProfil(name, id, city, country, tags, tagline, price, portrait)
    }
  })
  // Setting html context for the gallery
  const main = document.getElementById('main-content')
  const galleryContainer = document.createElement('div')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')

  media.forEach(media => {
    const { mediaId, photographerId, title, content, tags, likes, date, price } = media
    // console.log(photographerId)
    if (photographerId === urlId) {
      // console.log('GOOD')
      // console.log(media)
      // console.log(mediaId)
      console.log('Image: ' + content)
      fnCreateGallery(mediaId, photographerId, title, content, tags, likes, date, price)
    }
  })
})
import { getData, createProfil, createGallery } from './functions.js'

const apiUrl = '/src/assets/data/FishEyeData.json'

// getData(apiUrl)
//   .then((data) => {
//     // const imgPath = '../src/assets/'
//     const photographers = data.photographers
//     const media = data.media
//     // const htmlParent =
//     // const { name, city, country, tags, tagline, price, portrait } = photographers
//     // cardCreation(htmlParent, name, city, country, tags, tagline, price, portrait)
//     // const { mediaId, photographerId, title, image, tags, likes, date, price } = media
//   })
getData(apiUrl).then((data) => {
  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  console.log(urlId)

  const { photographers, media } = data
  photographers.forEach(photographers => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographers
    console.log(id)
    if (id === urlId) {
      console.log('GOOD')
      createProfil(name, id, city, country, tags, tagline, price, portrait)
    }
  })
  const main = document.getElementById('main-content')
  const galleryContainer = document.createElement('div')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')
  media.forEach(media => {
    const { mediaId, photographerId, title, image, tags, likes, date, price } = media
    console.log(photographerId)
    if (photographerId === urlId) {
      console.log('GOOD')
      createGallery(mediaId, photographerId, title, image, tags, likes, date, price)
    }
  })
})
/* eslint-disable no-unused-vars */
import { getData, createPhotographer, createGallery, createFilter, addContactBtn, sortMedias, stickyBottomInfo } from './functions.js'
import Lightbox from './lightbox.js'
import Modal from './modal.js'

export async function getMediaList () {
  const apiUrl = '/src/assets/data/FishEyeData.json'
  const data = await getData(apiUrl)

  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  let currentPhotographer = ''
  let currentPrice = ''
  const mediaList = []
  const main = document.getElementById('main-content')

  const { photographers, medias } = data
  photographers.forEach(photographer => {
    const { id } = photographer

    if (id === urlId) {
      createPhotographer(photographer)
      currentPhotographer = photographer.name
      currentPrice = photographer.price
    }
  })
  // Add contact cta button
  addContactBtn()
  const filterContainer = document.createElement('nav')
  main.appendChild(filterContainer)
  filterContainer.setAttribute('class', 'navbar-select')
  createFilter(filterContainer)

  const galleryContainer = document.createElement('ul')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')

  // Fill mediaList array with photographer's ID media
  medias.forEach(element => {
    if (element.photographerId === urlId) {
      createGallery(element)
      mediaList.push(element)
    }
  })

  // Sorted medias
  const sortBtn = document.querySelectorAll('.select-list')

  // Usefull to use .value param in sortMedias fct
  const selected = document.querySelector('.select-list')
  const ctnr = document.querySelector('.gallery__container')

  sortBtn.forEach(btn => btn.addEventListener('change', e => {
    e.preventDefault()
    ctnr.innerHTML = ''
    // Sort list of media by the input button's selected
    const sortedList = sortMedias(selected.value, mediaList)
    sortedList.forEach(element => {
      createGallery(element)
    })
    Lightbox.init(sortedList)
  }))

  // Sum of likes for this photographer
  let numberOfLikes = mediaList.reduce((sum, object) => sum + object.likes, 0)
  // Stiky bottom info
  stickyBottomInfo(numberOfLikes, currentPrice)
  
  // Create Modal
  const contactCta = document.querySelector('#cta-contact')
  contactCta.addEventListener('click', e => {
    // eslint-disable-next-line no-new
    new Modal(currentPhotographer)
  })
  // Add/remove like
  const legend = document.querySelectorAll('.legend__likes')
  let isLiked = false

  legend.forEach(btn => btn.addEventListener('click', e => {
    let currentLikes = parseInt(btn.querySelector('.likes__counter').textContent)
    if (isLiked === false) {
    currentLikes += 1
    numberOfLikes += 1
      isLiked = true
      btn.querySelector('.likes__counter').textContent = currentLikes
    } else if (isLiked === true) {
      currentLikes -= 1
      numberOfLikes -= 1
      isLiked = false
      btn.querySelector('.likes__counter').textContent = currentLikes
    }
    // Stiky bottom info
    stickyBottomInfo(numberOfLikes, currentPrice)
  }))

  return mediaList
}


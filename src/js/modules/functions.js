const main = document.getElementById('main-content')

// Setting up of the homepage's grid for cards
const cardGridDiv = document.createElement('div')
cardGridDiv.setAttribute('class', 'card__grid')
cardGridDiv.setAttribute('id', 'cardGrid')
main.appendChild(cardGridDiv)

// request data from API, test response and return data
export const getData = async (url) => {
  try {
    const res = await fetch(url)
    const profilData = res.json()

    return profilData
  } catch (error) {
    console.error(error.status)
  }
}
// Creation of front page's cards presenting photographers
export async function createHomePage ({ name, id, city, country, tags, tagline, price, portrait }) {
  const profilDiv = document.createElement('a')
  profilDiv.setAttribute('class', 'profil__container link')
  profilDiv.setAttribute('href', `pages/photographer.html?id=${id}&name=${name}`)
  cardGridDiv.appendChild(profilDiv)

  insertHtml(profilDiv, name, id, city, country, tags, tagline, price, portrait)

  // Adding price field
  const desc = document.getElementById(`info_${id}`)
  const descPrice = document.createElement('p')
  descPrice.setAttribute('class', 'description__price')
  desc.appendChild(descPrice)
  descPrice.innerHTML = `${price}<span>€</span>/jour`

  createTagList({ tags, id })
}
// Creation of photographer's presentation
export async function createPhotographer ({ name, id, city, country, tags, tagline, price, portrait }) {
  main.removeChild(cardGridDiv)
  const photographContainer = document.createElement('div')
  photographContainer.setAttribute('class', 'photograph__container')
  main.appendChild(photographContainer)

  insertHtml(photographContainer, name, id, city, country, tags, tagline, price, portrait)
  toggleClassNames(id) // To remove align center class
  createTagList({ tags, id })
  // ctaContact(photographContainer)
}
// Creation of photographer's gallery
export async function createGallery ({ photographerId, title, content, likes, alt }) {
  const galleryContainer = document.getElementById('galleryContainer')
  const mediaContainer = document.createElement('li')

  mediaContainer.setAttribute('class', 'media__container')
  galleryContainer.appendChild(mediaContainer)
  const label = getExtension(content)
  mediaContainer.innerHTML = `
    <${label} class="media__content" src="/src/assets/media/${photographerId}/${content}"  alt="${alt}" title="${title}" /></${label}>
    <div class="legend">
      <h4>${title}</h4>
      <button class="legend__likes" aria-label="add a like to current number of ${likes}">
        <span class="likes__counter">${likes}</span>
        <span class="fas fa-heart likes__icon"></span>
      </button>
    </div>
`
}
// Global html insert in home/photographers pages
const insertHtml = (parentHtml, name, id, city, country, tags, tagline, price, portrait) => {
  parentHtml.innerHTML = `
  <div class="profil__img__container" id="profil__img__container">
    <img src="/src/assets/media/Photographers_ID/${portrait}" alt="Photographer's portrait" class="img__profil" />
  </div>
  <div class="profil__description" id="profil_${id}">    
    <h2 class="profil__name al-c" id="name_${id}">${name}</h2>
    <div class="profil__info al-c" id="info_${id}">
      <h3 class="location al-c" id="location_${id}">${country}, <span>${city}</span></h3>
      <p class="description__text al-c" id="txt_${id}">${tagline}</p>
    </div>
    <u class="profil__tag-list" id="tagList_${id}"></u>
  </div>
`
}
export function addContactBtn () {
  const ctnr = document.querySelector('.photograph__container')
  const contactBtn = document.createElement('button')
  contactBtn.setAttribute('class', 'cta-contact cta-btn')
  contactBtn.setAttribute('id', 'cta-contact')
  contactBtn.innerText = 'Contactez-moi'
  ctnr.appendChild(contactBtn)
}
// Creation of tags list of each photographers
const createTagList = ({ tags, id }) => {
  const newTagList = document.getElementById(`tagList_${id}`)

  tags.forEach(tag => {
    const newTagItem = document.createElement('li')
    newTagItem.classList.add('tag-item')
    newTagItem.setAttribute('aria-label', `tag ${tag}`)
    newTagList.appendChild(newTagItem)
    newTagItem.innerHTML = '# ' + `${tag}`
  })
}
// Get the file extension for insert it in gallery insertion
export function getExtension (filePath) {
  let label = ''
  const fileExtension = filePath.split('.').pop()
  fileExtension === 'mp4' ? label = 'video' : label = 'img'
  return label
}
// Toggle between classnames for css display
const toggleClassNames = (id) => {
  document.getElementById('profil__img__container').classList.toggle('mobile_view')
  document.getElementById(`profil_${id}`).classList.toggle('profil__description')
  document.getElementById(`profil_${id}`).classList.toggle('photogr__view')
  document.getElementById(`name_${id}`).classList.toggle('al-c')
  document.getElementById(`name_${id}`).classList.toggle('photogr-name__view')
  document.getElementById(`info_${id}`).classList.toggle('al-c')
  document.getElementById(`info_${id}`).classList.toggle('photogr-info__view')
  document.getElementById(`location_${id}`).classList.toggle('al-c')
  document.getElementById(`location_${id}`).classList.toggle('photogr-location__view')
  document.getElementById(`txt_${id}`).classList.toggle('al-c')
  document.getElementById(`txt_${id}`).classList.toggle('photogr-txt__view')
}
// Insertion of filter button
export async function createFilter (htmlContext) {
  htmlContext.innerHTML = `
  <p class="select_text"> Trier par </p>
  <div class="custom-select cta-btn">
    <select role="listbox" class="select-list" aria-label="sorting options list">
      <option role="option" class="select-opt cta-btn" value="like" selected>Popularité</option>
      <option role="option" class="select-opt cta-btn" value="date">Date</option>
      <option role="option" class="select-opt cta-btn" value="title">Titre</option>
    </select>
  </div>
  `
}
// Just for testing
export function sortMedias (value, medias) {
  switch (value) {
    case 'like':
      return medias.sort(byLike)
    case 'date':
      return medias.sort(byDate)
    case 'title':
      return medias.sort(byTitle)
    default : return medias.sort(byTitle)
  }
}
// byTitle, byDate, byLike : Custom sort functions
function byTitle (a, b) {
  // alphabetically by name
  if (a.title > b.title) {
    return 1
  } else if (b.title > a.title) {
    return -1
  } else {
    return 0
  }
}
function byDate (a, b) {
  const d1 = new Date(a.date)
  const d2 = new Date(b.date)
  return d2 - d1
}
function byLike (a, b) {
  return parseInt(b.likes) - parseInt(a.likes)
}

// Scroll event
const obsTarget = document.querySelector('.page__header')
const btn = document.querySelector('.scroll-to-top')
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio < 0.3) {
      btn.classList.remove('btn-fadeOut')
    } else {
      btn.classList.add('btn-fadeOut')
    }
  })
}, { threshold: 0.3 })
observer.observe(obsTarget)

export function stickyBottomInfo (nbLikes, price) {
  const photogrInfo = document.createElement('button')
  photogrInfo.setAttribute('class', 'cta-info cta-btn')
  main.appendChild(photogrInfo)
  photogrInfo.innerHTML = `
  <p>${nbLikes}<span class="fas fa-heart likes__icon"></span></p>
  <p>${price} € / jour</p>
  `
}
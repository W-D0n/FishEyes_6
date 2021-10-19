const main = document.getElementById('main-content')

// Setting up of the homepage's grid for cards
const cardGridDiv = document.createElement('div')
cardGridDiv.setAttribute('class', 'card__grid')
cardGridDiv.setAttribute('id', 'cardGrid')
main.appendChild(cardGridDiv)

// request data from API, test response and return data
export const fnGetData = async (url) => {
  try {
    const res = await fetch(url)
    const profilData = res.json()

    return profilData
  } catch (error) {
    console.error(error.status)
  }
}
// Creation of front page's cards presenting photographers
export async function fnCreateHomePage (name, id, city, country, tags, tagline, price, portrait) {
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

  createTagList(tags, id)
}
// Creation of photographer's presentation
export async function fnCreatePhotographer (name, id, city, country, tags, tagline, price, portrait) {
  main.removeChild(cardGridDiv)
  const photographContainer = document.createElement('div')
  photographContainer.setAttribute('class', 'photograph__container')
  main.appendChild(photographContainer)

  insertHtml(photographContainer, name, id, city, country, tags, tagline, price, portrait)
  toggleClassNames(id) // To remove align center class
  createTagList(tags, id)
  // ctaContact(photographContainer)
}
// Creation of photographer's gallery
export async function fnCreateGallery (mediaId, photographerId, title, content, tags, likes, date, price) {
  const galleryContainer = document.getElementById('galleryContainer')
  const mediaContainer = document.createElement('div')
  mediaContainer.setAttribute('class', 'media__container')
  galleryContainer.appendChild(mediaContainer)

  const label = fnGetExtension(content)
  // à l'origine <a href="/src/assets/media/${photographerId}/${content}">
  mediaContainer.innerHTML = `
  <a href="/src/assets/media/${photographerId}/${content}" class="media__links">
    <${label} class="media__content" src="/src/assets/media/${photographerId}/${content}"  alt="Content named : ${title}" />
  </a>
    <div class="legend">
      <h4>${title}</h4>
      <button class="legend__likes">
        <span class="likes__counter">${likes}</span>
        <span class="fas fa-heart likes__icon"></span>
      </button>
    </div>
`
}
// Global html insert in home/photographers pages
const insertHtml = (parentHtml, name, id, city, country, tags, tagline, price, portrait) => {
  parentHtml.innerHTML = `
  <div class="profil__img__container">
    <img src="/src/assets/media/Photographers_ID/${portrait}" alt="Photographer's portrait" class="img__profil" />
  </div>
  <div class="profil__description" id="profil_${id}">
    <button class="cta-contact" id="cta-contact">Contactez-moi</button>
    <h2 class="profil__name al-c" id="name_${id}">${name}</h2>
    <div class="profil__info al-c" id="info_${id}">
      <h3 class="location al-c" id="location_${id}">${country}, <span>${city}</span></h3>
      <p class="description__text al-c" id="txt_${id}">${tagline}</p>
    </div>
    <u class="profil__tag-list" id="tagList_${id}"></u>
  </div>
`
}
const createTagList = (tags, id) => {
  // Creation of tags list of each photographers
  const newTagList = document.getElementById(`tagList_${id}`)

  tags.forEach(tag => {
    const newTagItem = document.createElement('li')
    newTagItem.classList.add('tag-item')
    newTagList.appendChild(newTagItem)
    newTagItem.innerHTML = '# ' + `${tag}`
  })
}
// Get the file extension for insert it in gallery insertion
function fnGetExtension (filePath) {
  let label = ''
  const fileExtension = filePath.split('.').pop()
  fileExtension === 'mp4' ? label = 'video' : label = 'img'
  return label
}
// Toggle between classnames for css display
const toggleClassNames = (id) => {
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
export async function fnCreateFilter (htmlContext) {
  htmlContext.innerHTML = `
  <p class="select_text"> Trier par </p>
  <ul class="select">
    <li>
      <input class="select_close" type="radio" name="customselect" id="customselect-close" value="" />
      <span class="select_label select_label-placeholder">Popularité</span>
    </li>
    <li class="select_items">
      <input class="select_expand" type="radio" name="customselect" id="customselect-opener" />
      <label class="select_closeLabel" for="customselect-close"></label>

      <ul class="select_options">
        <li class="select_option">
          <input class="select_input" type="radio" name="customselect" id="customselect-date" />
          <label class="select_label" for="customselect-date"><span class="border-top">Date</span></label>
        </li>
        <li class="select_option">
          <input class="select_input" type="radio" name="customselect" id="customselect-titre" />
          <label class="select_label" for="customselect-titre"><span class="border-top">Titre</span></label>
        </li>
      </ul>

      <label class="select_expandLabel" for="customselect-opener"></label>
    </li>
  </ul>
  `
}
// remove form from display
export async function removeForm (form) {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden')
    setTimeout(function () {
      form.classList.remove('visuallyhidden')
    }, 200)
  } else {
    form.classList.add('visuallyhidden')
    form.addEventListener('transitionend', function (e) {
      form.classList.add('hidden')
    },
    {
      capture: false,
      once: true,
      passive: false
    })
  }
  form.reset()
}
// Just for testing
export function fnConsole () {
  console.log('Test OK')
}
// export async function getHtmlElements (media, arr) {
//   // console.log(media)
//   // console.log(arr)
//   for (const target of arr) {
//     target.addEventListener('click', e => {
//       e.preventDefault()
//       console.log(e.target.src)
//     })
//   }
// }
// export async function createLightboxMedias (mediaList, HTMLparent) {
//   HTMLparent = document.getElementsById('lightbox__container')
//     const newLi = document.createElement("li");
//   if (!tags sélectionné ===  media.tags) {
//     afficher tous les medias
//     newLi.innerHTML = `<img src="${media.src}">`;
//     newLi.onclick = () => {lightbox.show(index);};
//     mediasList.appendChild(li);
//   } else {
//     afficher medias avec media.tags === tags sélectionné
//   }
// }
//
// IL FAUT FAIRE UN TRI SUR : LIKES OR DATE PAR TITRE
// utiliser sort() sur un array
// if la checkbox de l'input est sélectionné alors checked = true
// if true sort() array sur la propriété like(number)/date(object date)/titre(ordre alpha)
// push le résultat dans un array pour l'afficher
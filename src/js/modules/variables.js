/************Modèle de card HTML********************
<div class="profil__container">
  <div class="profil__img__container">
    <img class="img__profil" src="./src/assets/img/Photographers_ID/NabeelBradford.jpg" alt="Profil image"  />
  </div>
  <h2 class="profil__name">Mimi Keel</h2>
  <div class="profil__description">
    <h3 class="location">London, <span>UK</span></h3>
    <p class="description__text">voir le beau</p>
    <p class="desription__price">400 <span id="currency">€</span>/jour</p>
  </div>
  <ul class="profil__tag-list">
    <li class="profil__tag-item">#portrait</li>
    <li class="profil__tag-item">#events</li>
    <li class="profil__tag-item">#travel</li>
  </ul>
</div> */

/************Version longue des appendchild***************
export async function createProfil() {
  //var btn = document.createElement("BUTTON");
  //btn.innerHTML = "CLICK ME";
  //document.body.appendChild(btn);
  
  // Grid 
  const cardGridDiv = document.createElement('div')
  cardGridDiv.setAttribute('class', 'card__grid')
  cardGridDiv.setAttribute('id', 'cardGrid')
  main.appendChild(cardGridDiv)

  // Card profil container
  const gridContainer = document.getElementById('cardGrid')
  const profilDiv = document.createElement('div')
  profilDiv.setAttribute('class', 'profil__container')
  profilDiv.setAttribute('id', 'profilContainer')
  gridContainer.appendChild(profilDiv)

  const profilContainer = document.getElementById('profilContainer')
  
  // image container 
  const img_Div = document.createElement('div')
  img_Div.setAttribute('class', 'profil__img__container')
  img_Div.setAttribute('id', 'imgContainer')
  profilContainer.appendChild(img_Div)
  
  const ImgContainer = document.getElementById('imgContainer')
  // img 
  const img = document.createElement('img')
  img.setAttribute('class', 'img__profil')
  img.setAttribute('id', 'img__profil')
  img.setAttribute('src', imgPath)
  img_Div.appendChild(img)

  // name 
  const profilName = document.createElement('h2')
  profilName.setAttribute('class', 'profil__name')
  profilName.setAttribute('id', 'profilName')
  profilContainer.appendChild(profilName)

  // Desc container 
  const DescriptionContainer = document.getElementById('descContainer')
  const Desc_Div = document.createElement('div')
  Desc_Div.setAttribute('class', 'profil__description')
  Desc_Div.setAttribute('id', 'descContainer')
  profilContainer.appendChild(Desc_Div)

    // location 
    const location = document.createElement('h3')
    location.setAttribute('class', 'location')
    location.setAttribute('id', 'location')
    Desc_Div.appendChild(location)

    // desc text 
    const descriptionText = document.createElement('p')  
    descriptionText.setAttribute('class', 'description__text')
    descriptionText.setAttribute('id', 'descText')
    Desc_Div.appendChild(descriptionText)

    // desc price 
    const desriptionPrice = document.createElement('p')
    desriptionPrice.setAttribute('class', 'desription__price')
    desriptionPrice.setAttribute('id', 'desrPrice')
    Desc_Div.appendChild(desriptionPrice)

  // TagList   
  const profilTagList = document.createElement('ul')
  profilTagList.setAttribute('class', 'profil__tag-list')
  profilTagList.setAttribute('id', 'tagList')
  profilContainer.appendChild(profilTagList)

    // Tag items 
    const tagList = document.getElementById('tagList')
    const profilTagItem = document.createElement('li')
    profilTagItem.setAttribute('class', 'profil__tag-item')
    profilTagItem.setAttribute('id', 'tagItem')
    tagList.appendChild(profilTagItem)
    
    */
import { getData, createHomePage } from './functions.js'

const apiUrl = '/src/assets/data/FishEyeData.json'
// const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json'

getData(apiUrl)
  .then((data) => {
    // Display each photographer profil's
    const { photographers } = data
    photographers.forEach(el => {
      createHomePage(el)
    })
    return data
  })
  .then((data) => {
    const tagList = [...new Set(data.photographers.map(p => p.tags ?? []).flat())]

    const navTagList = document.getElementById('tag__list')
    tagList.forEach(tag => {
      const newNavTagItem = document.createElement('li')
      newNavTagItem.setAttribute('class', 'tag-item')
      navTagList.appendChild(newNavTagItem)
      newNavTagItem.innerHTML = `#${tag}`

      // Sorting photographer profil's by tags
      newNavTagItem.addEventListener('click', e => {
        const ctnr = document.querySelector('.card__grid')
        ctnr.innerHTML = ''

        const { photographers } = data
        photographers.forEach(el => {
          const { tags } = el
          const currentTagIsInclude = tags.includes(tag)
          if (currentTagIsInclude) {
            createHomePage(el)
          }
        })
      })
    })
  })
  .catch((err) => {
    console.log(err)
  })
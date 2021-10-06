import { getData, createProfil } from './functions.js'

const apiUrl = './src/assets/data/FishEyeData.json'
// const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json'

getData(apiUrl)
  .then((data) => {
    const { photographers } = data
    photographers.forEach(el => {
      const { name, city, country, tags, tagline, price, portrait } = el
      createProfil(name, city, country, tags, tagline, price, portrait)
    })
    return data
  })
  .then((data) => {
    // const tagList = []
    // get a list of tag from tags arrays in photographers arrays
    // const tags = data.photographers.flatMap(({ tags = [] }) => tags)
    // tags.forEach(tag => {
    //   //  include only one occurence of tag items
    //   if (!tagList.includes(tag)) {
    //     tagList.push(tag)
    //   }
    // })
    const tagList = [...new Set(data.photographers.map(p => p.tags ?? []).flat())]

    const navTagList = document.getElementById('tag__list')
    tagList.forEach(tag => {
      const newNavTagItem = document.createElement('li')
      newNavTagItem.setAttribute('class', 'tag-item')
      navTagList.appendChild(newNavTagItem)
      newNavTagItem.innerHTML = `#${tag}`
    })
  })
  .catch((err) => {
    console.log(err)
  })

// const mediaData = data.media
// mediaData.forEach(el => {
//   console.log(el.id)
// })

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
    this.type = this.typeOfMedia()
  }

  typeOfContent (url) {
    let type = ''
    const fileExtension = url.split('.').pop()
    fileExtension === 'mp4' ? type = 'video' : type = 'img'
    console.log(type)
    return type
  }
}

import imgWebpack from './assets/images/gaixinh-1.jpg'

function createImgElement() {
  const imgElement = document.createElement('img')
  imgElement.src = imgWebpack
  imgElement.alt = 'gaixinh-1'
  return imgElement
}

document.getElementById('root').appendChild(createImgElement())
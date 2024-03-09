// const $ = require('jquery')

// $('h1').css('background', 'purple')

// const bootstrap = require('bootstrap')
// import 'materialize-css'

// import Carousel from 'bootstrap/js/dist/carousel'


// var myCarousel = document.querySelector('#myCarousel')
// var carousel = new Carousel(myCarousel, {
//     interval: 2000,
//     ride: true
// })


// $(document).ready(function () {
//     $('.carousel').carousel()
// })

import imgWebpack from '~/assets/images/webpack_image.png'

function createImgElement() {
  const imgElement = document.createElement('img')
  imgElement.src = imgWebpack
  imgElement.alt = 'webpack 5 with odooer'
  return imgElement
}

document.getElementById('root').appendChild(createImgElement())
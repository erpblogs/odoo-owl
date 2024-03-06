// const $ = require('jquery')

// $('h1').css('background', 'purple')

// const bootstrap = require('bootstrap')
import Carousel from 'bootstrap/js/dist/carousel'

var myCarousel = document.querySelector('#myCarousel')
var carousel = new Carousel(myCarousel, {
  interval: 1000,
  ride: true
})

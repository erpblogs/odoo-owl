// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


// // You can also import JavaScript plugins individually as needed to keep bundle sizes down:

// import Alert from 'bootstrap/js/dist/alert'

// // or, specify which plugins you need:
// import { Tooltip, Toast, Popover } from 'bootstrap'


import { __info__ } from "@odoo/owl";
// import { Root } from "@components/Home/";
import { mount }from "@odoo/owl";



// mount(Root, document.getElementById('root'));
console.log('Hello Odoo Owl!', __info__.version)

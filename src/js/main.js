import { mount } from "@odoo/owl";
import { Root } from "./root.js"

// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'



// mount(Root, document.getElementById('root'));
// console.log('Hello Odoo Owl!', __info__.version)
mount(Root, document.body);
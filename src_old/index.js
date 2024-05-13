import '~/assets/css/style.css'
import '~/assets/scss/style.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { __info__ } from "@odoo/owl";
import { Root } from "@components/Home/";
import { mount }from "@odoo/owl";



mount(Root, document.getElementById('root'));
console.log('Hello Odoo Owl!', __info__.version)

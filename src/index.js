import '~/assets/css/style.css'
import '~/assets/scss/style.scss'

import 'bootstrap'

import { __info__ } from "@odoo/owl";
import { Root } from "@components/Home/";
import { mount }from "@odoo/owl";



mount(Root, document.getElementById('root'));
console.log('Hello Odoo Owl!', __info__.version)

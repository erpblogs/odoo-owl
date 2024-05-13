import { __info__ } from "@odoo/owl";
// import { Root } from "@components/Home/";
import {Component, xml, mount }from "@odoo/owl";


export class Root extends Component {
  static template = xml`<div class="container">Hello Owl</div>`;
}

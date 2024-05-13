// // // src/components/Root.js -------------------------------------------------------

import { Component, xml, mount } from "@odoo/owl";

import '@components/layouts/Header/style.scss'


class Menu extends Component {
    static template = xml`
   
    `;
}


// Owl Components
export class Header extends Component {
    static template = xml`
        <Menu />
    `;

    static components = { Menu };


    tasks = [
        {
            id: 1,
            text: "buy milk",
            isCompleted: true,
        },
        {
            id: 2,
            text: "clean house",
            isCompleted: false,
        },
    ];
}
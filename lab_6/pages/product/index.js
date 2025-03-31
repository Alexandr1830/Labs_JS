import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getLogosHTML() {
        return `
            <div id="logo-container1">
                <img src="./logo/logo1.png" alt="Логотип" class="logo1">
            </div>
        `;
    }

    renderData(item) {
        const product = new ProductComponent(document.getElementById("product-container"));
        product.render(item);
    }

    getHTML() {
        return `
            ${this.getLogosHTML()}
            <div id="product-page" class="product-page product-page-${this.id}">
                <div id="product-container"></div> 
                <div id="back-button-container"></div>
            </div>
        `;
    }

    async getData() {
        try {
            const data = await ajax.get(urls.getStock(this.id));
            console.log("[ProductPage] Загруженные данные:", data);
            return data;
        } catch (error) {
            console.error("[ProductPage] Ошибка при получении данных:", error);
            return null;
        }
    }

    async render() {
        console.log(`[ProductPage] Открывается ProductPage для id: ${this.id}`);

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(document.getElementById("back-button-container"));
        backButton.render(this.clickBack.bind(this));

        const data = await this.getData();
        if (data) {
            const product = new ProductComponent(document.getElementById("product-container"));
            product.render(data);
        }
    }

    clickBack() {
        console.log("[ProductPage] Клик по кнопке 'Назад', возврат на MainPage");

        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
}
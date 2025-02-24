import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        return {
            id: this.id,
            src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
            title: `Акция ${this.id}`,
            text: "Такой акции вы еще не видели"
        };
    }

    getHTML() {
        return `
            <div id="product-page">
                <h2>Страница товара</h2>
                <div id="product-container"></div> 
                <div id="back-button-container"></div>
            </div>
        `;
    }

    clickBack() {
        console.log("[ProductPage] Клик по кнопке 'Назад', возврат на MainPage");

        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        console.log(`[ProductPage] Открывается ProductPage для id: ${this.id}`);

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(document.getElementById("back-button-container"));
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(document.getElementById("product-container"));
        product.render(data);
    }
}

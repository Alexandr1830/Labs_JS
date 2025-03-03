import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const imageUrls = {
            1: "https://api.mirror.bmstu.ru/upload/universal/99/65cdfa0ec0ccc.png",
            2: "https://api.mirror.bmstu.ru/upload/universal/98/65cdf9cc2d0c2.png",
            3: "https://api.mirror.bmstu.ru/upload/universal/96/65cdf92174131.png"
        };
    
        return {
            id: this.id,
            src: imageUrls[this.id],
            title: `Акция ${this.id}`,
            text: "Такой акции вы еще не видели"
        };
    }
    

    getHTML() {
        return `
            <div id="product-page">
                <h2 class="product-title">Страница товара</h2>
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

import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getContainerHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    getData() {
        return [
            { id: 1, src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", title: "Акция 1", text: "Такой акции вы еще не видели 1" },
            { id: 2, src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", title: "Акция 2", text: "Такой акции вы еще не видели 2" },
            { id: 3, src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", title: "Акция 3", text: "Такой акции вы еще не видели 3" }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log(`[MainPage] Кликнута карточка с id: ${cardId}, переход на ProductPage`);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        console.log("[MainPage] Рендер главной страницы");
        
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getContainerHTML());

        const container = this.pageRoot;

        this.getData().forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}

import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    async fetchData() {
        try {
            console.log("[MainPage] Запрос к API http://localhost:8000/stocks...");
            const response = await fetch('http://localhost:8000/stocks');

            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);

            const data = await response.json();
            console.log("[MainPage] Данные загружены:", data);
            return data;
        } catch (error) {
            console.error("[MainPage] Ошибка загрузки данных:", error);
            return [];
        }
    }

    clickCard(e) {
        const cardId = e.target.closest('.product-card')?.dataset.id;
        if (!cardId) return;
        console.log(`[MainPage] Кликнута карточка с id: ${cardId}, переход на ProductPage`);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    async render() {
        console.log("[MainPage] Рендер главной страницы");

        this.parent.innerHTML = `
            <div id="logo-container">
                <img src="./logo/logo1.png" alt="Логотип" class="logo">
            </div>
            <div id="main-content">
                <div id="main-page"></div>
            </div>
        `;

        const container = document.getElementById("main-page");
        const data = await this.fetchData();

        if (data.length === 0) {
            container.innerHTML = "<p>Нет доступных карточек.</p>";
            return;
        }

        data.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}

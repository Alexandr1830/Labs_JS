import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    async fetchData() {
        try {
            console.log(`[ProductPage] Запрос к API http://localhost:8000/stocks/${this.id}...`);
            const response = await fetch(`http://localhost:8000/stocks/${this.id}`);
    
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    
            const data = await response.json();
            console.log("[ProductPage] Данные загружены:", data);
            return data;
        } catch (error) {
            console.error("[ProductPage] Ошибка загрузки:", error);
            return {
                id: "0",
                text: "Нет данных",
                text1: "Нет данных",
                text2: "Нет данных",
                text3: "Нет данных",
                text4: "Нет данных",
                title1: "Товар не найден",
                src: "https://via.placeholder.com/150"
            };
        }
    }
    

    async render() {
        console.log(`[ProductPage] Открывается ProductPage для id: ${this.id}`);

        const data = await this.fetchData();

        this.parent.innerHTML = `
            <div id="logo-container1">
                <img src="./logo/logo1.png" alt="Логотип" class="logo1">
            </div>
            <div id="product-page">
                <div id="product-container"></div> 
                <button id="back-button">Назад</button>
            </div>
        `;

        document.getElementById("back-button").addEventListener("click", () => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        const product = new ProductComponent(document.getElementById("product-container"));
        product.render(data);
    }
}

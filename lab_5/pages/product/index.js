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

    getData() {
        ajax.get(urls.getStock(this.id), (data) => {
            this.renderData(data);
            console.log(data);
        })
    }

    /*getData() {
        const products = {
            "1": {
                src: "https://api.mirror.bmstu.ru/upload/universal/99/65cdfa0ec0ccc.png",
                text1: "Радиоэлектронные системы и комплексы",
                text2: "Электронные и оптико-электронные приборы и системы специального назначения",
                text3: "Робототехника военного и специального назначения",
                text4: "Боеприпасы и взрывалители",
                title: "Выскоотехнологические системы обеспечения безопасности, коммуникации и специального назначения",
            },
            "2": {
                src: "https://api.mirror.bmstu.ru/upload/universal/98/65cdf9cc2d0c2.png",
                text1: "Электроэнергетика и электротехника",
                text2: "Энергетическое машиностроение",
                text3: "Ядерные реакторы и материалы",
                text4: "Высокотехнологические плазменные и энергетические установки",
                title: "Энергетика и экология",
            },
            "3": {
                src: "https://api.mirror.bmstu.ru/upload/universal/96/65cdf92174131.png",
                text1: "Ракетные системы и космонавтика",
                text2: "Проектирование авиационных и ракетных двигателей",
                text3: "Навигационно-баллистическое обеспечение применения космической техники",
                text4: "Смсиемы управления летателльными аппаратами",
                title: "Авиация и космос",
            }
        };

        // Проверяем, передается ли корректный id
        console.log(`[ProductPage] Полученный id: ${this.id}`);

        if (!products[this.id]) {
            console.error(`[ProductPage] Ошибка: Товар с id=${this.id} не найден.`);
            return {
                id: "0",
                src: "default.jpg",
                title: "Товар не найден"
            };
        }

        return {
            id: this.id,
            src: products[this.id].src,
            title: products[this.id].title,
            text1: products[this.id].text1,
            text2: products[this.id].text2,
            text3: products[this.id].text3,
            text4: products[this.id].text4
        };
    }*/

   

    getHTML() {
        return `
            ${this.getLogosHTML()}
            <div id="product-page" class="product-page product-page-${this.id}">
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
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        const backButton = new BackButtonComponent(document.getElementById("back-button-container"))
        backButton.render(this.clickBack.bind(this))
        this.getData()

    }
}

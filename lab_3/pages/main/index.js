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
        return `<div id="main-page"></div>`;
    }
    
    getLogosHTML() {
        return `
            <div id="logos-container">
                <img src="./logo/logo1.png" alt="Логотип" class="logo">
            </div>
        `;
    }
    
    
    getContainerHTML() {
        return `
            ${this.getLogosHTML()} 
            <div id="main-page"></div>
        `;
    }
    

    getData() {
        return [
            { 
                id: 1, 
                src:"https://api.mirror.bmstu.ru/upload/universal/99/65cdfa0ec0ccc.png",
                title: "Выскоотехнологические системы обеспечения безопасности, коммуникации и специального назначения",
                text: "Подготовка специалистов для решения всех типов задач" 
            },
            { 
                id: 2, 
                src: "https://api.mirror.bmstu.ru/upload/universal/98/65cdf9cc2d0c2.png", 
                title: "Энергетика и экология", 
                text: "Подготовка инженеров в области энергомашиностроения и систем жизнеобеспечения" 
            },
            { 
                id: 3, 
                src: "https://api.mirror.bmstu.ru/upload/universal/96/65cdf92174131.png", 
                title: "Авиация и космос", 
                text: "Подготовка конструкторов космической и авиационной техники" 
            }
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

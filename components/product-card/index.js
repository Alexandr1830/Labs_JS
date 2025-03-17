export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCardHTML(data) {
        return `
            <div class="product-card" data-id="${data.id}">
                <img class="card-img-top" src="${data.src}" alt="Изображение">
                <div class="product-card-content">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Направление обучения</button>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        console.log(`[ProductCardComponent] Рендер карточки: ${data.title}`); // 🔍 Проверка
        const html = this.getCardHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }
}

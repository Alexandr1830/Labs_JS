export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCardHTML(data) {
        return `
            <div class="card custom-card">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const button = document.getElementById(`click-card-${data.id}`);
        if (button) {
            button.addEventListener("click", listener);
        }
    }

    render(data, listener) {
        const html = this.getCardHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
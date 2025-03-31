export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="product-container">
                <h2 class="product-title">${data.title}</h2> 
                <div class="product-content">
                    <img src="${data.src}" class="product-image" alt="Изображение товара">
                    <div class="product-texts">
                        <p class="text1">${data.text1}</p>
                        <p class="text2">${data.text2}</p>
                        <p class="text3">${data.text3}</p>
                        <p class="text4">${data.text4}</p>
                    </div>
                </div>
            </div>
        `;
    }
        
    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
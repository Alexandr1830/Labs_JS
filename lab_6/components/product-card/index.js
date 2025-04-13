import { ajax } from "../../modules/ajax.js";

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
                    <button class="btn btn-primary mb-2" id="click-card-${data.id}" data-id="${data.id}">
                        Направление обучения
                    </button>
                    <br>
                    <button class="btn btn-danger delete-card" data-id="${data.id}">
                        Удалить
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const cardElement = this.parent.querySelector(`.product-card[data-id="${data.id}"]`);
        if (!cardElement) return;

        const openBtn = cardElement.querySelector(`#click-card-${data.id}`);
        const deleteBtn = cardElement.querySelector(`.delete-card[data-id="${data.id}"]`);

        if (openBtn && typeof listener === "function") {
            openBtn.addEventListener("click", (e) => {
                listener(e, data);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
                try {
                    await ajax.delete(`http://localhost:8080/stocks/${data.id}`);
                    cardElement.remove();
                } catch (err) {
                    alert("Ошибка при удалении карточки: " + err.message);
                }
            });
        }
    }

    render(data, listener) {
        const html = this.getCardHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, listener);
    }

    static insertAddCardButton(targetContainer, listener) {
        const existing = document.getElementById("go-to-product-page");
        if (existing) return;

        const container = document.createElement("div");
        container.style.textAlign = "center";
        container.style.marginTop = "50px";
        container.innerHTML = `
        <button id="go-to-product-page" class="btn btn-primary mb-4">Добавить карточку</button>
        `;
        targetContainer.appendChild(container);

        document.getElementById("go-to-product-page").addEventListener("click", () => {
            const mainPage = document.getElementById("main-page");
            const productPage = document.getElementById("product-page");
            if (mainPage) mainPage.style.display = "none";
            if (productPage) productPage.style.display = "flex";
        });

        setTimeout(() => {
            const addBtn = document.getElementById("add-new-card");
            if (addBtn) {
                addBtn.addEventListener("click", () => {
                    const title = document.getElementById("new-title").value.trim();
                    const srcInput = document.getElementById("new-image").value.trim();
                    const text1 = document.getElementById("new-text1").value.trim();
                    const text2 = document.getElementById("new-text2").value.trim();
                    const text3 = document.getElementById("new-text3").value.trim();
                    const text4 = document.getElementById("new-text4").value.trim();
        
                    if (!title || !srcInput || !text1 || !text2 || !text3 || !text4) {
                        alert("Пожалуйста, заполните все поля");
                        return;
                    }
        
                    const newCardData = {
                        title,
                        src: srcInput,
                        text: text1,
                        text1,
                        text2,
                        text3,
                        text4
                    };
        
                    ajax.post("http://localhost:8080/stocks", newCardData)
                        .then((savedCard) => {
                            const mainPage = document.getElementById("main-page");
                            const productPage = document.getElementById("product-page");
        
                            const newCard = new ProductCardComponent(mainPage);
                            newCard.render(savedCard, listener);
        
                            // Очистка формы
                            document.getElementById("new-title").value = "";
                            document.getElementById("new-image").value = "";
                            document.getElementById("new-text1").value = "";
                            document.getElementById("new-text2").value = "";
                            document.getElementById("new-text3").value = "";
                            document.getElementById("new-text4").value = "";
        
                            productPage.style.display = "none";
                            mainPage.style.display = "flex";
                        })
                        .catch((error) => {
                            alert("Ошибка при сохранении карточки: " + error.message);
                        });
                });
            }
        }, 100);
    }
}

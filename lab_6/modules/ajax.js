class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            console.log("Ответ сервера:", text);

            const data = JSON.parse(text || "[]");
            return data;
        } catch (err) {
            console.error("Ошибка запроса или парсинга JSON:", err.message);
            return null;
        }
    }
}

export const ajax = new Ajax();

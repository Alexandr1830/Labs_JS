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

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const text = await response.text();
            console.log("Ответ сервера (POST):", text);

            const result = JSON.parse(text || "{}");
            return result;
        } catch (err) {
            console.error("Ошибка POST-запроса:", err.message);
            return null;
        }
    }
    
    async delete(url) {
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return await response.json();
    }
}

export const ajax = new Ajax();

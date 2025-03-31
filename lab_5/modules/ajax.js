class Ajax {
    get(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log("Ответ сервера:", xhr.response);
                try {
                    const data = JSON.parse(xhr.response || "[]");
                    
                    if (typeof callback === 'function') {
                        callback(data);
                    } else {
                        console.warn("callback не является функцией:", callback);
                    }
                } catch (err) {
                    console.error("Ошибка парсинга JSON:", err.message, xhr.response);
                }
            }
        };
    }
}

export const ajax = new Ajax();

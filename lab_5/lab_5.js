console.log("[lab_5.js] Запуск приложения");

import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();

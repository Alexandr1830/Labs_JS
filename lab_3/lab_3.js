console.log("[lab_3.js] Запуск приложения");

import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();

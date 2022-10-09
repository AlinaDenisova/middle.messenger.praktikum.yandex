import router from "./router";
import "./utils/helpers";
import "./static/styles/base.scss";
import {routes} from "./utils";

window.addEventListener('DOMContentLoaded', async () => {

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case "/":
        case routes.registration:
            isProtectedRoute = false;
            break;
    }

    try {
        router.start();

        if (!isProtectedRoute) {
            router.go(routes.selectChat)
        }
    } catch (e) {
        router.start();

        if (isProtectedRoute) {
            router.go("/");
        }
    }
})

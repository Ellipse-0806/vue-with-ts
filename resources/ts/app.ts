import { createApp } from "vue";
import router from "@/router/router";
import baseApp from "@/base/App.vue";

const app = createApp(baseApp);
app.use(router);
app.mount('#app');

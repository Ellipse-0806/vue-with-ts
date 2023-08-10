import { createApp } from 'vue';
import welcome from '@/example/welcome.vue';
import apiAccess from '@/example/apiAccess.vue';

const id: number = 1;
console.log(id);

// const app = createApp(welcome);
const app = createApp(apiAccess);
app.mount('#app');

import { createApp } from 'vue';
import welcome from '@/welcome.vue';

const id: number = 1;
console.log(id);

const app = createApp(welcome);
app.mount('#app');

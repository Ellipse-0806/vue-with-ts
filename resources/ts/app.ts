import { createApp } from 'vue';
import welcome from '@/welcome.vue';
import apiAccess from '@/apiAccess.vue';

const id: number = 1;
console.log(id);

// const app = createApp(welcome);
const app = createApp(apiAccess);
app.mount('#app');

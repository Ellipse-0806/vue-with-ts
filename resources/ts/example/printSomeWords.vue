<script setup lang="ts">
import { getSomeWords } from '@/example/getSomeWords';

const response = await getSomeWords({word: "Hi !"});
</script>
<template>
    <div class="hello">{{ response.word }}</div>
    <div>{{ response.comment }}</div>
</template>
<style>
.hello {
    color: red;
}
</style>

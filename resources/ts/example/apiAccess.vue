<script setup lang="ts">
import printSOmeWords from "@/example/printSomeWords.vue";

const someWords = printSOmeWords;
</script>
<template>
    <Suspense>
        <someWords></someWords>
        <template #fallback>
            Loading ...
        </template>
    </Suspense>
</template>
<style>
.hello {
    color: red;
}
</style>

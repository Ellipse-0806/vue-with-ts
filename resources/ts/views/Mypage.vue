<script setup lang="ts">
const message: string = "This component is mypage!";
</script>
<template>
    <div>{{ message }}</div>
    spa : <RouterLink :to="'/spa/home'">go to home !</RouterLink>
    <div>
        mpa : <a href="http://localhost/mpa/home">go to home !</a>
    </div>
</template>
<style>

</style>

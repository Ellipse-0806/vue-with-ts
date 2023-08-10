<script setup lang="ts">
const message: string = "This component is home!";
</script>
<template>
    <div>{{ message }}</div>
    spa : <RouterLink :to="'/spa/mypage'">go to mypage !</RouterLink>
    <div>
        mpa : <a href="http://localhost/mpa/mypage">go to mypage !</a>
    </div>
</template>
<style>

</style>

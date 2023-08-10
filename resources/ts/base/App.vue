<script setup lang="ts">
console.log('app')
</script>

<template>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <RouterView v-slot="{ Component, route }">
        <template v-if="Component">
            <Transition :duration="300" name="fade" mode="out-in">
                <Suspense timeout="0">
                    <template #default>
                        <div :key="route.path">
                            <component :is="Component"></component>
                        </div>
                    </template>
                    <template #fallback>Loading...</template>
                </Suspense>
            </Transition>
        </template>
    </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

<script setup>
import { RouterView } from 'vue-router'

import NavBar from './components/nav/NavBar.vue';
</script>

<template>
    <NavBar />

    <div class="content-background-wrapper">
        <div class="content-background"></div>
    </div>

    <div class="page-content-wrapper">
        <div class="page-content">
            <RouterView v-slot="{ Component, route }">
                  <component :is="Component" :key="route.path" />
            </RouterView>
        </div>
    </div>
</template>

<style lang="scss">
.content-background-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding: var(--nav-height) 17px;
    padding-bottom: 0;
    z-index: -1;

    .content-background {
        width: 100%;
        height: 100%;

        border-radius: 16px 16px 0 0;
        background-color: var(--background-2);
    }
}

.page-content-wrapper {
    height: 100%;
    padding: var(--nav-height) 17px;
    padding-bottom: 0;
    z-index: 1;

    .page-content {
        min-height: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        padding: 12px;
    }
}
</style>
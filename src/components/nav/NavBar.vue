<script setup>
import WikiLogo from '@/components/WikiLogo.vue';
</script>

<template>
    <nav>
        <div class="navbar">
            <WikiLogo size="small" />
        </div>
    </nav>
</template>

<style lang="scss">
nav {
    width: 100%;
    position: fixed;
    z-index: 800;
    top: 0;
    left: 0;

    background-color: var(--background-3);

    .navbar {
        width: var(--content-width);
        height: var(--nav-height);
        margin: 0 auto;
    }
}
</style>
<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import HomeStats from './components/HomeStats.vue';
</script>

<template>
    <div class="home-page gap-5">
        <HomeHeader />
        <div class="home-content">
            <div class="w-full flex flex-col gap-4">
                <FeaturedPost />
                <div class="flex gap-4">
                    <FeaturedPost />
                    <HomeStats />
                </div>
            </div>
            <div class="home-sidebar">

            </div>
        </div>
    </div>
</template>

<style lang="scss">
.home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .home-content {
        width: var(--content-width);
        margin: 0 auto;
        display: flex;
        gap: 20px;

        .home-sidebar {
            width: 260px;
        }
    }
}
</style>

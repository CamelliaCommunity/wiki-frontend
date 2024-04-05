<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import WikiLogo from '@/components/WikiLogo.vue';
</script>

<template>
    <div class="home-page">
        <HomeHeader />
        <div class="home-content">
            <div class="home-cards">
                <FeaturedPost />
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
    gap: 20px;

    .home-content {
        width: var(--content-width);
        margin: 0 auto;
        display: flex;
        gap: 20px;

        .home-cards {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .home-sidebar {
            width: 260px;
        }
    }
}
</style>

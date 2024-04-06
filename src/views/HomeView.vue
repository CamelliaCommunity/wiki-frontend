<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import HomeStats from './components/HomeStats.vue';

// this data should be fetched from the backend

const featured = {
    'title': 'Post Title Goes Here',
    'description': 'Short snippet of the post goes here, this should be relatively long but cut off after a while to not surpass a few lines, just like this one.',
    'date': 1712214046,
    'url': '/featured'
};

const popular = {
    'title': 'Title of Popular Post',
    'description': 'Short snippet of the post goes here, this should be relatively long but cut off after a while to not surpass a few lines, just like this one.',
    'date': 1712386846,
    'url': '/popular'
};

const stats = {
    'articles': 1000,
    'comments': 1000,
    'visits': 1000
};
</script>

<template>
    <div class="home-page gap-5">
        <HomeHeader />
        <div class="home-content">
            <div class="w-full flex flex-col gap-4">
                <FeaturedPost post-type="Featured Post" :post="featured" />
                <div class="flex gap-4">
                    <FeaturedPost post-type="Popular Today" :post="popular" :alternative-background="true" />
                    <HomeStats :stats="stats" />
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

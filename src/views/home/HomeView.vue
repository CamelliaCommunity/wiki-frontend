<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import HomeStats from './components/HomeStats.vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';
import { reactive } from 'vue';

Utils.setTitle('');

const react = reactive({
	// Featured
	featured: {},

	// Popular
	popular: {},

	// Statistics
    stats: {
		"articles": 0,
		"comments": 0,
		"visits": 0
	}
});

// API calls

// Featured
// API.get("/featured").then((data) => {
//	react.featured = data;
// });
react.featured = {
    'title': 'Post Title Goes Here',
    'description': 'Short snippet of the post goes here, this should be relatively long but cut off after a while to not surpass a few lines, just like this one.',
    'date': 1712214046,
    'url': '/featured'
};

// Popular
// API.get("/popular").then((data) => {
//	react.popular = data;
// });
react.popular = {
    'title': 'Title of Popular Post',
    'description': 'Short snippet of the post goes here, this should be relatively long but cut off after a while to not surpass a few lines, just like this one.',
    'date': 1712386846,
    'url': '/popular'
};

// Statistics
API.get("/stats").then((data) => {
	react.stats.articles = data.articles || "N/A";
	react.stats.comments = data.comments || "N/A";
	react.stats.visits = data.visits || "N/A";
});


</script>

<template>
    <div class="home-page gap-5">
        <HomeHeader />
        <div class="home-content">
            <div class="w-full flex flex-col gap-4">
                <FeaturedPost post-type="Featured Post" :post="react.featured" />
                <div class="flex gap-4">
                    <FeaturedPost post-type="Popular Today" :post="react.popular" linearBackground />
                    <HomeStats :stats="react.stats" />
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

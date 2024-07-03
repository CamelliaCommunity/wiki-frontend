<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import SimplePost from './components/SimplePost.vue';
import HomeStats from './components/HomeStats.vue';
import SidebarPosts from './components/SidebarPosts.vue';

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

const welcomePost = {
	title: "Welcome to the Camellia Wiki!",
	// i dunno rewrite this or something
	// but dont make it a stupid tutorial on how to use a fucking navbar
	description: "A wiki all about the music artist Camellia and the his community."
};

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
API.get("/stats").then((res) => {
	let data = res.data;
	react.stats.articles = data.articles || "N/A";
	react.stats.comments = data.comments || "N/A";
	react.stats.visits = data.visitors || "N/A";
});

// News
// TODO: Clicking "View More" sends another API request with max +3, like ?max=6, ?max=9, etc.
react.news = [];
API.get("/articles/recent?type=news").then((res) => {
	let data = res.data;
	if (data.length < 1) return;
	for (let i = 0; i < data.length; i++) {
		react.news.push({ ...data[i].meta, url: data[i].path });
	};
});

// Community Posts
// TODO: Clicking "View More" sends another API request with max +3, like ?max=6, ?max=9, etc.
react.community = [];
API.get("/articles/recent?type=community").then((res) => {
	let data = res.data;
	if (data.length < 1) return;
	for (let i = 0; i < data.length; i++) {
		react.community.push({ ...data[i].meta, url: data[i].path });
	};
});

</script>

<template>
    <div class="w-full flex flex-col items-center justify-center gap-5">
        <HomeHeader />
        <div class="flex w-full xl:w-content-width xl:mx-auto gap-5">
            <div class="flex w-full flex-col gap-4">
                <FeaturedPost post-type="Featured Post" :post="react.featured" />
                <div class="w-full flex flex-col md:flex-row gap-4">
                    <FeaturedPost post-type="Popular Today" :post="react.popular" linearBackground other-image />
                    <HomeStats class="w-full md:w-64":stats="react.stats" />
                </div>
				<SimplePost :post="welcomePost" />
				<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="w-full flex flex-col gap-4">
						<SimplePost :post="{ description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }" />
						<SimplePost :post="{ description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }" />
					</div>
					<div class="w-full flex flex-col gap-4">
						<SimplePost :post="{ description: 'AAAAAAAAAAAAAAAAAAA' }" />
						<SimplePost :post="{ description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }" />
						<SimplePost :post="{ description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }" />
					</div>
				</div>
            </div>
            <div class="hidden w-full lg:flex flex-col lg:w-64 gap-4">
				<SidebarPosts title="News" :posts="react.news" use-images />
				<SidebarPosts title="Community Posts" :posts="react.community" />
            </div>
        </div>
    </div>
</template>

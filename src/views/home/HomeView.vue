<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import SimplePost from './components/SimplePost.vue';
import BigPost from './components/BigPost.vue';
import HomeStats from './components/HomeStats.vue';
import SidebarPosts from './components/SidebarPosts.vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';
import { reactive } from 'vue';
import GradientLine from '@/components/GradientLine.vue';
import LatestRelease from './components/LatestRelease.vue';
import GrayLine from '@/components/GrayLine.vue'; // soon

Utils.setTitle('Homepage');

const loadingContentMeta = {
	title: 'loading...',
	description: 'we are still fetching this for you...',
	date: -1,
};

const react = reactive({
	// Featured
	featured: {
		meta: loadingContentMeta,
		url: "/featured"
	},

	// Popular
	popular: {
		meta: loadingContentMeta,
		url: "/popular"
	},

	// Random
	random: {
		meta: loadingContentMeta,
		url: "/random"
	},

	// Statistics
	stats: {
		"articles": 0,
		"comments": 0,
		"visits": 0
	}
});

// API calls

// Featured
API.get("/featured").then((data) => {
	if (!data.data.url) return;
	react.featured = data.data;
});

// Popular
API.get("/popular").then((data) => {
	if (!data.data.url) return;
	react.popular = data.data;
});

API.get("/articles?path=/random").then((data) => {
	if (!data.data.url) return;
	react.random = data.data;
});

// Statistics
API.get("/stats").then((res) => {
	let data = res.data;
	react.stats.articles = data.articles || "N/A";
	react.stats.comments = data.comments || "N/A";
	react.stats.visits = data.visitors || "N/A";
});

// home posts
react.posts = [];
API.get("/home").then((res) => {
	let data = res.data;
	react.posts = data;
});

// News
react.news = [];
API.get("/articles/recent?type=news&count=3").then((res) => {
	let data = res.data;
	react.news = data;
});

// Community Posts
react.community = [];
API.get("/articles/recent?type=community&count=5").then((res) => {
	let data = res.data;
	react.community = data;
});
</script>

<template>
	<div class="w-full flex flex-col items-center justify-center gap-5">
		<HomeHeader />
		<div class="flex flex-col md:flex-row w-full xl:w-content-width xl:mx-auto gap-5 md">
			<!-- i removed the justify-between as temporary fix, sorry emma :( - john -->
			<div class="flex w-full flex-col gap-4">
				<!-- row 1 -->
				<div class="w-full flex flex-col md:flex-row gap-4">
					<BigPost post-type="Popular Today" :post="react.popular" linearBackground other-image />
					<div class="flex w-full flex-col gap-4">
						<FeaturedPost class="w-full" post-type="Featured Post" :post="react.featured" linearBackground
							other-image />
						<!-- this will be a random post - john -->
						<FeaturedPost class="w-full" post-type="Random Post" :post="react.random" linearBackground
							other-image />
						<HomeStats class="w-full" :stats="react.stats" />
					</div>
				</div>
				<!-- row 2 -->
				<!-- will replace with whats in design - john -->
				<div class="w-full flex flex-col md:flex-row gap-4">
					<LatestRelease linearBackground />
				</div>
				<!-- below the cards -->
				<div>
					<h2 class="text-4xl font-semibold">Wiki Articles</h2>
					<GradientLine :overshoot="false" />
				</div>
				<div class="w-full flex flex-col gap-2 lg:max-h-full xl:max-h-80 overflow-y-auto max-h-full">
					<div v-for="(post, index) in react.posts" class="flex flex-col w-full gap-2">
						<SimplePost :post="post" />
						<GrayLine v-if="index != (react.posts.length - 1)" />
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col lg:w-64 gap-4">
				<SidebarPosts title="News" :posts="react.news" url="/news" use-images />
				<SidebarPosts title="Community Posts" :posts="react.community" url="/community/blog" />
			</div>
		</div>
	</div>
</template>

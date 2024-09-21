<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import SimplePost from './components/SimplePost.vue';
import HomeStats from './components/HomeStats.vue';
import SidebarPosts from './components/SidebarPosts.vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';
import { reactive } from 'vue';

import Button from '@/components/Button.vue';

Utils.setTitle('Homepage');

const react = reactive({
	// Featured
	featured: {
		meta: {
			title: 'loading...',
			description: 'we are still fetching this for you...',
			date: -1,
		},
		url: "/featured"
	},

	// Popular
	popular: {
		meta: {
			title: 'loading...',
			description: 'we are still fetching this for you...',
			date: -1,
		},
		url: "/popular"
	},

	// Statistics
	stats: {
		"articles": 0,
		"comments": 0,
		"visits": 0
	}
});

const latestSongRelease = {
	meta: {
		title: "Latest Song Release",
		// for now we are lorem
		// in the figma, theres a video attached to the side. maybe we could add a read more that leads to discography? - john
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
};

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
	react.posts = splitHomePosts(data);
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

function splitHomePosts(posts) {
	var curIsLeft = true;
	var left = [];
	var right = [];

	posts.forEach(post => {
		if (curIsLeft)
			left.push(post);
		else
			right.push(post);

		curIsLeft = !curIsLeft;
	});

	return [left, right];
}
</script>

<template>
	<div class="w-full flex flex-col items-center justify-center gap-5">
		<HomeHeader />
		<div class="flex flex-col md:flex-row w-full xl:w-content-width xl:mx-auto gap-5 md">
			<div class="flex w-full flex-col gap-4">
				<FeaturedPost post-type="Featured Post" :post="react.featured" />
				<div class="flex justify-center gap-2">
					<Button type="success">Save and Cancel</Button>
				</div>
				<div class="w-full flex flex-col md:flex-row gap-4">
					<FeaturedPost post-type="Popular Today" :post="react.popular" linearBackground other-image />
					<HomeStats class="w-full md:w-64" :stats="react.stats" />
				</div>
				<SimplePost :post="latestSongRelease" />
				<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="w-full flex flex-col gap-4" v-for="side in react.posts">
						<SimplePost v-for="post in side" :post="post" />
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

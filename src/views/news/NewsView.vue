<script setup>
import FeaturedPost from '../home/components/FeaturedPost.vue';
import SimplePost from '../home/components/SimplePost.vue';
import BigPost from '../home/components/BigPost.vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
// import SidebarPosts from '../home/components/SidebarPosts.vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';
import { reactive } from 'vue';
import GradientLine from '@/components/GradientLine.vue';
import GrayLine from '@/components/GrayLine.vue';

Utils.setTitle('News');

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

// home posts
react.posts = [];
API.get("/home").then((res) => {
	let data = res.data;
	react.posts = data;
});

// News
react.news = [];
API.get("/articles/recent?type=news&count=999").then((res) => {
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
				<div class="w-full flex flex-col md:flex-row gap-4">
					<BigPost post-type="Popular Today" :post="react.popular" linearBackground other-image />
					<div class="flex w-full flex-col gap-4">
						<FeaturedPost class="w-full" post-type="Featured Post" :post="react.featured" linearBackground
							other-image />
						<FeaturedPost class="w-full" post-type="Random Post" :post="react.random" linearBackground
							other-image />
					</div>
				</div>
				<BlockquoteNote class="border-x-0 rounded-lg" title="Send us money or the wiki hoster is getting it.">
					<p>On a serious note, we need money.</p>
					<img src="@/assets/images/kofi.png" width="300">
				</BlockquoteNote>
				<BlockquoteNote class="border-x-0 rounded-lg" title="Community Advertisement">
					<p class='text-2xl font-semibold'>Follow Spinny's Twitter. It's our therapy.
						<br>
						<a class="text-lg text-accent" target="_blank" href="https://x.com/spinnyternally">Visit
							Spinny's
							Twitter</a>
					</p>
				</BlockquoteNote>
				<div>
					<h2 class="text-4xl font-semibold">Read More</h2>
					<GradientLine :overshoot="false" />
				</div>
				<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
					<div v-for="(post) in react.news" class="w-full flex flex-col gap-4">
						<SimplePost :post="post" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

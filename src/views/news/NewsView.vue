<script setup>
import { reactive } from 'vue';
import { useHead } from '@unhead/vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';

import FeaturedPost from '@/views/home/components/FeaturedPost.vue';
import NewsPost from '@/views/news/components/NewsPost.vue';
import BigPost from '@/views/home/components/BigPost.vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import GradientLine from '@/components/GradientLine.vue';

import { PhCaretRight } from '@phosphor-icons/vue';
import WikiLogo from "@/assets/images/icon.png";
import Kofi from "@/assets/images/kofi.png";
import GrayLine from '@/components/GrayLine.vue';

Utils.setTitle('News');

const loadingContentMeta = {
	title: 'loading...',
	description: 'we are still fetching this for you...',
	date: -1,
};

// clean this shit up please - john
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

// News
react.news = [];
API.get("/articles?type=news&count=999").then((res) => {
	let data = res.data;
	react.news = data;
});


// News but 4
react.newsSmall = [];
API.get("/articles?type=news&count=4").then((res) => {
	let data = res.data;
	react.newsSmall = data;
});

// ONE
react.newsOne = [];
API.get("/articles?type=news").then((res) => {
	let data = res.data[0];
	react.newsOne = data;
});

useHead({
	meta: [
		{
			name: 'og:title',
			content: 'News | Camellia Wiki'
		},
		{
			name: 'description',
			content: 'The Camellia Wiki includes the focus on Camellia, his works, and rhythm games he has associated with. We encourage you to take a look!'
		},
		{
			name: 'og:description',
			content: 'The Camellia Wiki includes the focus on Camellia, his works, and rhythm games he has associated with. We encourage you to take a look!'
		},
		{
			name: 'keywords',
			content: 'camellia, wiki, community, producer, wiki, fandom, hardcore, music, tano*c, japanese, rhythm game, gaming, osu!, discography, albums, songs, fan community'
		},
		{
			name: 'author',
			content: 'Theaceae Collective'
		}
	]
});
</script>

<template>
	<div class="w-full flex flex-col items-center justify-center">
		<div class="xl:w-content-width flex flex-col items-center justify-center">
			<div class="flex justify-between w-full mb-2 px-5">
				<p class="flex gap-0.5 items-center">
					<RouterLink to="/" class="text-light-gray readMoreHover">Home</RouterLink>
					<span class="flex items-center gap-1">
						<PhCaretRight :size="16" class="text-light-gray" />
						<RouterLink to="/news" class="text-light-gray readMoreHover">News</RouterLink>
					</span>
				</p>
			</div>
			<div
				class="w-full md:h-16 bg-background-1 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center mb-4">
				<h3 class="text-2xl font-semibold">The Wiki Times</h3>
				<p class="font-extralight">The only Real News Source</p>
				<img :src="WikiLogo" alt="Camellia Wiki Icon" class="w-8" />
			</div>
		</div>
		<div class="flex flex-col md:flex-row w-full xl:w-content-width xl:mx-auto gap-5 md">
			<div class="flex w-full flex-col gap-4">
				<div class="w-full flex flex-col md:flex-row gap-4">
					<div class="w-full">
						<BigPost post-type="Recent Post" :post="react.newsOne" linearBackground other-image />
					</div>
					<div
						class="w-full flex flex-col justify-between gap-2 lg:max-h-full xl:max-h-full overflow-y-auto max-h-full">
						<template v-for="(post, index) in react.newsSmall">
							<NewsPost class="flex flex-col w-full" :post="post" linearBackground />
							<GrayLine v-if="index != (react.newsSmall.length - 1)" />
						</template>
					</div>
				</div>
				<BlockquoteNote class="border-x-0 rounded-lg font-semibold text-3xl"
					title="Send us money or the wiki hoster is getting it.">
					<div class="mb-2">On a serious note, the wiki hoster needs money.</div>
					<a href="https://ko-fi.com/camelliacommunity" target="_blank">
						<img :src="Kofi" class="w-60 m-auto">
					</a>
				</BlockquoteNote>
				<div class="flex w-full flex-col gap-4 px-8">
					<BlockquoteNote class="border-x-0 rounded-lg" title="Community Advertisement">
						<p class='text-3xl font-semibold'>Follow Spinny's Twitter. It's our therapy.
							<br>
							<a class="text-lg text-accent" target="_blank" href="https://x.com/spinnyternally">
								Visit Spinny's Twitter
							</a>
						</p>
					</BlockquoteNote>
					<div>
						<h2 class="text-4xl font-semibold mb-1">Read More</h2>
						<GradientLine />
					</div>
					<div class="w-full flex flex-col gap-2 lg:max-h-full xl:max-h-[690px] overflow-y-auto max-h-full">
						<div v-for="(post, index) in react.news" class="flex flex-col w-full gap-2">
							<NewsPost :post="post" linearBackground />
							<GrayLine v-if="index != (react.news.length - 1)" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
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
// API.get("/news?max=3").then((data) => {
//	react.news = data;
// });
react.news = [
	{
		"title": "Short title",
		"author": "Person",
		"date": 1713167939,
		"url": "/short-title"
	},
	{
		"title": "Some cool newspost title that can wrap",
		"author": "Person",
		"date": 1713167939,
		"url": "/some-cool-newspost-title-that-can-wrap"
	},
	{
		"title": "Each of these buttons serves a purpose with navigation, including navigating you",
		"author": "Person",
		"date": 1713167939,
		"url": "/never-gonna-give-you-up"
	}
];

// Community Posts
// TODO: Clicking "View More" sends another API request with max +3, like ?max=6, ?max=9, etc.
// API.get("/communityposts?max=3").then((data) => {
//	react.community = data;
// });
react.community = [
	{
		"title": "Smaller Title",
		"author": "Person",
		"date": 1713167939,
		"url": "/smaller-title"
	},
	{
		"title": "Some cool newspost title that can wrap",
		"author": "Person",
		"date": 1713167939,
		"url": "/aaaaaaaaaaaaaaaaaaaaaaa"
	},
	{
		"title": "Maybe a slightly too long title which shouldn't really be this long and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and and",
		"author": "Person",
		"date": 1713167939,
		"url": "/never-gonna-give-you-up"
	},
	{
		"title": "Maybe a slightly too long title which shouldn't really be this long AND PAPER SMELLS LIKE STINK POOPPYYY POOP POOP",
		"author": "Person",
		"date": 1713167939,
		"url": "/never-gonna-give-you-up"
	},
	{
		"title": "Maybe a slightly too long title which shouldn't really be this long and WHAT THE FUCK IS AN EM",
		"author": "Person",
		"date": 1713167939,
		"url": "/never-gonna-give-you-up"
	}
];

</script>

<template>
    <div class="w-full flex flex-col items-center justify-center gap-5">
        <HomeHeader />
        <div class="flex w-full xl:w-content-width xl:mx-auto gap-5">
            <div class="flex w-full flex-col gap-4">
                <FeaturedPost post-type="Featured Post" :post="react.featured" />
                <div class="w-full flex flex-col md:flex-row gap-4">
                    <FeaturedPost post-type="Popular Today" :post="react.popular" linearBackground />
                    <HomeStats :stats="react.stats" />
                </div>
            </div>
            <div class="hidden w-full lg:flex flex-col lg:w-64 gap-4">
				<SidebarPosts post-type="News" :posts="react.news" />
				<SidebarPosts post-type="Community Posts" :posts="react.community" />
            </div>
        </div>
    </div>
</template>

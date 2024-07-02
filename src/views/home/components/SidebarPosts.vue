<script setup>
import SidebarImagePost from './sidebar/SidebarImagePost.vue';
import SidebarTextPost from './sidebar/SidebarTextPost.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
	useImages: {
		type: Boolean,
		default: false
	},
    posts: {
        type: Object,
        required: true
    }
});
</script>

<template>
	<div class="rounded-lg bg-background-1 w-64">
		<div class="flex flex-col bg-background-3 p-2 rounded-lg gap-2">
			<h3 class="text-2xl font-medium pl-2">{{ title }}</h3>
			<SidebarImagePost v-if="useImages" v-for="post in posts" :post="post" />
			<SidebarTextPost v-else v-for="post in posts" :post="post" />
			<h4 if="posts.length < 1" class="pl-2">No {{ title }} to display!</h4>
		</div>
		<div v-if="posts.length > 3" class="rounded-xl flex justify-center text-center p-2">
			<p class="text-xl font-light cursor-pointer hover:text-accent">View More</p>
		</div>
	</div>
</template>
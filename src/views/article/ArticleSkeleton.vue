<script setup>

import CameCry from "@/assets/images/CameCry.webp";

const props = defineProps({
	loading: Boolean,
	error: Boolean
})

const skeleData = {
	breadCumbs: {
		class: "flex justify-between w-full mb-3"
	},
	meta: {
		class: "w-full h-16 bg-background-1 rounded-lg p-5 flex justify-between items-center mb-4"
	},
	content: {
		class: "article-contents w-72 min-w-72 h-fit bg-background-3 rounded-lg flex flex-col p-5",
		rows: 5,
		rows_class: "animate-pulse h-5 bg-background-1 rounded w-full mb-4"
	},
	body: {
		class: "article-body w-full pt-2",
		rows: 10,
		rows_class: "animate-pulse h-6 bg-background-3 rounded w-full mb-2"
	}
}

</script>

<template>
	<div v-if="loading" class="flex flex-col w-full">
		<div :class="skeleData.breadCumbs.class">
			<div class="animate-pulse h-6 bg-background-3 rounded w-full"></div>
		</div>
		<div :class="skeleData.meta.class">
			<div class="animate-pulse h-6 bg-background-3 rounded w-full"></div>
		</div>
		<div class="article-content">
			<div :class="skeleData.content.class">
				<div v-for="i in skeleData.content.rows" :key="i" :class="skeleData.content.rows_class"></div>
			</div>
			<div :class="skeleData.body.class">
				<div v-for="i in skeleData.body.rows" :key="i" :class="skeleData.body.rows_class"></div>
			</div>
		</div>
	</div>
	<div v-else-if="error" class="flex w-full">
		<div class="flex flex-col justify-center">
			<h1 class="text-3xl font-extrabold">NOT FOUND</h1>
			<p class="text-1xl">The requested article does not exist.</p>
			<p class="text-1xl">Have a cookie 🍪</p>
		</div>
		<img :src="CameCry" class="h-20 w-20">
	</div>
	<slot v-else></slot>
</template>
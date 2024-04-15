<script setup>
import { RouterLink } from 'vue-router';

import Formatting from '@/utils/Formatting';

const props = defineProps({
    postType: {
        type: String
    },
    posts: {
        type: Object,
        required: true
    }
});
</script>

<template>
	<div class="rounded-xl bg-background-1 w-64">
		<div class="bg-background-3 p-2 pb-1 rounded-lg">
			<h3 class="text-2xl font-medium pl-2 mb-3">{{ postType }}</h3>
			<RouterLink v-for="post in posts" :to="post.url" :class="'sidebar-post ' + postType.replace(/\s/g, '').toLowerCase() + ' mb-3'">
					<img v-if="postType == 'News'" src="/src/assets/images/testing-image-2.png" alt="card background" class="object-cover">
					<div v-if="postType == 'News'" class="dim"></div>
					<div class="card-content">
						<div>
							<div class="flex justify-between">
								<h2 class="text-xl font-medium leading-tight">{{ post.title }}</h2>
								<!-- <h3 class="text-base font-medium">{{ Formatting.formatDate(post.date) }}</h3> -->
							</div>
							<p class="post-description leading-tight">by {{ post.author }}</p>
						</div>
					</div>
			</RouterLink>
		</div>
		<div class="rounded-xl flex justify-center text-center p-2">
			<p class="text-xl font-light cursor-pointer">View More</p>
		</div>
	</div>
</template>

<style lang="scss">
.sidebar-post {
	height: 178px;
    width: auto;
    border-radius: 8px;
    overflow: hidden;
	display: grid;

    > * {
		height: 178px;
		width: 244px;
        grid-area: 1 / 1;
    }

    .dim {
        background: rgba(0, 0, 0, 0.2) linear-gradient(180deg, transparent 0%, rgba(69, 40, 61, 0.727) 80%);
    }

	&.communityposts {
		background-color: var(--background-4);
		max-height: 110px;
		height: fit-content;
		.card-content {
			height: inherit;
			padding: 14px, 10px, 14px, 10px;
		}
		.card-content > div {
			margin-top: unset;
		}
	}

    .card-content {
        display: flex;
        flex-direction: column;
        padding: 8px;
		flex: 1;


        > div {
            display: flex;
            flex-direction: column;
			margin-top: auto;
        }

        .post-description {
            width: 450px;
            font-size: 18px;
            max-height: 3em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
        }
    }
}
</style>
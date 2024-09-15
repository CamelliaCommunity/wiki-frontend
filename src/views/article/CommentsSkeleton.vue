<script setup>

import { ref, toRaw } from 'vue';
import { PhArrowClockwise } from "@phosphor-icons/vue";

import GradientLine from '@/components/GradientLine.vue';

import NewComment from '@/components/comments/NewComment.vue';
import Comment from '@/components/comments/Comment.vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
	commentSystem: {
		type: Object,
		default: {}
	}
});

const commentSystem = ref(toRaw(props.commentSystem));

</script>

<template>
	<div v-if="!commentSystem.loaded && !commentSystem.error" id="comment-loading-overlay">
		<div class="m-auto flex size-10 items-center justify-center rounded-lg bg-background-4 p-1">
			<PhArrowClockwise :size="32" class="spin-spin-spin" />
		</div>
	</div>

	<NewComment :error="commentSystem.error" :loaded="commentSystem.loaded" />
	<!-- TODO: implement this sometime
					<div class="m-0 p-0">
						<span class="mx-7 font-normal text-light-gray">Sort by</span>
						<span class="ml-5 mr-4" @click="commentSorter(1)">New</span>
						<span class="mx-4" @click="commentSorter(2)">Old</span>
						<span class="mx-4" @click="commentSorter(3)">Top</span>
					</div> -->
	<GradientLine />

	<BlockquoteNote v-if="commentSystem.error" title="Failed to load comments!" type="danger">
		Let's try
		<a class="text-accent hover:text-accent-soft" :href="route.fullPath">refreshing the page</a>
		and if that doesn't work, please contact us.
	</BlockquoteNote>
	<div v-else-if="commentSystem.loaded && !commentSystem.blog">
		<Comment :comments="toRaw(commentSystem.cache)">

		</Comment>
	</div>
</template>

<style lang="scss">
#comment-loading-overlay {
	display: flex;
	justify-content: center;
	position: absolute;
	z-index: 40;
	height: 100%;
	width: calc(100% + 20px);
	left: 0;
	top: 0;
	margin: 0 -10px;
	background: rgba(0, 0, 0, 0.2);
}
</style>
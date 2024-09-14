<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import API from '@/utils/API';
import Toast from '@/utils/Toast';
import { PhArrowFatUp, PhArrowFatDown, PhArrowBendUpLeft, PhDotsThree, PhPencil, PhTrash, PhLink, PhFlag } from '@phosphor-icons/vue';

const route = useRoute();
const props = defineProps({
	user: {
		type: Object,
		default: API.user
	}
});

const comment = reactive({
	commentId: 0,
	hovered: false,
	moreActions: false,
	text: "A comment? I was a comment once. They locked me in a box. A HTML div box. And HTML div boxes make me a comment. And comments make me crazy.",
	votes: 1500
});

const chngMoreActions = () => comment.moreActions = !comment.moreActions;
const changeHover = (isOpen) => { comment.hovered = isOpen; if (!isOpen) comment.moreActions = false; };

const commentAction = (action) => {
	if (action == 4) {
		const url = `${route.fullPath.split("#")[0]}#comment-${comment.commentId}`;

		if (!navigator.clipboard) {
			Toast.showToast("Your browser does not support copying to the clipboard, sorry.")
			return;
		}

		navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}${url}`)
			.then(() => Toast.showToast("Copied to clipboard!", { type: "success" }))
			.catch((err) => Toast.showToast("Error occurred copying to clipboard."));
	};
};
</script>

<template>
	<div :id="`comment-${comment.commentId}`"
		class="bg-background-2 hover:bg-background-3 rounded-xl w-full max-w-screen-lg min-h-24 gap-3 px-2 py-2 flex m-auto"
		@mouseover="changeHover(true)" @mouseleave="changeHover(false)">
		<div class="flex flex-col gap-2">
			<img :class="`rounded-2xl border-2 h-14 min-w-fit`" :src="user.avatar"
				:style="`border-color: ${user.color}`" alt="avatar" />
		</div>
		<div class="flex flex-col w-full">
			<div class="flex text-xl justify-between items-center align-middle relative">
				<div class="text-primary">
					<span class="font-bold">{{ user.nickname || user.username }}</span>
					<span class="text-light-gray text-base gap-2">&nbsp;@{{ user.username }}
						&nbsp;&#8226;&nbsp;
						Jul 27th, 2024 - 727 years ago
					</span>
				</div>
				<div class="bg-background-1 rounded-md hover:bg-background-2 cursor-pointer w-fit"
					v-if="comment.hovered">
					<PhDotsThree :size="24" @click="chngMoreActions" />
					<div class="absolute mt-1 h-fit flex flex-col bg-background-1 w-fit rounded-md"
						v-if="comment.moreActions">
						<span @click="commentAction(4)"
							class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-base rounded-sm px-2 hover:text-white hover:bg-gray py-1">
							<PhLink /> Link
						</span>
						<span @click="commentAction(5)"
							class="flex text-red cursor-pointer align-middle items-center gap-1 text-base rounded-sm px-2 hover:text-white hover:bg-gray py-1">
							<PhFlag /> Report
						</span>
					</div>
				</div>
			</div>
			<div class="flex text-lg w-5/6">{{ comment.text }}</div>
			<div class="flex text-xl mt-2 justify-between gap-1 items-center align-middle">
				<div class="flex text-light-gray align-middle items-center gap-1 text-lg select-none">
					<PhArrowFatUp class="cursor-pointer hover:text-white" :size="24" @click="comment.votes++" />
					{{ Math.floor(comment.votes) }}
					<PhArrowFatDown class="cursor-pointer hover:text-white" :size="24" @click="comment.votes--" />
				</div>
				<div class="flex" v-if="comment.hovered">
					<span @click="commentAction(1)"
						class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhArrowBendUpLeft /> Reply
					</span>
					<span @click="commentAction(2)"
						class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhPencil /> Edit
					</span>
					<span @click="commentAction(3)"
						class="flex text-red cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhTrash /> Delete
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
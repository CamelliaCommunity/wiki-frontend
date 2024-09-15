<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import Toast from '@/utils/Toast';
import API from "@/utils/API";
import Formatting from '@/utils/Formatting';

import Logo from "@/assets/images/avatar.png";
import { PhArrowFatUp, PhArrowFatDown, PhArrowBendUpLeft, PhDotsThree, PhPencil, PhTrash, PhLink, PhFlag } from '@phosphor-icons/vue';


const route = useRoute();

const props = defineProps({
	comments: {
		type: Object,
		default: []
	}
});

const comments = ref(props.comments);

const chngMoreActions = (commentId) => {
	const commentIndex = comments.value.findIndex(c => c.id === commentId);
	if (commentIndex == null) return;
	const comment = comments.value[commentIndex];

	comment.moreActions = !comment.moreActions;
};

const changeHover = (commentId, isOpen) => {
	const commentIndex = comments.value.findIndex(c => c.id === commentId);
	if (commentIndex == null) return;
	const comment = comments.value[commentIndex];

	comment.hovered = isOpen;
	if (!isOpen) comment.moreActions = false;
};


const commentAction = (commentId, action, options) => {
	const commentIndex = comments.value.findIndex(c => c.id === commentId);
	if (commentIndex == null) return;
	const comment = comments.value[commentIndex];

	if (action == 0) { // Vote on comment
		const commentIndex = comments.value.findIndex(c => c.id === commentId);
		if (commentIndex == null) return;
		const comment = comments.value[commentIndex];

		const { type } = options;

		let oldVotes = {
			vote: comment.vote,
			ups: comment.ups,
			downs: comment.downs
		};

		if (oldVotes.vote == type) return;

		if (type == 0) {
			if (oldVotes.vote == 1) comment.ups--;
			else comment.downs--;

		} else {
			if (oldVotes.vote == 1) comment.ups--;
			else if (oldVotes.vote == -1) comment.downs--;

			if (type == 1) comment.ups++;
			else if (type == -1) comment.downs++;
		};

		comment.vote = type;
		API.post(`/comments/${commentId}/vote`, type).then(res => {
			if (res.message != "OK" || res.status != 200) {
				Toast.showToast("Failed to cast your vote! Please try again.", { type: "error" });
				// Restore original data
				comment.vote = oldVotes.vote;
				comment.ups = oldVotes.ups;
				comment.downs = oldVotes.downs;
				return;
			};
		})

	} else if (action == 4) { // Copy to clipboard
		const url = `${route.fullPath.split("#")[0]}#comment-${comment.id}`;

		if (!navigator.clipboard) {
			Toast.showToast("Your browser does not support copying to the clipboard, sorry.")
			return;
		}

		navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}${url}`)
			.then(() => Toast.showToast("Copied to clipboard!", { type: "success" }))
			.catch((err) => Toast.showToast("Error occurred copying to clipboard."));
	};
};

const fixAvatar = (e) => e.target.src = Logo;

</script>

<template v-if="comments.length > 0">
	<div v-for="(comment, index) in comments" :id="`comment-${comment.id}`" :key="comment.id"
		class="bg-background-2 hover:bg-background-3 rounded-xl w-full max-w-screen-lg min-h-24 gap-3 px-2 py-2 flex m-auto"
		@mouseover="changeHover(comment.id, true)" @mouseleave="changeHover(comment.id, false)"
		:set="commentTime = Formatting.convertHumanFromStamp((Date.now() / 1000) - comment.time)">
		<div class="flex gap-2 w-full">
			<div class="flex flex-col gap-2">
				<img alt="Avatar" :class="`rounded-2xl border-2 h-14 min-w-fit`" :src="comment.author.avatar"
					:style="`border-color: ${comment.author.color}`" @error="fixAvatar" />
			</div>
			<div class=" flex flex-col w-full">
				<div class="flex text-xl justify-between items-center align-middle relative">
					<div class="text-primary">
						<span class="font-bold">{{ comment.author.nick || comment.author.name }}</span>
						<span class="text-light-gray text-base gap-2">&nbsp;@{{ comment.author.name }}
							&nbsp;&#8226;&nbsp;
							{{ Formatting.formatDate(comment.time) }}
							-
							{{ commentTime + "" + (commentTime != "just now" ? " ago" : "") }}
						</span>
					</div>
					<div class="bg-background-1 rounded-md hover:bg-background-2 cursor-pointer w-fit"
						v-if="comment.hovered">
						<PhDotsThree :size="24" @click="chngMoreActions(comment.id)" />
						<div class="absolute mt-1 h-fit flex flex-col bg-background-1 w-fit rounded-md"
							v-if="comment.moreActions">
							<span @click="commentAction(comment.id, 4)"
								class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-base rounded-sm px-2 hover:text-white hover:bg-gray py-1">
								<PhLink /> Link
							</span>
							<span @click="commentAction(comment.id, 5)"
								class="flex text-red cursor-pointer align-middle items-center gap-1 text-base rounded-sm px-2 hover:text-white hover:bg-gray py-1">
								<PhFlag /> Report
							</span>
						</div>
					</div>
				</div>
				<div class="flex text-lg w-5/6">{{ comment.content }}</div>
				<div class="flex text-xl mt-2 justify-between gap-1 items-center align-middle">
					<div class="flex text-light-gray align-middle items-center gap-1 text-lg select-none">
						<PhArrowFatUp
							:class="`cursor-pointer ${comment.vote == 1 ? 'text-accent hover:text-accent-soft' : 'hover:text-white'}`"
							:size="24" @click="commentAction(comment.id, 0, { type: comment.vote == 1 ? 0 : 1 })" />
						<span>{{ Math.floor(comment.ups -
							comment.downs)
							}}</span>
						<PhArrowFatDown
							:class="`cursor-pointer hover:text-white ${comment.vote == -1 ? 'text-accent' : ''}`"
							:size="24" @click="commentAction(comment.id, 0, { type: comment.vote == -1 ? 0 : -1 })" />
					</div>
					<div class="flex" v-if="comment.hovered">
						<span @click="commentAction(comment.id, 1)"
							class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
							<PhArrowBendUpLeft /> Reply
						</span>
						<span @click="commentAction(comment.id, 2)"
							class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
							<PhPencil /> Edit
						</span>
						<span v-if="comment.author.id == API.user.id || API.user.staff"
							@click="commentAction(comment.id, 3)"
							class="flex text-red cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
							<PhTrash /> Delete
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
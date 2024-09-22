<script setup>
import { nextTick, ref, shallowRef, watch, inject, toRefs } from 'vue';
import { PhPaperPlaneTilt, PhXCircle, PhCheckCircle, PhArrowClockwise } from '@phosphor-icons/vue';

import API from '@/utils/API';
import Toast from '@/utils/Toast';
import Textbox from '../textbox/Textbox.vue';

const commentSystem = inject("commentSystem");

const props = defineProps({
	error: {
		type: Boolean,
		default: false
	},
	loaded: {
		type: Boolean,
		default: false
	},
	parent: {
		type: String,
		default: null
	}
});

const { error, loaded, parent } = toRefs(props);

const knownStates = {
	NORMAL: { icon: PhPaperPlaneTilt, spin: false },
	SUBMITTING: { icon: PhArrowClockwise, spin: true },
	OK: { icon: PhCheckCircle, spin: false },
	ERROR: { icon: PhXCircle, spin: false },
};

const beDisabled = ref(error.value || !loaded.value);
beDisabled.value = !API.user.loggedIn;
watch(API.user, () => { beDisabled.value = !API.user.loggedIn; });

const submitIconClasses = ref("");
const currentState = shallowRef(knownStates.NORMAL);
const previousState = shallowRef(knownStates.NORMAL);

// shift+tab handling
const handleKeydown = (e) => {
	if (e.keyCode === 13 && e.shiftKey) {
		textareaHeight(e);
	}
	else if (e.keyCode === 13) { // if da user press enter it should SUBMIT
		submitComment();
		e.preventDefault();
	}
};

const handleInput = (e) => {
	textareaHeight(e);
};

const textareaHeight = (e) => {
	e.target.style.height = "";
	e.target.style.height = e.target.scrollHeight + "px";
};

const updateTextbox = () => {
	nextTick(() => {
		submitIconClasses.value = submitIconClasses.value.replace("spin-spin-spin", "");
		if (currentState.value == knownStates.SUBMITTING) {
			submitIconClasses.value = "spin-spin-spin";
		};
	});
};
const updateState = (newState) => {
	previousState.value = currentState.value;
	currentState.value = newState;
};

const submitComment = () => {
	if (!API.user.loggedIn) return;

	if (beDisabled.value) return;
	if (currentState.value != knownStates.NORMAL) return;

	updateState(knownStates.SUBMITTING);
	beDisabled.value = true;
	updateTextbox();

	const finishUp = (type, msg) => {
		if (type == "error" || (type != "error" && msg))
			Toast.showToast(type == "error" ? `Failed to post your comment! ${msg}` : msg, { type: type == "error" ? "error" : "success" });

		updateState(knownStates[type == "error" ? "ERROR" : "OK"]);
		beDisabled.value = true;
		updateTextbox();

		setTimeout(() => {
			updateState(knownStates.NORMAL);
			beDisabled.value = false;
			updateTextbox();
		}, 1000);
	};

	let commentBox = document.getElementById("newcomment-textbox");

	let commentBoxText = commentBox.value;
	commentBoxText = commentBoxText?.trim();
	if (!commentBoxText) return finishUp("error", "Please enter some text and try again...");

	let currentTime = (Date.now() / 1000);
	let newComment = {
		id: currentTime,
		time: currentTime,
		author: {
			id: API.user.id,
			name: API.user.username,
			nick: API.user.nickname,
			avatar: API.user.avatar,
			color: API.user.color,
			staff: API.user.staff
		},
		content: commentBoxText,
		ups: 0,
		downs: 0,
		isLoading: true,
		parent
	};
	commentSystem.value.cache.unshift(newComment); // Add comment to the cache

	API.post(commentSystem.value.path, newComment.content, { noStringify: true }).then(res => {
		if (res.message != "OK" || res.status != 200) {
			// Restore original data
			commentSystem.value.cache = commentSystem.value.cache.filter(c => { return c.id !== currentTime });

			finishUp("error", "Please try again.");
		} else {
			newComment = { ...newComment, ...res.data, isLoading: false, vote: 1 };
			commentSystem.value.cache = commentSystem.value.cache.filter(c => { return c.id !== currentTime });
			commentSystem.value.cache.unshift(newComment);
			commentBox.value = "";

			finishUp("success");
		}
	});

	return;
};

</script>

<template>
	<div class="new-comment">
		<div class="w-full rounded flex gap-3">
			<img class="rounded-xl object-fill max-h-24 my-auto" :src="API.user.avatar" alt="avatar" />
			<Textbox box-name="newcomment" :be-disabled="beDisabled" :handleInput="handleInput"
				:handleKeydown="handleKeydown" :handleSubmit="submitComment" :submitIcon="currentState.icon"
				:submitIconClasses="submitIconClasses"
				:placeholderText="API.user.loggedIn ? `Press enter to post. Use shift+enter to make a new line.` : `You must be logged in to comment!`">
			</Textbox>
		</div>
	</div>
</template>
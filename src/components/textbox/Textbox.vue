<script setup>
import { nextTick, ref, shallowRef } from 'vue';
import { PhPaperPlaneTilt, PhXCircle, PhCheckCircle, PhArrowClockwise, PhTextBolder, PhTextItalic, PhTextH, PhTextUnderline, PhTextStrikethrough, PhListBullets, PhListNumbers, PhListChecks, PhQuotes, PhCodeSimple, PhHighlighter, PhSelection, PhGridFour, PhLinkSimple, PhImage } from '@phosphor-icons/vue';

import API from '@/utils/API';
import Toast from '@/utils/Toast';
import TextboxIcon from './TextboxIcon.vue';


const props = defineProps({
	isEditor: {
		type: Boolean,
		default: false
	}
});

const doTheInput = (e) => {
	textareaHeight(e);
	if (e.keyCode === 13) {
		if (e.shiftKey) e.target.value += "\n";
		else submitComment();
		e.preventDefault();
	};
};

const knownStates = {
	NORMAL: { icon: PhPaperPlaneTilt },
	SUBMITTING: { icon: PhArrowClockwise },
	OK: { icon: PhCheckCircle },
	ERROR: { icon: PhXCircle },
};

let beDisabled = ref(!API.user.loggedIn);
let currentState = shallowRef(knownStates.NORMAL);
let previousState = shallowRef(knownStates.NORMAL);

const textareaHeight = (e) => {
	e.target.style.height = "";
	e.target.style.height = e.target.scrollHeight + "px";
};

const updateTextbox = () => {
	nextTick(() => {
		const submitBtn = document.getElementById("submit");
		submitBtn.children[0].classList[currentState.value == knownStates.SUBMITTING ? "add" : "remove"]("spin-spin-spin");
	});
};
const updateState = (newState) => {
	previousState.value = currentState.value;
	currentState.value = newState;
};

const submitComment = () => {
	if (beDisabled || currentState.value != knownStates.NORMAL) return;

	updateState(knownStates.SUBMITTING);
	beDisabled = true;
	updateTextbox();

	setTimeout(() => {
		updateState(knownStates.ERROR);
		beDisabled = false;
		updateTextbox();
		Toast.showToast("An internal error occurred while processing your request.", { type: "error" });

		setTimeout(() => {
			updateState(knownStates.SUBMITTING);
			beDisabled = true;
			updateTextbox();
			setTimeout(() => {
				updateState(knownStates.OK);
				updateTextbox();

				setTimeout(() => {
					updateState(knownStates.NORMAL);
					beDisabled = false;
					updateTextbox();
				}, 1000);
			}, 2000);
		}, 2000);
	}, 2000);
};

nextTick(() => {
	beDisabled = !API.user.loggedIn;
});

</script>

<template>
	<div class="h-auto w-full flex flex-col rounded-xl bg-background-3 p-2 gap-2">
		<div class="w-full flex gap-2">
			<textarea
				class="h-10 w-full resize-none overflow-hidden rounded-lg bg-background-2 px-3 py-1 text-lg outline-none"
				placeholder="Press enter to post. Use shift+enter to make a new line." @keydown="doTheInput" />

			<div :class='"m-auto flex size-10 items-center justify-center rounded-lg bg-background-4 p-1 cursor-" + `${beDisabled ? "deny" : "pointer"}`'
				id="submit" @click="submitComment" :disabled="beDisabled">
				<Component :is="currentState.icon" :size="20" :disabled="beDisabled"></Component>
			</div>
		</div>
		<div class="max-w-fit h-10 flex px-2 gap-2 bg-background-2 rounded-lg py-2">
			<div id="formatting" class="w-auto flex gap-3">
				<TextboxIcon :icon="PhTextBolder" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextItalic" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextH" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextUnderline" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextStrikethrough" :disabled="beDisabled" />
			</div>
			<div class="h-auto w-0.5" style="background: rgba(255, 255, 255, 15%);"></div>
			<div id="list" class="w-auto flex gap-3">
				<TextboxIcon :icon="PhListBullets" :disabled="beDisabled" />
				<TextboxIcon :icon="PhListNumbers" :disabled="beDisabled" />
				<TextboxIcon :icon="PhListChecks" :disabled="beDisabled" />
			</div>
			<div class="h-auto w-0.5" style="background: rgba(255, 255, 255, 15%);"></div>
			<div id="list" class="w-auto flex gap-3">
				<TextboxIcon :icon="PhQuotes" :disabled="beDisabled" />
				<TextboxIcon :icon="PhCodeSimple" :disabled="beDisabled" />
				<TextboxIcon :icon="PhHighlighter" :disabled="beDisabled" />
				<TextboxIcon :icon="PhSelection" :disabled="beDisabled" />
				<TextboxIcon :icon="PhGridFour" :disabled="beDisabled" />
				<TextboxIcon :icon="PhLinkSimple" :disabled="beDisabled" />
				<TextboxIcon :icon="PhImage" :disabled="beDisabled" />
			</div>
		</div>
	</div>
</template>
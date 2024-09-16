<script setup>
import { nextTick, ref, shallowRef } from 'vue';
import { PhPaperPlaneTilt, PhXCircle, PhCheckCircle, PhArrowClockwise } from '@phosphor-icons/vue';

import API from '@/utils/API';
import Toast from '@/utils/Toast';

import Textbox from '../textbox/Textbox.vue';

const props = defineProps({
	error: {
		type: Boolean,
		default: false
	},
	loaded: {
		type: Boolean,
		default: false
	}
});

const knownStates = {
	NORMAL: { icon: PhPaperPlaneTilt, spin: false },
	SUBMITTING: { icon: PhArrowClockwise, spin: true },
	OK: { icon: PhCheckCircle, spin: false },
	ERROR: { icon: PhXCircle, spin: false },
};

// let beDisabled = ref(API.user.loggedIn ? props.beDisabled : true);
const beDisabled = ref(false);
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
	if (beDisabled.value) return;
	if (currentState.value != knownStates.NORMAL) return;

	updateState(knownStates.SUBMITTING);
	beDisabled.value = true;
	updateTextbox();

	setTimeout(() => {
		updateState(knownStates.ERROR);
		beDisabled.value = false;
		updateTextbox();
		Toast.showToast("An internal error occurred while processing your request.", { type: "error" });

		setTimeout(() => {
			updateState(knownStates.SUBMITTING);
			beDisabled.value = true;
			updateTextbox();
			setTimeout(() => {
				updateState(knownStates.OK);
				updateTextbox();

				setTimeout(() => {
					updateState(knownStates.NORMAL);
					beDisabled.value = false;
					updateTextbox();
				}, 1000);
			}, 2000);
		}, 2000);
	}, 2000);
};

</script>

<template>
	<div class="new-comment">
		<div class="w-full rounded flex gap-3">
			<img class="rounded-xl object-fill max-h-24 my-auto" :src="API.user.avatar" alt="avatar" />
			<Textbox :be-disabled="beDisabled" :handleInput="handleInput" :handleKeydown="handleKeydown"
				:handleSubmit="submitComment" :submitIcon="currentState.icon" :submitIconClasses="submitIconClasses">
			</Textbox>
		</div>
	</div>
</template>
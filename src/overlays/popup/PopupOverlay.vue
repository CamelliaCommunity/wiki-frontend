<script setup>
import { reactive, ref } from 'vue';
import Events from '@/utils/Events';
import Toast from '@/utils/Toast';
import { PhCheckFat, PhTrashSimple } from '@phosphor-icons/vue';

const props = defineProps({
	type: {
		type: String,
		validator(value) {
			return value == null || ['submitCancel', 'yesNo'].includes(value)
		}
	}
});

const content = ref();

const react = reactive({
	open: false,
});


Events.Register('popup-overlay', () => {
	console.log('event received');
	react.open = true;
});


document.addEventListener("keydown", e => {
	if (e.repeat) return;
	if (e.key == "Escape") Close(null);
});


function Close(e) {
	if (e && content?.value?.contains(e.target)) return;
	react.open = false;
}

// FUCK
function wipToast() {
	Close(null);
	Toast.showToast("FUCK", { type: "success" });
}

function wipToast2() {
	Close(null);
	Toast.showToast("FUCK2", { type: "success" });
}
</script>

<template>
	<Transition name="overlay">
		<div class="z-50 flex fixed justify-center items-center w-screen h-screen top-0 py-24 bg-opacity-25 backdrop-blur overflow-y-scroll"
			@click="Close" v-if="react.open">
			<div class="z-0 max-w-4xl bg-background-1 bg-opacity-90 backdrop-blur theShadow rounded-xl flex flex-col p-5 gap-1"
				ref="content">
				<div class="flex grow">
					<div class="justify-center text-lg w-full flex mb-3">
						<p>
							<slot></slot>
						</p>
					</div>
				</div>
				<!-- skibidi - john -->
				<div v-if="props.type === 'yesNo'" class="flex justify-center gap-2">
					<button
						class="colorButton1 flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
						@click="wipToast">Yes
						<PhCheckFat :size="18" weight="fill" />
					</button>
					<button
						class="colorButton2 flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
						@click="wipToast2">No
						<PhTrashSimple :size="18" weight="fill" />
					</button>
				</div>

				<div v-if="props.type === 'submitCancel'" class="flex justify-center gap-2">
					<button
						class="colorButton1 flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
						@click="wipToast">Continue
						<PhCheckFat :size="18" weight="fill" />
					</button>
					<button
						class="colorButton2 flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
						@click="wipToast2">Cancel
						<PhTrashSimple :size="18" weight="fill" />
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style>
.overlay-enter-active,
.overlay-leave-active {
	transition: opacity 150ms, transform 300ms;

	>div {
		transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
	}
}

.overlay-leave-to,
.overlay-enter-from {
	opacity: 0;

	>div {
		transform: scale(.95);
	}
}

.theShadow {
	box-shadow: 0 32px 40px 0 rgba(0, 0, 0, 0.24), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1);
}

.colorButton1 {
	background-color: rgba(0, 255, 0, 0.4);
}

.colorButton2 {
	background-color: rgba(221, 0, 0, 0.4);
}
</style>

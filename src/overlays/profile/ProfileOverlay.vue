<script setup>
import { reactive, ref } from 'vue';

import Events from '@/utils/Events';
import API from '@/utils/API';

import TitleBar from '../TitleBar.vue';

import Toast from '@/utils/Toast';

import PopupOverlay from '../popup/PopupOverlay.vue';
import { PhCheckFat, PhTrashSimple } from '@phosphor-icons/vue';

const content = ref();

const react = reactive({
	open: false,
	user: {}
});

const CacheSystem = {
	users: {},
	refresh: 15, // In seconds
};

Events.Register('profile-overlay', (userID) => {
	let toRefresh = true;
	if (CacheSystem[userID]) {
		if (Date.now() < CacheSystem[userID].refreshedAt + (CacheSystem.refresh * 1000))
			toRefresh = false;
	};
	console.log("looking up user using cache? " + ((CacheSystem[userID] !== undefined) ? "yes" : "no"));

	if (toRefresh) {
		let profileData = API.get(`/profile/${userID}`);
		CacheSystem[userID] = {
			data: profileData,
			refreshedAt: Date.now()
		};
		react.user = profileData;
	};

	react.open = true;
})

document.addEventListener("keydown", e => {
	if (e.repeat)
		return;

	if (e.key == "Escape")
		Close(null);

	if (e.key == "p" && API.user.loggedIn) {
		if (react.open) Close(null);
		else react.open = true;
	};
})

function Close(e) {
	if (e && content?.value?.contains(e.target))
		return;

	react.open = false;
	react.user = {};
}

// temporary functions - john
function wipToast() {
	Toast.showToast("That feature is not implemented yet but will be soon!", { type: "error" })
}

function logOut() {
	if (API.user.loggedIn) API.performLogout()
}
</script>

<template>
	<Transition name="overlay">
		<div class="z-50 flex fixed justify-center items-center w-screen h-screen top-0 py-24 bg-opacity-25 backdrop-blur overflow-y-scroll"
			@click="Close" v-if="react.open">
			<div class="z-0 w-content-width min-h-full bg-background-1 bg-opacity-90 backdrop-blur theShadow rounded-xl flex flex-col p-5 gap-1"
				ref="content">
				<TitleBar :close="Close" />
				<div class="flex grow">
					<div class="w-full flex mb-2.5"></div>
				</div>
				<!-- the log out button is temporary - john -->
				<p class="text-lg text-red bottom-0 justify-center mx-auto cursor-pointer" @click="logOut">
					Log Out</p>
				<PopupOverlay event="open-popup2">
					<template #header>
						<p class="text-lg text-red bottom-0 justify-center mx-auto cursor-pointer">Log Out2</p>
					</template>
					<template #content></template>
					<template #footer>
						<div class="flex justify-center gap-2">
							<button
								class="colorButtonSuccess flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
								@click="() => { Close(null); }">Continue
								<PhCheckFat :size="18" weight="fill" />
							</button>
							<button
								class="colorButtonError flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
								@click="() => { Close(null); }">Cancel
								<PhTrashSimple :size="18" weight="fill" />
							</button>
							<button
								class="colorButtonDefault flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
								@click="() => { Close(null); }">Ok
								<PhCheckFat :size="18" weight="fill" />
							</button>
						</div>
					</template>
				</PopupOverlay>
				<!-- todo: make the popup a button or something idk -->
				<p class="text-lg text-red bottom-0 justify-center mx-auto cursor-pointer" @click="wipToast">Report
					Profile</p>
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
</style>
<script setup>
// Packages
import { ref } from 'vue';

// Icons / Components
import { PhGearSix, PhUserGear, PhGithubLogo, PhLockKey, PhSignOut, PhLinkSimple, PhLinkBreak } from '@phosphor-icons/vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import Button from '@/components/Button.vue';
import PopupOverlay from '@/overlays/popup/PopupOverlay.vue';
import Textbox from '@/components/textbox/Textbox.vue';
import API from '@/utils/API';
import Events from '@/utils/Events';
import ProfileCard from '@/components/ProfileCard.vue';
import GrayLine from '@/components/GrayLine.vue';


let page = ref(0);

function setvalue(num) {
	page.value = num;
}

/*
switch (id) {
	case "github":
		page.value=1;
	break;
	case "privacy":
		page.value=2;
	break;
	default:
		page.value=0;
	break;
}
*/

// logs out then closes the popup - john
function logOut(ClosePopup) {
	if (API.user.loggedIn) {
		API.performLogout();
		ClosePopup();
	}
}

// test
let about_me = 1;

/*
gotta base on working this thing bcz it might require 3 sites due to options...
(idk maybe 1 site is enough if I mess around)

one site is enough - john


Looks like I gotta use v-if, v-else-if n ternary operator stuffs
but I'll keep multiple routes for now as no alts to control the page exists ~ Hikari (t404)


changed so you dont have to change page, removed routing for /settings/{...}, should try implementing hash
*/
//Almost spaghetti html xDDD
// it is - john
</script>
<template>
	<!-- TODO: REPLACE PADDING LAYOUTS WITH FLEXBOXES
	FIX POPUPS
	ADD GITHUB SUPPORT? -->

	<!-- popups seriously need to be rethought - john -->
	<PopupOverlay event="popup-logout">
		<template #content>Are you very sure you want to logout?</template>
		<template #footer="{ ClosePopup }">
			<div class="flex justify-center gap-2">
				<Button type="success" @click="logOut(ClosePopup)">Yes</Button>
				<Button type="error" @click="ClosePopup">Cancel</Button>
			</div>
		</template>
	</PopupOverlay>
	<div class="w-full xl:w-content-width max-h-full mx-auto py-8">
		<div class="flex items-center px-5 py-2">
			<PhGearSix class="size-9" />
			<h1 class="text-2xl font-semibold text-center p-2">Settings</h1>
		</div>
		<GrayLine />
		<div class="flex flex-row w-full xl:w-content-width max-h-full mx-auto py-3 gap-4">
			<div class="w-1/3">
				<!-- there should not be divs inside buttons like this -john -->
				<button @click="setvalue(0)" class="w-full">
					<div :class="[(page === 0) ?
						'border-l-accent text-white' : 'border-l-background-2']"
						class="transition flex flex-row items-center text-left cursor-pointer p-3 border-l-2 text-light-gray hover:border-l-accent hover:text-white">
						<PhUserGear class="size-8"></PhUserGear>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">General</p>
							<p class="text-lg leading-6">Edit General Settings</p>
						</div>
					</div>
				</button>
				<button @click="setvalue(1)" class="w-full">
					<div :class="[(page === 1) ?
						'border-l-accent text-white' : 'border-l-background-2']"
						class="transition flex flex-row items-center text-left cursor-pointer p-3 border-l-2 text-light-gray hover:border-l-accent hover:text-white">
						<PhGithubLogo class="size-8"></PhGithubLogo>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">Github</p>
							<p class="text-lg leading-6">Link your GitHub Account</p>
						</div>
					</div>
				</button>
				<button @click="setvalue(2)" class="w-full">
					<div :class="[(page === 2) ?
						'border-l-accent text-white' : 'border-l-background-2']"
						class="transition flex flex-row items-center text-left cursor-pointer p-3 border-l-2 text-light-gray hover:border-l-accent hover:text-white">
						<PhLockKey class="size-8"></PhLockKey>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">Privacy</p>
							<p class="text-lg leading-6">Edit Account Privacy</p>
						</div>
					</div>
				</button>
				<GrayLine />
				<button
					class="transition w-full flex flex-row items-center text-left cursor-pointer p-3 border-l-2 border-l-background-2 text-red hover:border-l-accent-soft hover:text-accent-soft"
					@click="Events.Emit('popup-logout')">
					<PhSignOut class="size-8"></PhSignOut>
					<div class="px-2">
						<p class="text-xl font-medium leading-6">Logout</p>
						<p class="text-lg leading-6">Log out of your Account</p>
					</div>
				</button>
			</div>
			<!-- the actual page content -->
			<div class="w-2/3">
				<div v-if="page === 0">
					<p class="text-lg pb-2">You may only edit profile pictures and banners in Discord!</p>
					<!-- i cant be fucked to fix profilecard from getting the flex treatment - john -->
					<ProfileCard :user="API.user" />
					<div class="flex flex-col gap-4 pt-4">
						<div v-if="about_me">
							<h1 class="text-2xl font-medium pb-1">About Me</h1>
							<!-- <input class="flex w-full rounded-lg bg-background-1 py-2">
						</input> -->
							<Textbox placeholder-text="Insert some text here." box-name="aboutme" :simple="true" />
							<!-- When bio's exist, fetch the data and place with :value="" to autofill the bio in. -->
						</div>
						<div class="grid grid-cols-2 gap-x-2 gap-y-4">
							<div>
								<h1 class="text-2xl font-medium pb-1">Site Language</h1>
								<div class="flex rounded-xl bg-background-3 p-3 text-lg h-12">
									idk
								</div>
							</div>
							<div>
								<h1 class="text-2xl font-medium pb-1">Date Format</h1>
								<select name="date_format"
									class="flex w-full rounded-xl bg-background-3 p-3 text-lg h-12">
									<option value=1></option>
								</select>
							</div>
							<div>
								<h1 class="text-2xl font-medium pb-1">Editor Font Style</h1>
								<select name="font_style"
									class="flex w-full rounded-xl bg-background-3 p-3 text-lg h-12">
									<option value="default">Default (Author)</option>
									<option value="monospace">Monospace</option>
									<option value="sans-serif">Sans Serif</option>
									<option value="serif">Serif</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div v-else-if="page === 1">
					<BlockquoteNote title="A tip for you" type="tip">
						In order to contribute and create articles a GitHub
						account must be linked. This is so we can receive changes on your behalf.
					</BlockquoteNote>
					<p class="text-lg">Github Account</p>
					<!-- <div class="flex rounded-lg bg-background-1 py-2 px-4">
						<img class="rounded-lg h-12" :src="[github_avatar ?
							github_avatar : '/src/assets/images/avatar.png']" alt="avatar">
						<h1 class="text-2xl font-semibold px-2 py-2">{{ github_username ?
							github_username : "No Github account found." }}</h1>
					</div> -->

					<!-- replace this shit with a github version - john -->
					<ProfileCard :user="API.user" />
					<div class="flex flex-col items-end" v-if="!github_acc">
						<Button @click="github_login">
							<p class="font-medium">Link GitHub Account</p>
							<PhLinkSimple :size="18"></PhLinkSimple>
						</Button>
					</div>
					<div class="flex-col items-end" v-else>
						<Button @click="github_logout">
							<p class="font-medium">Unlink GitHub Account</p>
							<PhLinkBreak :size="18"></PhLinkBreak>
						</Button>
					</div>
				</div>
				<div v-else-if="page === 2">
					<p class="text-lg">Account Privacy</p>
				</div>
			</div>
		</div>
	</div>
</template>

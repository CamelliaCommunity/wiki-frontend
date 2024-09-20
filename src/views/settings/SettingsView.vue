<script setup>
// Packages
import { ref } from 'vue';

// Icons / Components
import { PhGearSix, PhUserGear, PhGithubLogo, PhLockKey, PhSignOut, PhLinkSimple, PhLinkBreak } from '@phosphor-icons/vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';



let page = ref(0);

function setvalue(num) {
	page.value=num;
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


/*
gotta base on working this thing bcz it might require 3 sites due to options...
(idk maybe 1 site is enough if I mess around)

one site is enough - john


Looks like I gotta use v-if, v-else-if n ternary operator stuffs
but I'll keep multiple routes for now as no alts to control the page exists ~ Hikari (t404)


changed so you dont have to change page, removed routing for /settings/{...}, should try implementing hash
*/
//Almost spaghetti html xDDD
</script>
<template>
	<div class="w-full xl:w-content-width max-h-full mx-auto py-8">
		<div class="flex items-center px-5 py-2">
			<PhGearSix class="size-9" />
			<h1 class="text-2xl font-semibold text-center px-2 py-2">Settings</h1>
		</div>

		<div class="gray-line opacity-40"></div>

		<div class="flex flex-row w-full xl:w-content-width max-h-full mx-auto py-3 gap-4">

			<div class="w-1/3">

				<button @click="setvalue(0)">
					<div :class="[( page === 0 ) ?
						'border-l-accent text-white' : 'border-l-background-2']" 
						class="transition flex flex-row items-center text-left cursor-pointer py-2 pl-4 pr-20 
                border-l-2 text-light-gray hover:border-l-accent hover:text-white">

						<PhUserGear class="size-8"></PhUserGear>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">General</p>
							<p class="text-lg leading-6">Edit General Settings</p>
						</div>

					</div>
				</button>

				<button @click="setvalue(1)">
					<div :class="[( page === 1 ) ?
						'border-l-accent text-white' : 'border-l-background-2']" 
						class="transition flex flex-row items-center text-left cursor-pointer py-2 pl-4 pr-20 
        		border-l-2 text-light-gray hover:border-l-accent hover:text-white">

						<PhGithubLogo class="size-8"></PhGithubLogo>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">Github</p>
							<p class="text-lg leading-6">Link your GitHub Account</p>
						</div>

					</div>
				</button>
				<button @click="setvalue(2)">
					<div :class="[( page === 2 ) ? 
						'border-l-accent text-white' : 'border-l-background-2']" 
						class=" transition flex flex-row items-center text-left cursor-pointer py-2 pl-4 pr-20 
         		border-l-2 text-light-gray hover:border-l-accent hover:text-white">

						<PhLockKey class="size-8"></PhLockKey>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">Privacy</p>
							<p class="text-lg leading-6">Edit Account Privacy</p>
						</div>

					</div>
				</button>

				<div class="gray-line opacity-40"></div>


				<div @click="API.user" class="transition flex flex-row items-center cursor-pointer py-2 px-2 pl-4
         		border-l-2 border-l-background-2 text-red 
				hover:border-l-accent-soft hover:text-accent-soft">

					<PhSignOut class="size-8"></PhSignOut>
					<div class="px-2">
						<p class="text-xl font-medium leading-6">Logout</p>
						<p class="text-lg leading-6">Log out of your Account</p>
					</div>

				</div>
			</div>
			<div class="w-2/3">
				<div v-if="page===0">
					<p class="text-lg">You may only edit profile pictures and banners in Discord!</p>
				</div>

				<div class="max-h-full mx-auto py-2 gap-4" v-else-if="page===1">
					<BlockquoteNote title="A tip for you" type="tip">
						<p class="text-lg py-1">In order to contribute and create articles a GitHub
							account must be linked. This is so we can receive changes on your behalf.</p>
					</BlockquoteNote>

					<p class="text-lg py-4">Github Account</p>

					<div class="flex rounded-lg bg-background-1 py-2 px-4">
						<img class="rounded-lg h-12" :src="[github_avatar ?
							github_avatar : '/src/assets/images/avatar.png']" alt="avatar">

						<h1 class="text-2xl font-semibold px-2 py-2">{{ github_username ?
							github_username : "No Github account found." }}</h1>

					</div>

					<div class="py-4 flex flex-row-reverse" v-if="!github_acc">
						<button class="transition flex items-center justify-center right
						bg-background-header-buttons hover:bg-background-3
						p-2 rounded-xl text-lg cursor-pointer" @click="github_login">
							<PhLinkSimple :size="18"></PhLinkSimple>
							<h3 class="pl-1 font-medium">Link GitHub Account</h3>
						</button>
					</div>
					<div class="py-4 flex flex-row-reverse" v-else>
						<button class="transition flex items-center justify-center right
						bg-background-header-buttons hover:bg-background-3
						p-2 rounded-xl text-lg cursor-pointer" @click="github_logout">
							<PhLinkBreak :size="18"></PhLinkBreak>
							<h3 class="pl-1 font-medium">Unlink GitHub Account</h3>
						</button>
					</div>
				</div>

				<div v-else-if="page===2">

					<p class="text-lg">Account Privacy</p>
				</div>

			</div>

		</div>
	</div>
</template>

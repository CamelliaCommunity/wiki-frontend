<script setup>
//packages

//icons
import { PhGearSix, PhUserGear, PhGithubLogo, PhLockKey, PhSignOut } from '@phosphor-icons/vue';

/*
gotta base on working this thing bcz it might require 3 sites due to options...
(idk maybe 1 site is enough if I mess around)

one site is enough - john


Looks like I gotta use v-if, v-else-if n ternary operator stuffs
but I'll keep multiple routes for now as no alts to control the page exists ~ Hikari (t404)
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

			<div class="flex-column">

				<a href="/settings/general">
					<div :class="[($route.params.id === 'general' || !$route.params.id) ?
						'border-l-accent text-white' : 'border-l-background-2']" 
						class="flex flex-row items-center cursor-pointer py-2 pl-4 pr-20 
                border-l-2 text-light-gray hover:border-l-accent hover:text-white">

						<PhUserGear class="size-8"></PhUserGear>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">General</p>
							<p class="text-lg leading-6">Edit General Settings</p>
						</div>

					</div>
				</a>

				<a href="/settings/github">
					<div :class="[($route.params.id === 'github') ?
						'border-l-accent text-white' : 'border-l-background-2']" 
						class="flex flex-row items-center cursor-pointer py-2 pl-4 pr-20 
        		border-l-2 text-light-gray hover:border-l-accent hover:text-white">

						<PhGithubLogo class="size-8"></PhGithubLogo>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">Github</p>
							<p class="text-lg leading-6">Link your GitHub Account</p>
						</div>

					</div>
				</a>
				<a href="/settings/privacy">
					<div :class="[($route.params.id === 'privacy') ?
						'border-l-accent text-white' : 'border-l-background-2']" 
						class="flex flex-row items-center cursor-pointer py-2 pl-4 pr-20 
         		border-l-2 text-light-gray hover:border-l-accent hover:text-white">

						<PhLockKey class="size-8"></PhLockKey>
						<div class="px-2">
							<p class="text-xl font-medium leading-6">Privacy</p>
							<p class="text-lg leading-6">Edit Account Privacy</p>
						</div>

					</div>
				</a>

				<div class="gray-line opacity-40"></div>


				<div class="flex flex-row items-center cursor-pointer py-2 px-2 pl-4
         		border-l-2 border-l-background-2 text-red 
				hover:border-l-accent-soft hover:text-accent-soft">

					<PhSignOut class="size-8"></PhSignOut>
					<div class="px-2">
						<p class="text-xl font-medium leading-6">Logout</p>
						<p class="text-lg leading-6">Log out of your Account</p>
					</div>

				</div>
			</div>

			<div class="flex-column">

				<div v-if="$route.params.id === 'general' || !$route.params.id">
					<p class="text-lg">You may only edit profile pictures and banners in Discord!</p>
				</div>

				<div v-else-if="$route.params.id === 'github'">
					<p class="text-lg">Github Account</p>
				</div>

				<div v-else-if="$route.params.id === 'privacy'">
					<p class="text-lg">Account Privacy</p>
				</div>

			</div>

		</div>
	</div>
</template>

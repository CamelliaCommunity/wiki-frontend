<script setup>
//packages

//icons
import { PhGearSix, PhUserGear, PhGithubLogo, PhLockKey, PhSignOut, PhLockKeyOpen } from '@phosphor-icons/vue';

/*
gotta base on working this thing bcz it might require 3 sites due to options... 
(idk maybe 1 site is enough if I mess around)
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


		<div class="flex flex-row w-full xl:w-content-width max-h-full mx-auto py-8">
			<div class="flex-column">
				<div class="flex flex-row items-center cursor-pointer py-2 pl-4 pr-20 
         border-l-2 border-l-background-2 hover:border-l-accent">
					<PhUserGear class="size-8"></PhUserGear>
					<div class="px-2">
						<p class="text-xl font-medium">General</p>
						<p class="test-lg">Edit General Settings</p>
					</div>
				</div>
				<div class="flex flex-row items-center cursor-pointer py-2 pl-4 pr-20 
         border-l-2 border-l-background-2 hover:border-l-accent">
					<PhGithubLogo class="size-8"></PhGithubLogo>
					<div class="px-2">
						<p class="text-xl font-medium">Github</p>
						<p class"test-lg">Link you GitHub Account</p>
					</div>
				</div>
				<div class="flex flex-row items-center cursor-pointer py-2 pl-4 pr-20 
         border-l-2 border-l-background-2 hover:border-l-accent">
					<PhLockKey class="size-8"></PhLockKey>
					<div class="px-2">
						<p class="text-xl font-medium">Privacy</p>
						<p class"test-lg">Edit Account Privacy</p>
					</div>
				</div>
		    	<div class="gray-line opacity-40"></div>
				<div class="flex flex-row items-center cursor-pointer py-2 px-2 pl-4
         border-l-2 border-l-background-2 text-red fill-red hover:fill-accent-soft
				  hover:border-l-accent-soft hover:text-accent-soft">
					<PhSignOut class="size-8"></PhSignOut>
					<div class="px-2">
						<p class="text-xl font-medium">Logout</p>
						<p class"test-lg">Log out of your Account</p>
					</div>
				</div>
			</div>
			<div class="flex-column  pl-2">
				<p class="text-lg">You may only edit profile pictures and banners in Discord!</p>
			</div>
		</div>
	</div>
</template>
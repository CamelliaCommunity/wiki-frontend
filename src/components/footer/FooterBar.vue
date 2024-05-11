<script setup>
import FooterLink from "./FooterLink.vue";

</script>

<template>
<div class="w-full relative mt-4 flex h-24 flex-col rounded-t-2xl bg-background-3">
	<div class="w-full h-4 bg-background-1">
		<div class="w-full h-4 bg-background-2 rounded-b-2xl"></div>
	</div>
	<div class="w-full h-16 justify-center text-center rounded-b-2xl bg-background-1 p-1">
		<p class="text-xl">
			Created by
			<FooterLink url="https://github.com/CamelliaCommunity/wiki-frontend" text="pptek" />
			with the contribution of
			<FooterLink url="https://github.com/CamelliaCommunity/wiki-frontend/graphs/contributors" text="others" />.
		</p>
		<p class="flex text-lg justify-center align-middle gap-2">
			<FooterLink url="/legal/terms" text="Terms of Service" />
			<span class="relative bottom-0.5 text-xl">&bull;</span>
			<FooterLink url="/legal/privacy" text="Privacy Policy" />
		</p>
	</div>
</div>
</template>

<style>

</style>
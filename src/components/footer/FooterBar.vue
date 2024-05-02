<script setup>
import FooterLink from "./FooterLink.vue";

</script>

<template>
<div class="w-screen relative h-20 bottom-0 mt-4 rounded-t-2xl">
	<div class="bg-background-3 h-4 w-screen md:w-layout-width absolute bottom-0 z-40"></div>
	<div class="bg-background-1 h-16 w-screen md:w-layout-width absolute rounded-b-2xl justify-center text-center p-1 mb-2">
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
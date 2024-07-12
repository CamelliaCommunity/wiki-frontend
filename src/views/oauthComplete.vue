<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const hash = route.hash;

if (!hash) router.push("/"); // Redirect to home page.

import Utils from '@/utils/Utils';

Utils.setTitle("OAuth Complete");

// Talk back to the original page
var split = hash.replace("#", "").split("&");
var token = "";

for (var i = 0; i < split.length; i++) {
    var key = split[i];
    var split2 = key.split("=");

    if (split2[0] == "access_token") {
        token = split2[1];
    };
};

window.addEventListener("message", (event) => {
	if (!event.source) { console.log("There wasn't a source."); return; }
	if (event.origin !== window.location.origin) { console.log("Origin doesn't match, aborting!"); return; }

	event.source.postMessage({ token });
});
</script>

<template>
	<div class="flex flex-col items-center justify-center mt-32 p-8 rounded-2xl gap-3 bg-background-3">
		<!-- <img :src="CameCry" class="h-20 w-20" /> -->
		<div class="flex flex-col w-fit items-center leading-tight">
			<h1 class="text-3xl font-extrabold">OAUTH COMPLETE</h1>
			<p class="text-2xl">One moment, please!</p>
			<p class="text-1xl">This window should close automatically.</p>
		</div>
	</div>
</template>

<style>

</style>
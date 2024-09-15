<script setup>
import API from '@/utils/API';

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
</script>

<template>
	<div class="new-comment">
		<div class="w-full rounded flex gap-3">
			<img class="rounded-xl object-fill max-h-24 my-auto" :src="API.user.avatar" alt="avatar" />
			<Textbox :be-disabled="loaded ? error : true"></Textbox>
		</div>
	</div>
</template>
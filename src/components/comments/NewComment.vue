<script setup>
import Textbox from '../textbox/Textbox.vue';

import API from '@/utils/API';

</script>

<template>
	<div class="new-comment">
		<div class="w-full rounded flex gap-3">
			<img class="rounded-xl object-fill max-h-24 my-auto" :src="API.user.avatar" alt="avatar" />
			<Textbox></Textbox>
		</div>
	</div>
</template>
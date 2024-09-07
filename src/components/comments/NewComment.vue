<script setup>
import Textbox from '../textbox/Textbox.vue';

import API from '@/utils/API';

</script>

<template>
	<div class="new-comment">
		<div class="w-full h-20 rounded flex gap-3">
			<img class="rounded-xl object-fill" :src="API.user.avatar" alt="avatar" />
			<Textbox></Textbox>
		</div>
	</div>
</template>
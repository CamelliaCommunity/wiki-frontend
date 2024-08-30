<script setup>

import { PhX } from '@phosphor-icons/vue';
import GradientLine from '@/components/GradientLine.vue';

defineProps({
	close: Function
});
</script>

<template>
	<div class="flex w-full mb-2">
		<p class="text-4xl font-bold w-full">Profile</p>
		<div class="bg-background-3 p-3 flex justify-center items-center rounded-lg hover:bg-background-4 theShadow cursor-pointer" @click="close(null)">
			<PhX :size="16" @click="close(null)" />
		</div>
	</div>
	<GradientLine :overshoot="false" class="mb-2" />
</template>
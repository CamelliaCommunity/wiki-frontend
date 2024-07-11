<script setup>
import { PhPaperPlaneTilt, PhTextBolder, PhTextItalic, PhTextUnderline } from '@phosphor-icons/vue';

import DefaultAvatar from '@/assets/images/avatar.png';
</script>

<template>
	<div class="new-comment">
		<div class="w-full h-16 rounded flex gap-3">
			<img class="rounded-xl size-16 object-fill" :src="DefaultAvatar" alt="avatar" />
			<div class="w-full flex flex-col rounded-xl bg-background-3 p-1 gap-1">
				<div class="w-full flex gap-1">
					<textarea class="h-9 w-full resize-none overflow-hidden rounded-lg bg-background-2 px-3 py-1.5 text-sm outline-none" placeholder="Soon(TM)  Press enter to post. Use shift+enter to make a new line." disabled />
					<div class="m-auto flex size-9 items-center justify-center rounded-lg bg-background-4 p-1">
						<PhPaperPlaneTilt :size="20" />
					</div>
				</div>
				<div class="w-auto flex px-1">
					<PhTextBolder :size="16" />
					<PhTextItalic :size="16" />
					<PhTextUnderline :size="16" />
				</div>
			</div>
		</div>
	</div>
</template>
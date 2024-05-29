<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import { PhCaretRight, PhPaperPlaneRight, PhTextBolder, PhTextItalic, PhTextUnderline } from '@phosphor-icons/vue';

import DefaultAvatar from '@/assets/images/avatar.png';
</script>

<template>
	<div class="new-comment">
		<div class="w-full h-16 rounded flex gap-4">
			<img class="rounded-lg" :src="DefaultAvatar" alt="avatar" />
			<div class="w-full flex flex-col rounded-lg bg-background-3">
				<div class="w-auto flex rounded-lg pl-1 pr-1 m-1 gap-1">
					<textarea class="new-comment-box w-full rounded-lg pl-2 pr-2 m-auto resize-none overflow-hidden outline-none h-8 pt-1 pb-1 bg-background-2 text-sm" placeholder="Soon(TM)  Press enter to post. Use shift+enter to make a new line." disabled/>
					<div class="m-auto rounded-lg p-1 bg-background-4"><PhPaperPlaneRight :size="24" /></div>
				</div>
				<div class="w-auto flex pl-3 pr-3">
					<PhTextBolder :size="18" />
					<PhTextItalic :size="18" />
					<PhTextUnderline :size="18" />
				</div>
			</div>
		</div>
	</div>
</template>
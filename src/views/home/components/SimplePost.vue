<script setup>
import { RouterLink } from 'vue-router';

import GradientLine from '@/components/GradientLine.vue';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="flex min-h-9 w-full flex-col rounded-lg bg-background-3">
        <h1 class="text-3xl font-semibold px-6 py-4">{{ post.meta.title || "post title" }}</h1>
        <GradientLine  :overshoot="false" />
        <div class="w-full flex-col px-6 py-4 gap-3">
            <p class="text-lg w-full leading-tight break-words whitespace-pre-wrap">{{ post.meta.description || "post description" }}</p>
            <RouterLink v-if="post.url" :to="post.url || '/not-found'" class="w-full text-right text-lg">
                <p class="text-base text-accent cursor-pointer readMoreHover">Read More</p>
            </RouterLink>
        </div>
    </div>
</template>

<style>
    .readMoreHover:hover {
        text-decoration: underline;
        color: #F68384;
    }
</style>
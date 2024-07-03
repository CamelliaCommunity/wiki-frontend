<script setup>
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
        <h1 class="text-3xl font-semibold px-6 py-4">{{ post.title || "post title" }}</h1>
        <GradientLine  :overshoot="false" />
        <p class="text-lg w-full px-6 py-4 leading-tight break-words">{{ post.description || "post description" }}</p>
    </div>
</template>
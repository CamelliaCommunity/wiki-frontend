<script setup>
import LoadingImage from '../LoadingImage.vue';

const props = defineProps({
    url: String,
    alt: String
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <LoadingImage :src="url" class="rounded-xl" />
        <p class="text-light-gray text-center">{{ alt }}</p>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';

import SidebarTestImage from '@/assets/images/testing-image-2.png';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <RouterLink :to="post.url">
        <div class="overlap-grid sidebar-post h-44 rounded-lg">
            <img :src="post.image || SidebarTestImage" alt="card background" class="object-cover">
            <div class="sidebar-image-dim"></div>
            <div class="flex flex-col justify-end p-3">
                <h2 class="text-xl font-semibold line-clamp-3 leading-tight">{{ post.title }}</h2>
                <p class="text-base leading-tight">by {{ post.author }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<style>
.sidebar-post {
    .sidebar-image-dim {
        transition: background 200ms;
        background: rgba(0, 0, 0, 0.2) linear-gradient(180deg, transparent 0%, var(--background-4) 100%);
    }

    &:hover > .sidebar-image-dim {
        transition: background 50ms;
        background: rgba(0, 0, 0, 0.0) linear-gradient(180deg, transparent 0%, var(--background-4) 100%);
    }
}

</style>
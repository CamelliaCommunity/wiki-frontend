<script setup>
import { RouterLink } from 'vue-router';

import Formatting from '@/utils/Formatting';

const props = defineProps({
    postType: {
        type: String
    },
    alternativeBackground: {
        type: Boolean,
        default: false
    },
    post: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="featured-post h-52">
        <img src="/src/assets/images/testing-image.png" alt="card background" class="object-cover">
        <div class="dim" v-if="alternativeBackground"></div>
        <div class="radial-dim" v-else></div>
        <div class="card-content">
            <div>
                <div class="flex justify-between">
                    <h3 class="text-lg font-semibold">{{ postType }}</h3>
                    <h3 class="text-base font-medium">{{ Formatting.formatDate(post.date) }}</h3>
                </div>
                <h2 class="text-2xl font-medium">{{ post.title }}</h2>
            </div>

            <div>
                <p class="post-description leading-tight">{{ post.description }}</p>
                <RouterLink :to="post.url">
                    <p class="text-base font-medium text-accent cursor-pointer">Read More</p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.featured-post {
    width: 100%;
    display: grid;
    border-radius: 8px;
    overflow: hidden;

    > * {
        width: 100%;
        height: 100%;
        grid-area: 1 / 1;
    }

    .dim {
        background: rgba(0, 0, 0, 0.4) linear-gradient(180deg, transparent 0%, var(--background-1) 80%);
    }

    .radial-dim {
        background: radial-gradient(circle at 100% 0%, transparent, var(--background-1) 70%);
    }

    .card-content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: space-between;

        > div {
            display: flex;
            flex-direction: column;
        }

        .post-description {
            width: 450px;
            font-size: 18px;
            max-height: 3em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
        }
    }
}
</style>
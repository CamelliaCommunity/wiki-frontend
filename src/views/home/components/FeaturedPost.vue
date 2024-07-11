<script setup>
import { RouterLink } from 'vue-router';

import TestImage from '@/assets/images/test-image-sherii.png';
import TestImage2 from '@/assets/images/test-image-banginburst.png';
import EmptyImage from '@/assets/images/empty.png';

import Formatting from '@/utils/Formatting';

const props = defineProps({
    postType: {
        type: String
    },
    linearBackground: {
        type: Boolean,
        default: false
    },
    post: {
        type: Object,
        required: true
    },
    otherImage: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="featured-post w-full h-52" v-if="post.meta">
        <img :src="post.meta.image || (otherImage ? TestImage2 : TestImage) || EmptyImage" class="object-cover">
        <div class="dim" v-if="linearBackground"></div>
        <div class="radial-dim" v-else></div>
        <div class="card-content">
            <div>
                <div class="flex justify-between">
                    <h3 class="text-lg font-semibold">{{ postType }}</h3>
                    <h3 class="text-base font-medium">{{ Formatting.formatDate(post.meta.date) }}</h3>
                </div>
                <h2 class="text-2xl font-medium">{{ post.meta.title }}</h2>
            </div>

            <div>
                <p class="post-description w-full md:w-96 leading-tight">{{ post.meta.description }}</p>
                <RouterLink :to="post.url || '/not-found'" class="w-fit">
                    <p class="text-base font-medium text-accent cursor-pointer">Read More</p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.featured-post {
    display: grid;
    border-radius: 8px;
    overflow: hidden;

    > * {
        width: 100%;
        height: inherit;
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
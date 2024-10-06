<script setup>
import { reactive } from 'vue';
import API from '@/utils/API';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import FeaturedPost from '@/views/home/components/FeaturedPost.vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    layout: {
        type: String,
        required: false
    }
});

const articlePlaceholders = {
    loading: {
        title: 'loading...',
        description: 'we are still fetching this for you...',
        date: -1,
    },
    none: {
        title: 'No content.',
        description: '',
        date: -1
    },
    error: {
        title: 'Oh no!',
        description: 'Something went wrong while loading this... :(',
        date: -1
    }
};

const react = reactive({
    // Random
    random: {
        meta: articlePlaceholders.loading,
        url: "/random"
    }
});

API.get("/articles/random").then((res) => {
    if (res.status == 200) react.random = res.data;
    else if (res.status == 204) react.random.meta = articlePlaceholders.none;
    else if (res.status >= 400 || !res.status) react.random.meta = articlePlaceholders.error;
});

// News
react.news = [];
API.get("/articles?type=news&count=3").then((res) => {
    if (res.status == 200) react.news = res.data;
});
</script>

<template>
    <template v-if="props.type === '1'">
        <img :src="props.image" class="object-cover" alt="Article Cover">
    </template>

    <template v-else-if="props.type === '2'">
        <!-- todo: proper random article link or something -->
        <BlockquoteNote class="border-x-0 rounded-lg" title="Wanna Read more? Here's a random post">
            <div class='text-3xl font-semibold mb-2'>Lorem Ipsum</div>
            <div class="mb-2">Lorem Ipsum</div>
            <a class="text-lg text-accent readMoreHover" target="_blank" href="https://x.com/spinnyternally">
                Click here to read
            </a>
        </BlockquoteNote>
        <!-- todo: next post and previous post (look in designs) -->
        <FeaturedPost class="w-full" post-type="Random Post" :post="react.random" linearBackground other-image />
        <FeaturedPost class="w-full" post-type="Random Post" :post="react.random" linearBackground other-image />
    </template>
</template>
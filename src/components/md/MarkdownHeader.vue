<script setup>
import { PhLinkSimple } from '@phosphor-icons/vue';
import GradientLine from '../GradientLine.vue';
import { useRoute, useRouter } from 'vue-router';

import Toast from '@/utils/Toast';

const route = useRoute();

const props = defineProps({
    text: String,
    level: Number
});

const headerId = props.text.toLowerCase().replace(/[^\w]+/g, '-');
const showLine = props.level === 2;
const showLinkIcon = props.level === 2 || props.level === 3;

function copyLink() {
    const url = route.fullPath + "#" + headerId;

    if (!navigator.clipboard) {
        Toast.showToast("Your browser does not support copying to the clipboard, sorry.")
        return;
    }

    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}${url}`)
            .then(() => Toast.showToast("Copied to clipboard!", { type: "success" }))
            .catch((err) => Toast.showToast("Error occurred copying to clipboard."))
}
</script>

<template>
    <div :class="'flex flex-row gap-2 items-center ' + (level === 2 ? 'justify-between' : '')">
        <component :is="'h' + level" v-html="text" :id="headerId" />
        <PhLinkSimple class="text-gray hover:text-light-gray transition-colors duration-200 hover:duration-50" @click="copyLink" :size="24" v-if="showLinkIcon" />
    </div>
    <GradientLine v-if="showLine" style="" />
</template>
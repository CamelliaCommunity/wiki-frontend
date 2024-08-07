<script setup>
import { createApp, onMounted, ref, watch } from 'vue';
import router from '@/router'

import LoadingImage from '../LoadingImage.vue';
import MarkdownHeader from './MarkdownHeader.vue';
import MarkdownImage from './MarkdownImage.vue';

import { PhLinkSimple } from '@phosphor-icons/vue';

const props = defineProps({
    article: {
        type: String,
        required: true
    }
});

const content = ref(null);

const renderMd = (htmlContent) => {
    const rendered = createApp({
        template: `${htmlContent}`,
        components: {
            LoadingImage,
            MarkdownHeader,
            MarkdownImage,
            PhLinkSimple
        }
    });
    
    rendered.use(router)

    if (content.value) {
        content.value.innerHTML = '';
        rendered.mount(content.value);
    }
};

watch(() => props.article, (article) => renderMd(article), { immediate: true });
onMounted(() => renderMd(props.article));

</script>

<template>
    <div class="md-content max-w-full" ref="content"></div>
</template>

<style lang="scss">
.md-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;

	/* this stupid thing should account for the navbar */
	h1, h2, h3 { scroll-margin-top: var(--nav-height); }

    h1 {
        font-size: 44px;
    }

    h2 {
        font-size: 36px;
		font-weight: 600;
    }

    h3 {
        font-size: 28px;
		font-weight: 500;
    }

    h4 {
        font-size: 24px;
    }

    h5 {
        font-size: 20px;
    }

    p {
        font-size: 18px;
    }

    a {
        color: var(--accent-1);

        &:hover {
            text-decoration: underline;
            color: #F68384;
        }
    }

    mark {
        color: inherit;
        margin: 0 -0.4em;
        padding: 0.1em 0.4em;
        border-radius: 0.8em 0.3em;
        background: transparent;
        // variables didnt work with this because they arent rgb. maybe im stupid! - john
        background-image: linear-gradient(
            105deg,
            transparent 0,
            transparent 0.3em,
            rgba(248, 118, 211, 0.7) 0.5em,
            rgba(248, 118, 211, 0.4) 1.6em,
            rgba(248, 118, 211, 0.4) calc(100% - 1.4em),
            rgba(248, 118, 211, 0.7) calc(100% - 0.5em),
            transparent calc(100% - 0.3em),
            transparent 100%
        );
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
        text-shadow: 0 0 0.75em var(--background-2);
    }

    ul, ol {
        padding-left: 20px;

        li {
            font-size: 18px;
            list-style-type: disc;
        }
    }

    blockquote {
        border-left: 4px solid var(--accent-1);
        padding-left: 20px;
        margin-left: 0;

        &.md-bq {
            border-left: none;
            background-color: var(--background-1);
            padding: 10px 15px;
            border-radius: 10px;

            // temporary design for bq types
            // get tanza to design this
            &.bq-tip {
                background-color: #54c6ff44;
            }

            &.bq-warning {
                background-color: #ffff5544;
            }

            &.bq-danger {
                background-color: #ff555544;
            }
        }
    }

    pre {
        width: 100%;
        background-color: var(--background-1);
        padding: 10px;
        border-radius: 10px;
        overflow-x: scroll;
    }

     /* TODO: remake codeblocks to be components instead */
    code {
        background-color: var(--background-1);
        padding: 2px 5px;
        border-radius: 5px;
        font-size: 16px;
        text-wrap: wrap;
    }

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            border: 1px solid var(--background-3);
            padding: 10px;
        }

        th {
            background-color: var(--background-1);
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }
}
</style>
<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { marked } from 'marked';

import MarkdownUtils from '@/utils/MarkdownUtils';
import Utils from '@/utils/Utils';

const baseUrl = 'https://raw.githubusercontent.com/CamelliaCommunity/Wiki/beta/';
const route = useRoute();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(1).join('/');

const react = reactive({
    article: '',
    sections: [],
    meta: {
        title: 'Untitled Article'
    }
});

let articleUrl = `${baseUrl}${path}.md`;

if (path === 'style-test') {
    articleUrl = 'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md';
}

fetch(articleUrl)
    .then((response) => response.text())
    .then((text) => {
        var md = MarkdownUtils.parse(text);
        console.log(text, md);

        var meta = md.metadata;
        react.meta = meta.title;
        Utils.setTitle(meta.title);

        react.article = MarkdownUtils.render(md.content);
        react.sections = md.sections;
    });
</script>

<template>
    <div class="article-md" v-html="react.article"></div>
</template>

<style lang="scss">
.article-md {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;

    h1 {
        font-size: 44px;
    }

    h2 {
        font-size: 36px;
    }

    h3 {
        font-size: 28px;
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
        text-decoration: underline;
    }

    mark {
        background-color: var(--accent-1-opaque);
        color: var(--background-1);
        padding: 2px 5px;
        border-radius: 5px;
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
    }

    pre {
        background-color: var(--background-1);
        padding: 10px;
        border-radius: 10px;
        overflow-x: auto;
    }

    code {
        background-color: var(--background-1);
        padding: 2px 5px;
        border-radius: 5px;
        font-size: 16px;
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
<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import MarkdownView from '@/components/md/MarkdownView.vue';
import GradientLine from '@/components/GradientLine.vue';

import MarkdownUtils from '@/utils/MarkdownUtils';
import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';

const baseUrl = 'https://raw.githubusercontent.com/CamelliaCommunity/Wiki/beta/';
const route = useRoute();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(1).join('/');

const react = reactive({
    article: '',
    sections: [],
    meta: {
    }
});

let articleUrl = `${baseUrl}${path}.md`;

if (path === 'style-test') {
    articleUrl = 'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md';
}

fetch(articleUrl)
    .then((response) => response.text())
    .then((text) => {
        // i think in the future we should make the backend do this and return
        // it with the api since it only needs to be done when the article is updated
        var md = MarkdownUtils.parse(text);
        console.log(text, md);

        var meta = md.metadata;
        react.meta = meta;
        Utils.setTitle(meta.title);

        react.article = MarkdownUtils.render(md.content);
        react.sections = md.sections;
    });
</script>

<template>
    <div class="article-page">
        <!-- breadcrumbs -->
        <div class="w-full h-16 bg-background-1 rounded-lg p-5 flex justify-between items-center mb-4">
            <h3 class="text-2xl font-semibold">{{ react.meta.title }}</h3>
            <p>written by {{ react.meta.author }} on {{ Formatting.formatDate(react.meta.date) }}</p>
        </div>
        <div class="article-content">
            <div class="article-contents w-72 min-w-72 h-fit bg-background-3 rounded-lg flex flex-col p-5">
                <h4 class="text-lg font-semibold">Contents</h4>
                <ol class="list-decimal list-inside">
                    <li v-for="section in react.sections" class="text-xl">
                        <a :href="'#' + section.id">{{ section.title }}</a>
                        <ul v-if="section.subsections.length > 0" class="list-disc list-inside pl-3">
                            <li v-for="subsection in section.subsections" class="text-lg">
                                <a :href="'#' + subsection.id">{{ subsection.title }}</a>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div class="article-body w-full pt-2">
                <h1 class="font-semibold text-4xl">{{ react.meta.title }}</h1>
                <GradientLine />
                <MarkdownView :article="react.article" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.article-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--content-width);
    margin: 0 auto;

    .article-content {
        width: 100%;
        display: flex;
        gap: 40px;

        .article-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
}
</style>
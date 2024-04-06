<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { marked } from 'marked';
import MarkdownUtils from '@/utils/MarkdownUtils';

const baseUrl = 'https://raw.githubusercontent.com/CamelliaCommunity/Wiki/beta/';
const route = useRoute();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(1).join('/');

const react = reactive({
    article: '',
});

fetch(`${baseUrl}${path}.md`)
    .then((response) => response.text())
    .then((text) => {
        var meta = MarkdownUtils.extractMetadata(text);
        var metaEnd = MarkdownUtils.getEndOfMetadataIndex(text);

        console.log(meta);
        
        text = text.substring(metaEnd + 1);
        react.article = marked.parse(text);
    });
</script>

<template>
    <div v-html="react.article"></div>
</template>
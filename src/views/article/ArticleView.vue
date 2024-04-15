<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import { PhCaretRight, PhPaperPlaneRight } from '@phosphor-icons/vue';

import DefaultAvatar from '@/assets/images/avatar.png';


import MarkdownView from '@/components/md/MarkdownView.vue';
import GradientLine from '@/components/GradientLine.vue';

import MarkdownUtils from '@/utils/MarkdownUtils';
import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';
import ArticleSkeleton from './ArticleSkeleton.vue';

const baseUrl = 'https://raw.githubusercontent.com/CamelliaCommunity/Wiki/beta/';
const route = useRoute();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(1).join('/');

// should also be done in the backend
// we could even have the backend
// return the proper titles for each part
const pathArray = path.split('/').map(p => {
    const index = pathSplit.indexOf(p);
    const words = p.replace('-', ' ').replace('_', ' ').split(' ');

    words.forEach((word, index) => {
        words[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });

    return {
        link: pathSplit.slice(1, index + 1).join('/'),
        title: words.join(' ')
    };
});

const react = reactive({
    article: '',
    sections: [],
    meta: {},
    path: pathArray,
	loaded: false
});

let articleUrl = `${baseUrl}${path}.md`;

if (path === 'style-test') {
    articleUrl = 'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md';
}

// uncomment the setTimeout to simulate long loading
// setTimeout(() => {
fetch(articleUrl)
    .then((response) => response.text())
    .then((text) => {
        // i think in the future we should make the backend do this and return
        // it with the api since it only needs to be done when the article is updated
        var md = MarkdownUtils.parse(text);

        var meta = md.metadata;
        react.meta = meta;

        if (meta.title)
            react.path[react.path.length - 1].title = meta.title;
        
        Utils.setTitle(meta.title);

        react.article = MarkdownUtils.render(md.content);
        react.sections = md.sections;

		react.loaded = true; // nuke loading since we got something now!
    });
// }, 4000); 
function edit() { // paper smells so we wont use editor (maybe one day?)
    window.open(`https://admin.camellia.wiki/${path}`);
}
</script>

<template>
    <div class="article-page">
		<ArticleSkeleton :loading="!react.loaded">
			<div class="flex justify-between w-full mb-2">
				<p class="flex gap-1">
					<RouterLink to="/">Home</RouterLink>
					<span v-for="section in react.path" class="flex items-center gap-1">
						<PhCaretRight :size="16" />
						<RouterLink :to="'/' + section.link">{{ section.title }}</RouterLink>
					</span>
				</p>
				<p class="text-accent cursor-pointer" @click="edit">Edit this page!</p>
			</div>
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
			<div class="article-comments">
				<div class="new-comment">
					<div class="w-full h-12 rounded flex gap-4">
						<img class="rounded-2xl" :src="DefaultAvatar" alt="avatar" />
						<div class="w-full flex rounded-3xl pl-5 pr-5 gap-4 bg-background-3">
							<textarea class="new-comment-box m-auto resize-none overflow-hidden outline-none h-8 pt-1 pb-1" placeholder="not yet!" disabled/>
							<PhPaperPlaneRight :size="24" class="m-auto" />
						</div>
					</div>
				</div>
				<GradientLine />
				<!-- comment data would go here -->
			</div>
		</ArticleSkeleton>
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
	.article-comments {
		margin-top: 120px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;

		.new-comment .new-comment-box {
			background: transparent;
			width: 100%;
		}
	}
}
</style>
<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

import { PhCaretRight, PhLinkSimple, PhPaperPlaneRight } from '@phosphor-icons/vue';

import MarkdownView from '@/components/md/MarkdownView.vue';
import GradientLine from '@/components/GradientLine.vue';

import NewComment from '@/components/comments/NewComment.vue';

import MarkdownUtils from '@/utils/MarkdownUtils';
import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';
import ArticleSkeleton from './ArticleSkeleton.vue';
import API from '@/utils/API';
import Toast from '@/utils/Toast';

const route = useRoute();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(1).join('/');

const react = reactive({
    article: '',
    sections: [],
    meta: {},
    breadcrumbs: [],
	loaded: false,
	error: false
});

const ArticleTypes = {
	Article: 1,
	News: 2,
	Community: 2
};

// get article data from backend
let articleUrl = `/articles?path=/${path}`;

// uncomment the setTimeout to simulate long loading
// setTimeout(() => {
API.get(articleUrl).then((res) => {
	if (res.message != "OK" || res.status != 200) {
		react.error = true;
		react.loaded = true;
		Utils.setTitle("Error");
		return;
	}

	let data = res.data;
	var md = MarkdownUtils.parse(data);
    var meta = data.meta;

    react.meta = meta;
	react.breadcrumbs = data.breadcrumbs;
        
    Utils.setTitle(meta.title);

    react.article = MarkdownUtils.render(md.content);
    react.sections = md.sections;
	react.loaded = true; // nuke loading since we got something now!

	setTimeout(() => { // this is so stupid that i have to do this.
		if (route.hash) { // attempt to navigate to hash
			const hashToHeader = document.getElementById(route.hash.split("#")[1]);
			if (hashToHeader) hashToHeader.scrollIntoView();
		};
	}, 500);
});
// }, 4000); 
function edit() { // paper smells so we wont use editor (maybe one day?)
    window.open(`https://admin.camellia.wiki/${path}`);
}
</script>

<template>
    <div class="article-page w-full xl:w-content-width">
		<ArticleSkeleton :loading="!react.loaded" :error="react.error">
			<div class="flex justify-between w-full mb-2">
				<p class="flex gap-1">
					<RouterLink to="/">Home</RouterLink>
					<span v-for="part in react.breadcrumbs" class="flex items-center gap-1">
						<PhCaretRight :size="16" />
						<span v-if='part.name.toLowerCase() == "news"'>{{ part.name }}</span>
						<RouterLink v-else :to=part.path>{{ part.name }}</RouterLink>
					</span>
				</p>
				<p class="text-accent cursor-pointer" @click="edit">Edit this page!</p>
			</div>
			<div class="w-full md:h-16 bg-background-1 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center mb-4">
				<h3 class="text-2xl font-semibold">{{ react.meta.title }}</h3>
				<p>Written by {{ react.meta.author }} on {{ Formatting.formatDate(react.meta.date) }}</p>
			</div>
			<div class="article-content max-h-full">
				<div class="hidden md:flex w-72 min-w-72 h-auto bg-background-3 rounded-lg flex-col p-5" v-if="react.meta.type == ArticleTypes.Article">
					<div class="sticky top-20 flex flex-col">
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
				</div>
				<div class="w-full flex flex-col pt-2">
					<MarkdownView :article="react.article" />
				</div>
			</div>
			<div class="article-comments">
				<NewComment />
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
    margin: 0 auto;

    .article-content {
        width: 100%;
        display: flex;
        gap: 40px;
    }

	.article-comments {
		margin-top: 120px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
}
</style>
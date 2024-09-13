<script setup>
import { useRoute } from 'vue-router';
import { reactive, nextTick } from 'vue';

import { PhCaretRight } from '@phosphor-icons/vue';

import MarkdownView from '@/components/md/MarkdownView.vue';
import GradientLine from '@/components/GradientLine.vue';

import NewComment from '@/components/comments/NewComment.vue';
import Comment from '@/components/comments/Comment.vue';

import MarkdownUtils from '@/utils/MarkdownUtils';
import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';
import ArticleSkeleton from './ArticleSkeleton.vue';
import API from '@/utils/API';

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

// get article data from backend
let articleUrl = `/articles?path=/${path}`;

if (path === 'style-test') {
	articleUrl = 'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md';

	fetch(articleUrl)
		.then((response) => response.text())
		.then((text) => {
			var md = MarkdownUtils.parse({ meta: {}, content: text });
			console.log(text, md);

			Utils.setTitle("Style Test");

			react.article = MarkdownUtils.render(md.content);
			react.sections = md.sections;
			react.loaded = true; // nuke loading since we got something now!
		});
} else {
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

		nextTick(() => {
			// Navigate to hash after content is rendered
			if (route.hash) {
				const hashToHeader = document.getElementById(route.hash.split("#")[1]);
				if (hashToHeader) hashToHeader.scrollIntoView();
			};

			// render shit first
			setupObserver();
		});
	});

	// Observer setup function
	// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
	// Highlight Contents wedge when user is in a new section of the page
	function setupObserver() {
		const observer = new IntersectionObserver((entries) => {
			// let sectionEntries = {};
			// entries.forEach((sectionEntry) => {
			//     const id = sectionEntry.target.getAttribute('id');
			//     const wedgeLink = document.querySelector(`ol li a[href="#${id}"]`);

			//     if (wedgeLink) {

			//         console.log(wedgeLink.parentElement.children[0].getAttribute("id"));
			//         console.log(wedgeLink.parentElement.parentElement.children[0].getAttribute("id"));
			//         console.log(wedgeLink.parentElement.parentElement.parentElement.children[0].getAttribute("id"));
			//         console.log(wedgeLink.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute("id"));
			//         console.log({
			//             id,
			//             wedgeLink,
			//             parent: wedgeLink.parentElement.parentElement,
			//             parentParent: wedgeLink.parentElement.parentElement.parentElement.children[0].getAttribute("id"),
			//         });
			//     };
			// });
			entries.forEach((sectionEntry) => {
				const id = sectionEntry.target.getAttribute('id');
				const wedgeLink = document.querySelector(`ol li a[href="#${id}"]`);

				if (wedgeLink) {
					wedgeLink.classList[sectionEntry.isIntersecting ? "add" : "remove"]("text-white");

					let wedgeLinkParent = wedgeLink.parentElement;

					let hasCir = wedgeLinkParent.parentElement.classList.contains("list-[circle]") || wedgeLinkParent.parentElement.classList.contains("list-[disc]");
					if (hasCir) {
						wedgeLinkParent.classList[sectionEntry.isIntersecting ? "add" : "remove"]("list-[disc]")
						wedgeLinkParent.classList[!sectionEntry.isIntersecting ? "add" : "remove"]("list-[circle]")
					};
				};
			});
		});

		// Observe all sections with an id
		document.querySelectorAll("h2[id],h3[id]").forEach((section) => observer.observe(section));
	}
};

// TODO: We'll be moving the editor into the Wiki Frontend itself.
// For now, I removed the click and function to goto admin.camellia.wiki.
// Just code cleanup.
// ~ codertek
</script>

<template>
	<div class="article-page w-full xl:w-content-width">
		<ArticleSkeleton :loading="!react.loaded" :error="react.error">
			<div class="flex justify-between w-full mb-2 px-5">
				<p class="flex gap-0.5">
					<RouterLink to="/" class="text-light-gray readMoreHover">Home</RouterLink>
					<span v-for="(part, index) in react.breadcrumbs" class="flex items-center gap-1">
						<PhCaretRight :size="16" class="text-light-gray" />
						<span v-if='part.name.toLowerCase() == "news"' class="text-light-gray">{{ part.name }}</span>
						<span v-else-if="index == (Object.keys(react.breadcrumbs).length - 1)">{{ part.name }}</span>
						<RouterLink v-else class="text-light-gray readMoreHover" :to=part.path>{{ part.name }}
						</RouterLink>
					</span>
				</p>
				<!-- basic redirection for editing articles. will be replaced once the editor is live -->
				<a :href='"https://github.com/CamelliaCommunity/wiki-articles/edit/main" + `${route.path}` + "/en.md"'
					target="_blank" class="text-accent cursor-pointer readMoreHover">Edit this
					page!</a>
			</div>
			<div
				class="w-full md:h-16 bg-background-1 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center mb-4">
				<h3 class="text-2xl font-semibold">{{ react.meta.title }}</h3>
				<!-- want to remove author and have last updated instead eventually -john -->
				<p class="font-extralight">Created {{
					Formatting.formatDate(react.meta.date) }} by {{ react.meta.author }}</p>
			</div>
			<div class="article-content max-h-full">
				<div class="hidden md:flex w-72 min-w-72 h-auto bg-background-3 rounded-lg flex-col p-5"
					v-if="react.meta.layout == 'article'">
					<div class="sticky top-20 flex flex-col">
						<h4 class="text-lg font-semibold mb-2">Contents</h4>
						<ol class="overflow-auto max-h-[87vh] list-decimal list-inside">
							<li v-for="section in react.sections" class="text-xl mb-3 text-light-gray">
								<a class="hover:underline hover:text-accent-soft" :href="'#' + section.id">{{
									section.title }}</a>
								<ul v-if="section.subsections.length > 0" class="list-[circle] pl-3">
									<li v-for="subsection in section.subsections" class="text-lg ml-4">
										<a class="hover:underline hover:text-accent-soft" :href="'#' + subsection.id">{{
											subsection.title }}</a>
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
				<!-- <div>
					<span>Sort by</span>
				</div> -->
				<GradientLine />
				<Comment>

				</Comment>
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
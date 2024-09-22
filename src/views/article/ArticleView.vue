<script setup>
import { useRoute } from 'vue-router';
import { reactive, nextTick, ref } from 'vue';

import { PhCaretRight } from '@phosphor-icons/vue';

import MarkdownView from '@/components/md/MarkdownView.vue';

import ArticleSkeleton from './ArticleSkeleton.vue';
import CommentsSkeleton from './CommentsSkeleton.vue';

import MarkdownUtils from '@/utils/MarkdownUtils';
import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';
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
	error: false,
	commentSystem: {
		loaded: false,
		error: false,
		cache: [],
		sortedBy: 0,
		path: ""
	}
});

// get article data from backend
let articleUrl = `/articles?path=/${path}`;
let routeHash = route.hash?.split("#").filter(e => e.length > 0);

if (path === 'style-test') {
	articleUrl = 'http://localhost:5173/src/assets/tests/blockquote-test.md'; // can be replaced with md files in the tests folder

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

		nextTick(async () => {
			setupObserver();

			// Navigate to hash after content is rendered
			if (routeHash[0] && !routeHash[0].startsWith("comment-")) {
				const hashToHeader = document.getElementById(routeHash[0]);
				if (hashToHeader) hashToHeader.scrollIntoView();
			};

			const getComments = async (url) => {
				const res = await API.get(url);
				if (res.message != "OK" || res.status != 200) return { error: true };
				else return { data: res.data };
			};

			let commentData;
			let commentURL = `/posts/${path.split("/").pop()}/comments`;

			const commentRes = await getComments(commentURL);
			if (commentRes.error || commentRes.data.length < 1) {
				commentURL = `/posts/${Utils.makeSlug(meta.title.toLowerCase())}/comments`;
				const fallbackCommentRes = await getComments(commentURL);
				if (fallbackCommentRes.error) {
					Toast.showToast("Failed to load comments!", { type: "error" });
					react.commentSystem.error = true;
				} else {
					commentData = fallbackCommentRes.data;
				};
			} else {
				commentData = commentRes.data;
			};

			if (commentData && commentData.length > 0) {
				for (let i = 0; i < commentData.length; i++) {
					commentData[i] = {
						...commentData[i],
						moreActions: ref(false),
						hovered: ref(false),
						showMore: ref(true),

						isEditing: ref(false),
						isReplying: ref(false)
					};
				};
			};

			react.commentSystem.loaded = true;
			if (commentData) {
				// TODO: This is where we get the default from localstorage or cookies or something
				react.commentSystem.sortedBy = 1;
				react.commentSystem.cache = commentData //.sort((a, b) => a.time - b.time);
				react.commentSystem.path = commentURL;
			};

			nextTick(() => {
				if (routeHash[0] && routeHash[0].startsWith("comment-")) {
					const hashToHeader = document.getElementById(routeHash[0]);
					if (hashToHeader) {
						hashToHeader.classList.add("highlighted-comment");
						hashToHeader.scrollIntoView();
						setInterval(() => {
							hashToHeader.classList.remove("highlighted-comment");
						}, 3000);
					};
				};
			});
		});
	});

	// Observer setup function
	// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
	// Highlight Contents wedge when user is in a new section of the page
	function setupObserver() {
		const observer = new IntersectionObserver((entries) => {
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
	};
};
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
			<div class="article-comments relative inline-block h-max w-max">
				<CommentsSkeleton :commentSystem="react.commentSystem" />
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
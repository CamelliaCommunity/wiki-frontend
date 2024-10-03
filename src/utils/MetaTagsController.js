
import { reactive } from 'vue';
import Config from './Config';
import Utils from './Utils';

export default class MetaTagsController {
	static defaultMeta = this.createDefaultMeta();
	static knownMetas = reactive({
		"/": {
			...this.defaultMeta,
			title: "Homepage | Camellia Wiki",
			meta: [
				...this.defaultMeta.meta,
				{ name: "og:title", content: "Homepage | Camellia Wiki" },
				{ name: "author", content: "Theaceae Collective" }
			]
		},
		"/news": {
			...this.defaultMeta,
			title: "News | Camellia Wiki",
			meta: [
				...this.defaultMeta.meta,
				{ name: "og:title", content: "News | Camellia Wiki" },
				{ name: "author", content: "Theaceae Collective" }
			]
		},
		"default": this.defaultMeta
	});

	static createKeywords(keywordsPre) {
		let keywords = [ "camellia", "wiki", "community", "producer", "fandom", "hardcore", "music", "tano*c", "japanese", "rhythm game", "gaming", "osu!", "discography", "albums", "songs", "fan community" ];
		if (!keywordsPre) keywordsPre = [];
		return [...new Set([ ...keywordsPre, ...keywords ])];
	};

	static createDefaultMeta() {
		const pageTitle = "Camellia Wiki";
		const pageDesc = "The Camellia Wiki includes the focus on Camellia, his works, and rhythm games he has associated with. We encourage you to take a look!";
		return {
			title: pageTitle,
			meta: [
				{ name: "og:title", content: pageTitle },
				{ name: "description", content: pageDesc },
				{ name: "og:description", content: pageDesc },
				{ name: "keywords", content: this.createKeywords().join(", ") }
			]
		};
	}

	static getMeta(url) {
		if (!url) url = "/";
		return this.knownMetas[url || "/"];
	}
	static setMeta(url, data, fromAPI = false) {
		if (!url) url = "/";
		if (!data) return false;

		let tmpMeta = {
			...this.defaultMeta,
			...data,
			meta: [ ]
		};

		if (fromAPI) {
			tmpMeta.title = (data.meta.title || this.defaultMeta.meta.title) + " | " + Config.siteName;
			tmpMeta.meta.push(
				{ name: "og:title", content: data.meta.title || this.defaultMeta.meta.title },
				{ name: "description", content: Utils.truncateMDText(data.content) || data.meta.description || this.defaultMeta.meta.description },
				{ name: "og:description", content: Utils.truncateMDText(data.content) || data.meta.description || this.defaultMeta.meta.description },
				{ name: "author", content: data.meta.author || this.defaultMeta.meta.author },
				{ name: "keywords", content: this.createKeywords([data.meta.title, data.meta.author]).join(", ") }
			);
			if (data.meta.image) {
				tmpMeta.meta.push(
					{ name: "twitter:card", content: "summary_large_image" },
					{ name: "twitter:image", content: data.meta.image }
				);
			};
		} else tmpMeta.meta = [ ...this.defaultMeta.meta, ...data.meta ];

		this.knownMetas[url] = tmpMeta;
		return this.knownMetas[url];
	}
};
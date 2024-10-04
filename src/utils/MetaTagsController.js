
import { reactive } from 'vue';
import Config from './Config';
import Utils from './Utils';

export default class MetaTagsController {
	static maxMetaLengths = {
		"og:title": 90, // 30-60 preferredd, 90 max
		"og:description": 300, // 55-20 preferred, 300 max
		"twitter:title": 70, // 30-60 preferred, 70 max
		"twitter:description": 200 // 55-200 preferred
	}
	static defaultMeta = this.createDefaultMeta();
	static knownMetas = reactive({
		"/": {
			...this.defaultMeta,
			title: "Homepage | Camellia Wiki",
			meta: this.mergeTwoMetas(this.defaultMeta.meta, [
				{ property: "og:title", content: "Homepage | Camellia Wiki" },
				{ name: "twitter:title", content: "Homepage | Camellia Wiki" },
				{ name: "author", content: "Theaceae Collective" }
			])
		},
		"/news": {
			...this.defaultMeta,
			title: "News | Camellia Wiki",
			meta: this.mergeTwoMetas(this.defaultMeta.meta, [
				{ property: "og:title", content: "News | Camellia Wiki" },
				{ name: "twitter:title", content: "News | Camellia Wiki" },
				{ name: "author", content: "Theaceae Collective" }
			])
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
				{ property: "theme-color", content: "#F876D3" },
				{ property: "og:title", content: pageTitle },
				{ property: "og:description", content: pageDesc },
				{ property: "og:type", content: "article" },
				{ property: "og:site_name", content: "Camellia Wiki" },
				{ property: "og:image", content: `${Config.cdnURL}/wikiIcon.png` },
				{ name: "twitter:card", content: "summary" },
				{ name: "twitter:image", content: `${Config.cdnURL}/wikiIcon.png` },
				{ name: "description", content: pageDesc },
				{ name: "keywords", content: this.createKeywords().join(", ") },
			]
		};
	}

	static mergeTwoMetas(inputOne, inputTwo) {
		const metaMap = new Map();

		inputOne.forEach(i => {
			const key = i.name || i.property;
			metaMap.set(key, i);
		});
		inputTwo.forEach(i => {
			const key = i.name || i.property;
			metaMap.set(key, i);
		});

		return Array.from(metaMap.values());
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
			let metaArr = [
				{ name: "twitter:title", content: tmpMeta.title },
				{ property: "og:title", content: tmpMeta.title },
				{ property: "og:description", content: Utils.truncateMDText(data.content, this.maxMetaLengths["og:description"]) || Utils.truncateMDText(data.meta.description, this.maxMetaLengths["og:description"]) || this.defaultMeta.meta.description },
				{ name: "description", content: Utils.truncateMDText(data.content) || Utils.truncateMDText(data.meta.description) || this.defaultMeta.meta.description },
				{ name: "author", content: data.meta.author || this.defaultMeta.meta.author },
				{ name: "keywords", content: this.createKeywords([data.meta.title, data.meta.author]).join(", ") }
			];
			if (data.meta.image) {
				metaArr.push(
					{ property: "og:image", content: data.meta.image },
					{ name: "twitter:card", content: "summary_large_image" },
					{ name: "twitter:image", content: data.meta.image }
				);
			};
			tmpMeta.meta = this.mergeTwoMetas(this.defaultMeta.meta, metaArr);

		} else tmpMeta.meta = this.mergeTwoMetas(this.defaultMeta.meta, data.meta);

		this.knownMetas[url] = tmpMeta;
		return this.knownMetas[url];
	}
};
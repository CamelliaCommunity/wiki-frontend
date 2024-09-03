import { marked } from "marked";
import markedFootnote from "marked-footnote";

export default class MarkdownUtils {
    static regex = /^---([\s\S]*?)---/;

    static parse(markdown) {
        let data = {
            sections: [],
            content: ''
        };

		data.content = markdown.content;

        data.content.split('\n').forEach((line) => {
            if (line.startsWith('## ')) {
                data.sections.push({
                    title: line.slice(3),
					id: line.slice(3).toLowerCase().trim().replace(/[^\w]+/g, '-'),
                    subsections: []
                });
            }
            
            if (line.startsWith('### ')) {
                var last = data.sections[data.sections.length - 1];

                if (!last)
                    return;

                var subsection = {
                    title: line.slice(4),
					id: line.slice(4).toLowerCase().trim().replace(/[^\w]+/g, '-')
                };

                last.subsections.push(subsection);
            }
        });

        return data;
    }

    static render(content) {
        let sectionOpen = false;
        let subsectionOpen = false;

        const renderer = {
            heading: (text, level) => {
                // add new section for h2
                if (level === 2) {
                    // close both subsections and sections if theyre open
                    let html = '';
                    if (subsectionOpen) {
                        html += `</section>`;
                        subsectionOpen = false;
                    }
                    if (sectionOpen) {
                        html += `</section>`;
                    }
                    // add new section for h2
                    sectionOpen = true;
                    const id = text.toLowerCase().trim().replace(/[^\w]+/g, '-');
                    html += `<section id="${id}"><MarkdownHeader text="${text}" :level="${level}" />`;
                    return html;
                }
                // handle subsections (h3), they stay within the current section
                if (level === 3) {
                    // close previous subsection if its open
                    let html = '';
                    if (subsectionOpen) {
                        html += `</section>`;
                    }
                    // add new subsection for h3
                    subsectionOpen = true;
                    const id = text.toLowerCase().trim().replace(/[^\w]+/g, '-');
                    html += `<section id="${id}"><MarkdownHeader text="${text}" :level="${level}" />`;
                    return html;
                }
                // return any other headings
                return `<MarkdownHeader text="${text}" :level="${level}" />`;
            },
            paragraph: (text) => `<p>${text}</p>`,
            blockquote: (quote) => {
                // remove <p> tags
                var content = quote.replace(/<p>/g, '').replace(/<\/p>/g, '');

                // find {: .tip } or {: .warning } or whatever
                var match = content.match(/\{: \.(\w+) \}/);
                
                if (match) {
                    var type = match[1];
                    return `<blockquote class="md-bq bq-${type}">${content.replace(match[0], '')}</blockquote>`;
                }

                return `<blockquote>${quote}</blockquote>`;
            },
			image: (href, title, text) => `<MarkdownImage url="${href}" alt="${text}" />`
        };

        marked.use({ renderer });
		marked.use(markedFootnote());

        var html = marked.parse(content);
		html = html.replace(`<h2 id="footnote-label" class="sr-only">Footnotes</h2>`, "");

                // Close any open section after parsing
                if (sectionOpen) {
                    html += "</section>";
                }
                if (subsectionOpen) {
                    html += "</section>";
                }
        return html;
    }

    static extractMetadata(markdown) {
        var match = markdown.match(MarkdownUtils.regex);
        
        if (match) {
            var metadata = match[1].split('\n');
            var metadataObject = {};

            metadata.forEach((metadataLine) => {
                if (metadataLine.trim().length === 0)
                    return;

                if (!metadataLine.includes(':')) { // append the line to the last key
                    var lastKey = Object.keys(metadataObject).pop();
                    metadataObject[lastKey] += " " + metadataLine.trim();
                    return;
                }

                var metadataLineParts = metadataLine.split(':');
                var key = metadataLineParts[0].trim();
                var value = metadataLineParts.slice(1).join(':').trim();

                metadataObject[key] = value;
            });

            return metadataObject;
        }

        return {};
    }

    static getEndOfMetadataIndex(markdown) {
        var match = markdown.match(MarkdownUtils.regex);
        
        if (match)
            return match[0].length;

        return -1;
    }
}
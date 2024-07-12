import { marked } from "marked";

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
        const renderer = {
            heading: (text, level) => `<MarkdownHeader text="${text}" :level=${level} />`,
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

        var html = marked.parse(content);
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
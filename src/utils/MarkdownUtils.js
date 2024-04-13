import { marked } from "marked";

export default class MarkdownUtils {
    static regex = /^---([\s\S]*?)---/;

    static parse(markdown) {
        let data = {
            metadata: {},
            sections: [],
            content: ''
        };

        if (markdown.startsWith('---')) {  
            data.metadata = MarkdownUtils.extractMetadata(markdown);
            data.content = markdown.slice(MarkdownUtils.getEndOfMetadataIndex(markdown)).trim();
        }
        else {
            data.content = markdown;
        }

        data.content.split('\n').forEach((line) => {
            if (line.startsWith('## ')) {
                data.sections.push({
                    title: line.slice(3),
					id: line.slice(3).toLowerCase().replace(/[^\w]+/g, '-'),
                    subsections: []
                });
            }
            
            if (line.startsWith('### ')) {
                var last = data.sections[data.sections.length - 1];

                if (!last)
                    return;

                var subsection = {
                    title: line.slice(4),
					id: line.slice(4).toLowerCase().replace(/[^\w]+/g, '-')
                };

                last.subsections.push(subsection);
            }
        });

        return data;
    }

    static render(content) {
        const renderer = {
            heading: (text, level) => {
                const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
                return `<h${level} id="${escapedText}">${text}</h${level}>`;
            }
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
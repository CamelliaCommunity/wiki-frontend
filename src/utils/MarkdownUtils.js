export default class MarkdownUtils {
    static regex = /^---([\s\S]*?)---/;

    static extractMetadata(markdown) {
        var match = markdown.match(MarkdownUtils.regex);
        
        if (match) {
            var metadata = match[1].split('\n');
            var metadataObject = {};

            metadata.forEach((metadataLine) => {
                console.log(metadataLine);

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
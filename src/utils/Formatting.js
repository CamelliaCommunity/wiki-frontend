export default class Formatting {
    static formatDate(secs) {
        return new Date(secs * 1000).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
}
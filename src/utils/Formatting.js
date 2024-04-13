export default class Formatting {
    static formatDate(secs) {
		if (isNaN(secs)) {
			try { secs = (new Date(secs).getTime() / 1000); } catch { return "Invalid Date"; }
		};

        return new Date(secs * 1000).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
}
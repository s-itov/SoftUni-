function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('ico')) {
        return 'image/x-icon';
    } else {
        return 'application/octet-stream'; // Default content type if none of the extensions match
    }
}

module.exports = {
    getContentType
};

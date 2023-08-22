const { JSDOM } = require("jsdom");


function normalizeUrl(url) {
    url = new URL(url);
    normalized_url = `${url.hostname}${url.pathname}`;
    normalized_url = normalized_url.replace(/\s+$/, "");
    normalized_url = normalized_url.replace(/\/$/, "");

    return normalized_url;
}

function getURLsFromHTML(htmlBody, baseUrl) {
    const result = []

    const dom = new JSDOM(
        htmlBody,
        // {url: baseUrl}
    );
    const links = dom.window.document.querySelectorAll("a");

    for (const link of links) {
        const href = link.href;
        let url = href
        if (href.slice(0, 1) === "/") {
            url = baseUrl + href
        }
        try {
            new URL(url)
            result.push(url)
        } catch (e) {
            console.log(`${url}: ${e.message}`)
        }
    }

    return result
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}

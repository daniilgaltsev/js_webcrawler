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


async function crawlPage(url) {
    console.log(`Crawling ${url}...`);
    try {
        const response = await fetch(url); // NOTE: should make this as input for testing status and content-type handling
        if (response.status >= 400 || response.status < 200) {
            console.error(`Error for ${url}: ${response.status}`);
            return;
        }
        if (!response.headers.get("content-type").includes("text/html")) {
            console.error(`Error for ${url}: not HTML, but ${response.headers.get("content-type")}`);
            return;
        }
        const page = await response.text();
        console.log(page);
    } catch (e) {
        console.error(`Error in crawlPage for ${url}: ${e.message}`);
    }
    
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
}

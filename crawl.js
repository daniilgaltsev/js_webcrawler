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


async function crawlPage(baseUrl, currentUrl, visited) {
    console.log(`Crawling '${currentUrl}'...`);

    let normalizedCurrentUrl;
    try {
        normalizedCurrentUrl = normalizeUrl(currentUrl);
    } catch (e) {
        console.error(`Error in normalizeUrl for ${currentUrl}: ${e.message}`);
        return visited;
    }


    if (visited.has(normalizedCurrentUrl)) {
        console.log(`Already visited ${currentUrl}`);
        visited.set(normalizedCurrentUrl, visited.get(normalizedCurrentUrl) + 1);
        return visited;
    }

    if (currentUrl === baseUrl) {
        visited.set(normalizedCurrentUrl, 0);
    } else {
        visited.set(normalizedCurrentUrl, 1);
    }

    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        console.log(`Not crawling ${currentUrl} because it is not on the same domain as ${baseUrl}`);
        return visited;
    }

    try {
        const response = await fetch(currentUrl); // NOTE: should make this as input for testing status and content-type handling
        if (response.status >= 400 || response.status < 200) {
            console.error(`Error for ${currentUrl}: ${response.status}`);
            return visited;
        }
        if (!response.headers.get("content-type").includes("text/html")) {
            console.error(`Error for ${currentUrl}: not HTML, but ${response.headers.get("content-type")}`);
            return visited;
        }
        const page = await response.text();

        const urls = getURLsFromHTML(page, baseUrl);
        for (const url of urls) {
            await crawlPage(baseUrl, url, visited);
        }

    } catch (e) {
        console.error(`Error in crawlPage for ${baseUrl}: ${e.message}`);
    }
    
    return visited
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
}

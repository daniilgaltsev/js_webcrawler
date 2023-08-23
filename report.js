function printReport(visited, baseUrl) {
    console.log("\n\nReport:");

    const [internal, external] = sortVisited(visited, baseUrl);
    console.log("Internal links:");
    for (const [url, count] of internal) {
        console.log(`${url}: ${count}`);
    }

    console.log("\nExternal links:");
    for (const [url, count] of external) {
        console.log(`${url}: ${count}`);
    }   
}

function sortVisited(visited, baseUrl) {
    const internal = new Map();
    const external = new Map();
    for (const url of visited.keys()) {
        try {
            if (new URL(`http://${url}`).hostname === new URL(baseUrl).hostname) {
                internal.set(url, visited.get(url));
            } else {
                external.set(url, visited.get(url));
            }
        } catch (e) {
            external.set(url, visited.get(url));
        }
    }

    return [sortMap(internal), sortMap(external)];

}

function sortMap(map) { // from https://stackoverflow.com/a/50427905
    const sorted = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    return sorted;
}

module.exports = {
    printReport,
}

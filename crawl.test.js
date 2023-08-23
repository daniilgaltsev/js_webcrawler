const {test, expect} = require("@jest/globals");
const {normalizeUrl, getURLsFromHTML} = require("./crawl.js");


const normalized_boot_url = "blog.boot.dev/path";

test("normalizeUrl remove protocol", () => {
    expect(normalizeUrl("protocol://host/path")).toBe("host/path");
});

test("normalizeUrl remove trailing slash", () => {
    expect(normalizeUrl("http://host/path/")).toBe("host/path");
});

test("normalizeUrl remove trailing space", () => {
    expect(normalizeUrl("nothttp://host/path ")).toBe("host/path");
});

test("normalizeUrl host", () => {
    expect(normalizeUrl("http://hOst/path")).toBe("host/path");
});

test("normalizeUrl Random Test 1", () => {
    expect(normalizeUrl("https://blog.boot.dev/path/")).toBe(normalized_boot_url);
});

test("normalizeUrl Random Test 2", () => {
    expect(normalizeUrl("http://blog.boot.dev/path/")).toBe(normalized_boot_url);
});

test("normalizeUrl Random Test 3", () => {
    expect(normalizeUrl("https://blog.boot.dev/path/ ")).toBe(normalized_boot_url);
});

test("normalizeUrl Random Test 4", () => {
    expect(normalizeUrl("http://blog.Boot.dev/path ")).toBe(normalized_boot_url);
});



test("getURLsFromHTML empty", () => {
    expect(getURLsFromHTML("", "http://host/path")).toEqual([]);
});

test("getURLsFromHTML no links", () => {
    expect(getURLsFromHTML("<html><body></body></html>", "http://host/path")).toEqual([]);
});

test("getURLsFromHTML one link", () => {
    expect(
        getURLsFromHTML("<html><body><a href='http://host/path/abcd'></a></body></html>", "http://host/path")
    ).toEqual(["http://host/path/abcd"]);
});

test("getURLsFromHTML one relative link", () => {
    expect(
        getURLsFromHTML("<html><body><a href='./path/abcd'></a></body></html>", "http://host/path")
    ).toEqual(["http://host/path/abcd"]);
});

test("getURLsFromHTML two relative links and one absolute link", () => {
    expect(
        getURLsFromHTML("<html><body><a href='/abcd'></a><a href='http://host/path/abcd'></a><a href='abcd'></a></body></html>", "http://host/path")
    ).toEqual(["http://host/abcd", "http://host/path/abcd", "http://host/abcd"]);
});

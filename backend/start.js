const path = require('path');

const cors = require('@koa/cors');
const fs = require('fs');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const getPort = require('get-port');

function prepareArray(jsonArrayUnsorted) {
    jsonArrayUnsorted.forEach( el => {
        const viewCount = el.statistics.viewCount.replace(/[ ,.]/g, "");
        const subscriberCount = el.statistics.subscriberCount.replace(/[ ,.]/g, "");
        const videoCount = el.statistics.videoCount.replace(/[ ,.]/g, "");
        el.statistics.viewCount = viewCount;
        el.statistics.subscriberCount = subscriberCount;
        el.statistics.videoCount = videoCount;
    });
}

function sortByTitleAsc(jsonArrayUnsorted) {
    let jsonArraySortedByTitleAsc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return jsonArraySortedByTitleAsc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return b.title.toLowerCase() < a.title.toLowerCase() ? 1
            : b.title.toLowerCase() > a.title.toLowerCase() ? -1
                : 0;
    });
}

function sortByTitleDesc(jsonArrayUnsorted) {
    let jsonArraySortedByTitleAsc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return jsonArraySortedByTitleAsc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return b.title.toLowerCase() > a.title.toLowerCase() ? 1
            : b.title.toLowerCase() < a.title.toLowerCase() ? -1
                : 0;
    });
}

function sortBySubscribersAsc(jsonArrayUnsorted) {
    let sortedBySubscribersAsc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return sortedBySubscribersAsc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return parseInt(b.statistics.subscriberCount) < parseInt(a.statistics.subscriberCount) ? 1
            : parseInt(b.statistics.subscriberCount) > parseInt(a.statistics.subscriberCount) ? -1
                : 0;
    });
}

function sortBySubscribersDesc(jsonArrayUnsorted) {
    let sortedBySubscribersDesc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return sortedBySubscribersDesc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return parseInt(b.statistics.subscriberCount) > parseInt(a.statistics.subscriberCount) ? 1
            : parseInt(b.statistics.subscriberCount) < parseInt(a.statistics.subscriberCount) ? -1
                : 0;
    });
}

function sortByVideosAsc(jsonArrayUnsorted) {
    let sortedBySubscribersAsc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return sortedBySubscribersAsc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return parseInt(b.statistics.videoCount) < parseInt(a.statistics.videoCount) ? 1
            : parseInt(b.statistics.videoCount) > parseInt(a.statistics.videoCount) ? -1
                : 0;
    });
}

function sortByVideosDesc(jsonArrayUnsorted) {
    let sortedBySubscribersDesc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return sortedBySubscribersDesc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return parseInt(b.statistics.videoCount) > parseInt(a.statistics.videoCount) ? 1
            : parseInt(b.statistics.videoCount) < parseInt(a.statistics.videoCount) ? -1
                : 0;
    });
}

function sortByViewsAsc(jsonArrayUnsorted) {
    let sortedByViewsAsc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return sortedByViewsAsc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return parseInt(b.statistics.viewCount) < parseInt(a.statistics.viewCount) ? 1
            : parseInt(b.statistics.viewCount) > parseInt(a.statistics.viewCount) ? -1
                : 0;
    });
}

function sortByViewsDesc(jsonArrayUnsorted) {
    let sortedByViewsDesc = JSON.parse(JSON.stringify(jsonArrayUnsorted));
    return sortedByViewsDesc.sort(/**
     * @return {number}
     */
    function IHaveAName(a, b) {
        return parseInt(b.statistics.viewCount) > parseInt(a.statistics.viewCount) ? 1
            : parseInt(b.statistics.viewCount) < parseInt(a.statistics.viewCount) ? -1
                : 0;
    });
}

async function runServer() {
    const port = await getPort({ port: 3000 });

    const app = new Koa();
    const router = new Router();

    const data = fs.readFileSync(path.join(__dirname, 'channels.json'), 'utf8');
    let jsonArrayUnsorted = JSON.parse(data);
    prepareArray(jsonArrayUnsorted);
    const sortedByViewsAsc = sortByViewsAsc(jsonArrayUnsorted);

    router.get('/api/data/unsorted', (ctx) => {
        ctx.body = jsonArrayUnsorted;
    });

    router.get('/api/data/sortedByTitleAsc', (ctx) => {
        ctx.body = sortByTitleAsc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedByTitleDesc', (ctx) => {
        ctx.body = sortByTitleDesc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedBySubscribersAsc', (ctx) => {
        ctx.body = sortBySubscribersAsc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedBySubscribersDesc', (ctx) => {
        ctx.body = sortBySubscribersDesc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedByVideoCountAsc', (ctx) => {
        ctx.body = sortByVideosAsc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedByVideoCountDesc', (ctx) => {
        ctx.body = sortByVideosDesc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedByViewsCountAsc', (ctx) => {
        ctx.body = sortByViewsAsc(jsonArrayUnsorted);
    });

    router.get('/api/data/sortedByViewsCountDesc', (ctx) => {
        ctx.body = sortByViewsDesc(jsonArrayUnsorted);
    });


    app.use(cors());
    app.use(koaStatic(path.join(__dirname, '..', 'src')));
    app.use(router.routes())
       .use(router.allowedMethods());
    app.listen(port);
    

    console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);
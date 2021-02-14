const path = require('path');

const cors = require('@koa/cors');
const fs = require('fs');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const getPort = require('get-port');

function prepareArray(jsonArrayUnsorted) {
    jsonArrayUnsorted.forEach(el => {
        const viewCount = el.statistics.viewCount.replace(/[ ,.]/g, "");
        const subscriberCount = el.statistics.subscriberCount.replace(/[ ,.]/g, "");
        const videoCount = el.statistics.videoCount.replace(/[ ,.]/g, "");
        el.statistics.viewCount = viewCount;
        el.statistics.subscriberCount = subscriberCount;
        el.statistics.videoCount = videoCount;
    });
}

const sortLetterAscending = function (a, b) {
    return b.title.toLowerCase() < a.title.toLowerCase() ? 1
        : b.title.toLowerCase() > a.title.toLowerCase() ? -1
            : 0;
};

function sortByTitleAsc(jsonArrayUnsorted) {
    const jsonArraySortedByTitleAsc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortLetterAscending)
    );
    return jsonArraySortedByTitleAsc;
}


const sortLetterDescending = function (a, b) {
    return b.title.toLowerCase() > a.title.toLowerCase() ? 1
        : b.title.toLowerCase() < a.title.toLowerCase() ? -1
            : 0;
};

function sortByTitleDesc(jsonArrayUnsorted) {
    const jsonArraySortedByTitleDesc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortLetterDescending)
    );
    return jsonArraySortedByTitleDesc;
}

const sortBySubscribersAscending = function (a, b) {
    return parseInt(b.statistics.subscriberCount) < parseInt(a.statistics.subscriberCount) ? 1
        : parseInt(b.statistics.subscriberCount) > parseInt(a.statistics.subscriberCount) ? -1
            : 0
};

function sortBySubscribersAsc(jsonArrayUnsorted) {
    const sortedBySubscribersAsc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortBySubscribersAscending)
    );
    return sortedBySubscribersAsc;
}

const sortBySubscribersDescending = function (a, b) {
    return parseInt(b.statistics.subscriberCount) > parseInt(a.statistics.subscriberCount) ? 1
        : parseInt(b.statistics.subscriberCount) < parseInt(a.statistics.subscriberCount) ? -1
            : 0;
};

function sortBySubscribersDesc(jsonArrayUnsorted) {
    const sortedBySubscribersDesc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortBySubscribersDescending));
    return sortedBySubscribersDesc;
}

const sortByVideosAscending = function (a, b) {
    return parseInt(b.statistics.videoCount) < parseInt(a.statistics.videoCount) ? 1
        : parseInt(b.statistics.videoCount) > parseInt(a.statistics.videoCount) ? -1
            : 0;
};

function sortByVideosAsc(jsonArrayUnsorted) {
    const sortedByVideosAsc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortByVideosAscending));
    return sortedByVideosAsc;
}

const sortByVideosDescending = function (a, b) {
    return parseInt(b.statistics.videoCount) > parseInt(a.statistics.videoCount) ? 1
        : parseInt(b.statistics.videoCount) < parseInt(a.statistics.videoCount) ? -1
            : 0;
};

function sortByVideosDesc(jsonArrayUnsorted) {
    const sortedByVideosDesc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortByVideosDescending));
    return sortedByVideosDesc;
}

const sortByViewsAscending = function (a, b) {
    return parseInt(b.statistics.viewCount) < parseInt(a.statistics.viewCount) ? 1
        : parseInt(b.statistics.viewCount) > parseInt(a.statistics.viewCount) ? -1
            : 0;
};

function sortByViewsAsc(jsonArrayUnsorted) {
    const sortedByViewsAsc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortByViewsAscending));
    return sortedByViewsAsc;
}

const sortByViewsDescending = function (a, b) {
    return parseInt(b.statistics.viewCount) > parseInt(a.statistics.viewCount) ? 1
        : parseInt(b.statistics.viewCount) < parseInt(a.statistics.viewCount) ? -1
            : 0;
};

function sortByViewsDesc(jsonArrayUnsorted) {
    const sortedByViewsDesc = (
        jsonArrayUnsorted
            .slice()
            .sort(sortByViewsDescending));
    return sortedByViewsDesc;
}

async function runServer() {
    const port = await getPort({port: 3000});

    const app = new Koa();
    const router = new Router();

    const data = fs.readFileSync(path.join(__dirname, 'channels.json'), 'utf8');
    let jsonArrayUnsorted = JSON.parse(data);
    prepareArray(jsonArrayUnsorted);
   
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
const http = require('http');
const https = require('https');

function fetchTimeStories(numStories, response) {
    const url = 'https://time.com';

    const request = https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const stories = parseStories(data, numStories);
            const jsonResponse = JSON.stringify(stories, null, 2);

            console.log(jsonResponse);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(jsonResponse);
        });
    });

    request.on('error', (error) => {
        console.error(`Error fetching data from Time.com: ${error.message}`);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Failed to fetch data from Time.com' }));
    });

    request.end();
}

function parseStories(htmlContent, numStories) {
    const stories = [];
    let index = 0;

    for (let i = 0; i < numStories; i++) {
        index = htmlContent.indexOf('<li class="latest-stories__item">', index);
        if (index === -1) {
            break;
        }

        const storyStart = htmlContent.indexOf('<a href="', index);
        const storyEnd = htmlContent.indexOf('</a>', storyStart);

        if (storyStart !== -1 && storyEnd !== -1) {
            const linkStart = storyStart + '<a href="'.length;
            const linkEnd = htmlContent.indexOf('"', linkStart);
            const link = 'https://time.com' + htmlContent.slice(linkStart, linkEnd);

            const titleStart = htmlContent.indexOf('>', storyStart) + 1;
            const titleEnd = htmlContent.indexOf('</h3>', titleStart);
            const titleWithTags = htmlContent.slice(titleStart, titleEnd).trim();

            // Remove HTML tags from the title
            const title = titleWithTags.replace(/<[^>]*>/g, '');

            stories.push({ title, link });
        }

        index = storyEnd;
    }

    return stories;
}

http.createServer((req, res) => {
    if (req.url === '/getTimeStories' && req.method === 'GET') {
        fetchTimeStories(6, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
}).listen(8080);

console.log('Use this URL http://localhost:8080/getTimeStories');
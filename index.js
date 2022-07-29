const path = require('path');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        try {
            const url = new URL(req.url.replace('/', ''));

            const filename = path.basename(url.pathname);
            const encoded = encodeURI(encodeURIComponent(url));
            const html = `
            <h1>Download ${filename}</h1>
            <p>Do you want to download it?</p><br>
            <input type="button" id="dl" value="yes!"> | <input type="button" id="scan" value="Let me scan!">
            <script>document.getElementById('dl').addEventListener('click', () => location.href = "${url}");document.getElementById('scan').addEventListener('click', () => window.open('https://www.virustotal.com/gui/search/' + "${encoded}"));</script>`
            res.write(html);
            res.end();
        } catch {
            const index = fs.readFileSync('index.html', 'utf-8');
            res.write(index);
            res.end();
        }
    }
});

server.listen(process.env.PORT);

console.log('listening...');
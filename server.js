const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const mkcert = require('mkcert');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(async () => {
  // Create a certificate authority
  const ca = await mkcert.createCA({
    organization: 'Local Development',
    countryCode: 'US',
    state: 'Local',
    locality: 'Local',
    validity: 365
  });

  // Create a certificate
  const cert = await mkcert.createCert({
    ca: { key: ca.key, cert: ca.cert },
    domains: ['127.0.0.1', 'localhost'],
    validity: 365
  });

  const httpsOptions = {
    key: cert.key,
    cert: cert.cert,
  };

  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${PORT}`);
  });
});


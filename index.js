const fs = require('fs');
const path = require('path');
const checkSSL = require('./helpers/checkSSL');
const { createObjectCsvWriter } = require('csv-writer');

const filePath = path.join(__dirname, 'sites.txt');
const sites = fs.readFileSync(filePath, 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

const csvWriter = createObjectCsvWriter({
  path: 'output.csv',
  header: [
    { id: 'site', title: 'Site' },
    { id: 'valid', title: 'Certificado Válido' },
    { id: 'expires', title: 'Expira em' },
    { id: 'error', title: 'Erro' }
  ]
});

(async () => {
  console.log('Verificando certificados SSL...\n');

  const results = [];

  for (const site of sites) {
    try {
      const res = await checkSSL(site);
      console.log(`✅ ${site}: válido até ${res.expires}`);
      results.push({
        site,
        valid: res.valid ? 'Sim' : 'Não',
        expires: res.expires,
        error: ''
      });
    } catch (err) {
      console.log(`❌ ${site}: ${err.message}`);
      results.push({
        site,
        valid: 'Erro',
        expires: '-',
        error: err.message
      });
    }
  }

  await csvWriter.writeRecords(results);
  console.log('\n✅ Relatório salvo em output.csv');
})();
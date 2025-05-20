const tls = require('tls');

function checkSSL(hostname, port = 443) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(port, hostname, { servername: hostname, timeout: 5000 }, () => {
      const cert = socket.getPeerCertificate();

      if (!cert || !cert.valid_to) {
        socket.end();
        return reject(new Error('Certificado inválido ou ausente.'));
      }

      const expires = new Date(cert.valid_to);
      const now = new Date();
      const valid = expires > now;

      socket.end();
      resolve({
        valid,
        expires: expires.toISOString().split('T')[0] 
         });
    });

    socket.on('error', (err) => {
      reject(new Error(`Erro TLS: ${err.message}`));
    });

    socket.setTimeout(5000, () => {
      socket.destroy();
      reject(new Error('Timeout ao conectar.'));
    });
  });
}

module.exports = checkSSL;
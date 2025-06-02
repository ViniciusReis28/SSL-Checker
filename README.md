# 🔐 SSL Checker - CLI

Uma ferramenta de linha de comando para verificar informações do certificado SSL de qualquer domínio.

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)

## 🚀 Instalação

1. Instalar dependências:

```bash
npm install
```

2. Como usar:

    1. No arquivo sites.txt, digite os domínios que deseja verificar, um por linha.

    2. No terminal, execute o script com o comando:
        
        ```bash
        node index.js
        ```
    3. O resultado será gerado no arquivo output.csv, contendo os dados do certificado de cada domínio listado.

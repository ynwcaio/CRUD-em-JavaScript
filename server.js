// Importa o framework Express, que facilita a criação de servidores web em Node.js
const express = require("express");

// Cria uma instância do servidor Express
const server = express();

// Importa o Nunjucks, um motor de templates para renderizar HTML dinâmico
const nunjucks = require("nunjucks");

// Configuração do Nunjucks
nunjucks.configure("views", { // Define a pasta onde os arquivos HTML estão armazenados
    express: server,         // Integra o Nunjucks com o servidor Express
    noCache: true            // Desativa o cache para que mudanças nos templates sejam refletidas instantaneamente
});

// Configura o Express para servir arquivos estáticos da pasta "public"
// Isso permite que CSS, JavaScript e imagens sejam acessados diretamente no navegador
server.use(express.static("public"));

// Configura o Express para interpretar os dados enviados via formulários (req.body)
server.use(express.urlencoded({ extended: true }));

// Importa a conexão com o banco de dados
const bd = require("./bd");

// Inicializa um array vazio para armazenar os projetos
const projetos = [];

// Rota principal (Página inicial)
server.get("/", function(req, res) {    
    // Consulta todos os projetos no banco de dados
    bd.all('SELECT * FROM projetos', function(err, rows) {
        if (err) return console.log(err); // Exibe erros, se houver

        console.log("Recebi o pedido do cliente");
        
        // Obtém os 3 últimos projetos adicionados e inverte a ordem para exibi-los do mais recente ao mais antigo
        let ultimosProjetos = rows.slice(-3).reverse();   
    
        // Renderiza a página index.html, passando os últimos projetos como variável para o template
        return res.render("index.html", { projetos: ultimosProjetos });
    });
});

// Rota para a página de projetos
server.get("/projetos", function(req, res) { 
    // Consulta todos os projetos no banco de dados
    bd.all('SELECT * FROM projetos', function(err, rows) {
        if (err) return console.log(err); // Exibe erros, se houver

        // Renderiza a página projects.html, passando todos os projetos como variável para o template
        return res.render("projects.html", { projetos: rows });
    });
    console.log("Recebi o pedido do cliente");
});

// Rota para adicionar um novo projeto ao banco de dados
server.post("/", function(req, res) {
    // Define a query SQL para inserir um novo projeto na tabela "projetos"
    const query = "INSERT INTO projetos(img,titulo,categoria,descricao,url) VALUES (?, ?, ?, ?, ?)";
    
    // Captura os dados enviados pelo formulário e os organiza em um array
    const values = [req.body.image, req.body.title, req.body.category, req.body.description, req.body.url];

    // Executa a query no banco de dados
    bd.run(query, values, function(err) {
        if (err) return console.log(err); // Exibe erros, se houver
    });
    
    console.log(req.body); // Exibe os dados recebidos no terminal
    
    // Redireciona o usuário para a página de projetos após a inserção bem-sucedida
    return res.redirect("/projetos");
});

// Inicia o servidor e define a porta 3001 para acesso
server.listen(3001);

// Para rodar o servidor, é necessário instalar o Express com o comando:
// npm install express

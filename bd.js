const sqlite3 = require('sqlite3').verbose()
const bd = new sqlite3.Database('./siteFeceap.bd')
// CRUD 
bd.serialize(function () {
    // Create
    bd.run(`
        CREATE TABLE IF NOT EXISTS projetos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT,
            titulo TEXT,
            categoria TEXT,
            descricao TEXT,
            url TEXT
            );
            `);
        // Read
        // bd.all('SELECT * FROM projetos', function(err, rows){
        //     if (err) return console.log(err);
        //     console.log(rows);
        // }) 
    // Update
    const query = "INSERT INTO projetos(img,titulo,categoria,descricao,url) VALUES (?, ?, ?, ?, ?)"
    const values = ["https://cdn-icons-png.flaticon.com/128/4515/4515708.png", "Energia Sustentável: O Futuro das Cidades", "Engenharia Ambiental", "Um estudo sobre fontes de energia renovável e sua aplicação em cidades inteligentes para reduzir impactos ambientais.", "#"]

    // bd.run(query, values, function(err){
    //     if (err) return console.log(err);
    // })

    // Delete
    // bd.run("DELETE FROM projetos WHERE id=?", [2], function(err){
    //     if (err) return console.log(err)
    //     console.log("Deletei o: ", this)
    // }) 
})
module.exports = bd;
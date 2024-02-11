import express from "express"
import mysql  from "mysql"

const app = express()
const PORT = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const connection = mysql.createConnection(config)

const createDatabase = `
CREATE TABLE IF NOT EXISTS people (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);
`
const animeCharacters = [
  'Goku',
  'Vegeta',
  'Gohan',
  'Piccolo',
  'Trunks',
  'Bulma',
  'Naruto Uzumaki',
  'Sasuke Uchiha',
  'Sakura Haruno',
  'Kakashi Hatake',
  'Gaara',
  'Hinata Hyuga',
  'Edward Elric',
  'Alphonse Elric',
  'Roy Mustang',
  'Winry Rockbell',
  'Light Yagami',
  'L Lawliet',
  'Misa Amane',
  'Yuji Itadori',
  'Megumi Fushiguro',
  'Nobara Kugisaki',
  'Yusuke Urameshi',
  'Kurama',
  'Hiei',
  'Monkey D. Luffy',
  'Roronoa Zoro',
  'Nami',
  'Usopp',
];

connection.query(createDatabase)
app.get('/', (req, res) => {
  const number = Math.floor(Math.random() * animeCharacters.length)
  const name = animeCharacters[number]; 
  connection.query(`SELECT COUNT(*) AS total_people FROM people`,(err, resposta, fi)=>{

    connection.query('INSERT INTO people (id,name) VALUES (?,?)', [resposta[0].total_people + 1,name], (error, results, fields) => {
      if (error) throw error;
    });
  
    connection.query('SELECT name FROM people', (error, results, fields) => {
      if (error) throw error;
  
      const names = results.map(result => result.name);
  
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <p>Lista de nomes cadastrados:</p>
        <ul>
          ${names.map(name => `<li>${name}</li>`).join('')}
        </ul>
      `);
    });
  })
});

app.listen(PORT, ()=>{
  console.log(`App rodando na porta ${PORT}`)
})
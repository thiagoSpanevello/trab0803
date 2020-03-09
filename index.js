console.log("ola mundo");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "mydb"
});

connection.connect(function (err) {
    if (err) {
        console.error("erro conectando banco: " + err.stack)
        return;
    }
    console.log("Banco conectado")
});





// rotas
var myLogger = function (req, res) {
    console.log('LOGGED');
    var url = req.url;;
    var ip = req.connection.remoteAddress;
    var userAgent = req.get('User-Agent');;
    var dataHora = new Date;
    console.log(url);
    console.log(ip);
    console.log(userAgent);
    console.log(dataHora);


    //joga no banco
    connection.query(`insert into requisicao(url, ip, user_agent, data_hora) values("${url}", "${ip}", "${userAgent}", "${dataHora}")`)


    var mensagens = ["Sua mensagem foi recebida, visualizada e ignorada com sucesso.", 
    "Me chamou pra passear e me levou pra tomar vacina", 
    "Meninas de 9 anos descendo até o chão e eu aqui, com preguiça de agachar quando alguma coisa cai.", 
    "Em terra de whatsapp, ligação é prova de amor.", 
    "I’m sexy bitch", 
    "Só digo uma coisa: não digo nada.", 
    "Eu tinha um lado doce, mas eu comi.", 
    "Sendo sexy sem ser vulgar!", 
    "dormiu com a bunda destapada, foi?", 
    "site errado, aqui não é o Xvideos"];
 var pos = Math.floor(Math.random()*10);
 var msg = mensagens[pos];
    res.send(msg);
  };
  
  app.use('/',myLogger);



app.get('/rank', function(req, res){
    connection.query(`select r.url as url, count(r.url) as acessos from requisicao r
group by url
order by acessos desc
`, function(error, results, fields){
    if(error)
    res.json(error)
    else
    res.json(results);
})
});


//let retorno = { ola: "mundo" };
//app.post('/json', function (req, res) {
   // console.log(req.body);
   // res.send("ok")
//});

//app.get('/Cep', function (req, res) {
 //   connection.query("select * from cep", function (error, results, fields) {
//if (error)
      //      res.json(error);
        //else
       //     res.json(results);
      //  connection.end;
       // console.log("executou");
   // });
//});



app.listen(80, function () { console.log('example app listening on port 80') })
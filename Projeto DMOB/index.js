const express = require ('express');
const app =   express();
const path = require('path');
const roouter = express.Router();
__dirname = path.resolve();

const mysql = require('mysql');
var sha1 = require('sha1');

const connection = mysql.createConnection({
host : 'remotemysql.com',
user : 'CKdtkhOYSU',
password : '13KaqgVGMe',
database : 'CKdtkhOYSU',
port: '3306'
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  console.log('Principal')
  res.send('ok')
});

app.listen(process.env.port || 3000);

app.get('/Cadastrar',(req, res) => {
  resposta.render(__dirname+'/views/Cadastrar.html',{msg:"Cadastro de novos produtos"});
});

app.post('/Cadastrar',function(request,res){
  var nome=request.body.nome;
  var endereco=request.body.endereco;
  var cpf=request.body.cpf;
  var senha=sha1(request.body.senha);
  const usuario = {'nome': nome,'endereco': endereco,'cpf': cpf ,'senha': senha };

connection.query('INSERT INTO usuario SET ?', usuario, (err, resp) => {
  if (err){
    console.log ('error', err.message, err.stack)
  }
  else
    console.log('ID do ultimo inserido:', resp.insertId);
  });
  res.render(__dirname+'/views/Cadastrar.html', {msg: nome+" Cadastrado com Sucesso"});
});

app.get('/Alterar/:id', (req, res) => {
  var id = req.params.id;
  connection.query('SELECT * FROM `usuario`Where id = ?',[id], function(err, rows, fields) {
  if (err){
    console.log ('error', err.message, err.stack)
  }
  else{
    console.log(rows[0]);
    resposta.render(__dirname+'/views/Alterar.html', {usuario:rows[0]});
    }
  });
});

app.post('/Alterar',function(request,res){
var nome=request.body.nome;
var endereco=request.body.endereco;
var cpf=request.body.cpf;
var id = request.body.id;

connection.query('UPDATE usuario SET nome = ?, endereco = ?, cpf = ? Where id = ?', [nome, endereco, cpf, id],(err, result) => {
  if (err) throw err;
    console.log(`Atualizado ${result.changedRows} row(s)`);
  }); 
});

app.get('/Remover/:id', (req, res) => {
  var id = req.params.id;

  connection.query('DELETE FROM `usuario` Where id = ?',[id], function(err, result) {
    console.log("Registro Deletado!!");
    console.log(result);
  });
});
//inisialisasi aplikasi menggunakan express js
const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const { response } = require("express")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//membuat koneksi
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpus"
})

db.connect(Error =>{
    if(Error){
        console.log(Error.message)
    }else{
        console.log("Mysqli Connescted")
    }
})

//data dummy
let nextId = 4;
const books =[
    { id: 1, title: "The First", year: 2019},
    { id: 2, title: "The Seccond", year: 2020},
    { id: 3, title: "The Third", year: 2021},
];

//ENDPOINT

app.get("/", (req,res) => {
    res.send({
        message: "Berhasil melakukan pemanggilan get",
        data: {
            description:
            "Endpoint ini untuk menampilkan data",
        }
    })
})

app.get("/books", (req,res) => {
    //create sql query
    let sql = "select * from perpustakaan"

    //run query
    db.query(sql, (Error,result) =>{
        let response = null
        if(Error){
            response = {
                message: Error.message
            }
        }else{
            response = {
                result
            }
        }
        res.json(response)
    })
})

app.post("/books/tambah", (req,res) => {
    let judul = req.body.title
    let tahun = req.body.year

    //create sql query
    let sql = `insert into perpustakaan (title, year) values ('${judul}','${tahun}')`

    //run query
    db.query(sql, (Error,result) =>{
        let response = null
        if(Error){
            response = {
                message: Error.message
            }
        }else{
            response = {
                message: "Berhasil menambahkan buku",
                title: judul,
                year: tahun,
            }
        }
        res.json(response)
    })
})

app.put("/books/:id", (req,res) => {
    let judul = req.body.title
    let tahun = req.body.year
    let id = req.params.id

    //create query
    let sql = `update perpustakaan set title='${judul}',year='${tahun}' where id='${id}'`

    //run query
    db.query(sql, (Error,result) =>{
        let response = null
        if(Error){
            response = {
                message: Error.message
            }
        }else{
            response = {
                message: "Berhasil mengganti data buku",
                title: judul,
                year: tahun,
            }
        }
        res.json(response)
    })
})

app.delete("/books/:id", (req,res) => {
    let id = req.params.id

    //create sql query
    let sql = `delete from perpustakaan where id='${id}'`

    //run query
    db.query(sql, (Error,result) =>{
        let response = null
        if(Error){
            response = {
                message: Error.message
            }
        }else{
            response = {
                message: "Berhasil menghapus data buku",
            }
        }
        res.json(response)
    })
})

const port = 8080;
app.listen(port, () => console.log (`App running ${port}`))
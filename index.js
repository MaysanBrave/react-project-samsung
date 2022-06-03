const express = require("express");
const app = express();
const fs = require('fs')
const cors = require('cors')

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT || 8080);


app.get('/orders',(req,res)=>{
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        orderList = JSON.parse(data);
        res.send(orderList)
    });
})
app.get('/users',(req,res)=>{
    fs.readFile('users.json', (err, data) => {
        if (err) throw err;
        users = JSON.parse(data);
        res.send(users)
    });
})
app.get('/products',(req,res)=>{
    fs.readFile('products.json', (err, data) => {
        if (err) throw err;
        products = JSON.parse(data);
        res.send(products)
    });
})
app.post('/order',(req,res)=>{
    const order = req.body;
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        orderList = JSON.parse(data);
        orderList.push(order) ;
        orderList = JSON.stringify(orderList)
        fs.writeFile("orders.json", orderList, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }     
            console.log("JSON file has been saved.");
            res.end()
        });    
    });
})
app.post('/product',(req,res)=>{
    const product = req.body;
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        products = JSON.parse(data);
        products.push(product) ;
        products = JSON.stringify(products)
        fs.writeFile("orders.json", products, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }     
            console.log("JSON file has been saved.");
            res.end()
        });    
    });
})

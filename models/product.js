
const fs = require('fs');
const path=require('path');
const p = path.join(__dirname,'..','data','products.json');

const getProductFromFile =(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
       
    });
}
module.exports = class Product{
    constructor(t){
        this.title = t;
    }

    save() {
        getProductFromFile(products =>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products) , (Err)=>{
            //console.log(Err)
            });
        });
        fs.readFile(p, (err,fileContent)=>{

        })
    }
    

    static fetchAll(cb){
        getProductFromFile(cb);
    }

}
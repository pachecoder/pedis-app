"use strict";
const fs = require("fs");
const excelToJson = require("convert-excel-to-json");
const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
const { url } = require("inspector");

dotenv.config();

const dbConfig = {
    db: process.env.NAME,
    instance: process.env.INSTANCE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
}

const excel = {
    filename: process.env.EXCEL_FILENAME,
    sheet: process.env.SHEET_NAME
}

var sequelize = new Sequelize(dbConfig.db, dbConfig.username, dbConfig.password, {
  dialect: "mssql",
  dialectOptions: {
    instanceName: dbConfig.instance
  },
  host: "localhost"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./models/product.model")(sequelize, Sequelize);

module.exports = db;

db.products.sync();

const result = excelToJson({
    source: fs.readFileSync(excel.filename),
    header:{
        rows: 1
    },
    sheetStubs: true,
    sheets: [excel.sheet],
    columnToKey: {
        A: 'categoryName',
        B: 'ean',
        C: 'name',
        D: 'price',
        E: 'url',
        F: 'description',
    }
});

const products = result.Productos.map(element => {

    element['ean'] = element['ean'].toString(); 

    return {
        price: null,
        description: null,
        url: null,
        ...element
    }
});

db.products.bulkCreate(products).then(data => {
    console.log(data);
}).catch(err => {
    console.log({
    message:
        err.message || "Some error occurred while processing data..."
    });
});
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { PRODUCT_BY_ID, ADD_PRODUCT } = require('../queries');
const { DbUtils } = require('../Utils');
//get product by its id
router.get('/:id', async function (req, res) {
    const id = req.params.id;
    if(typeof id !== "number" && id<= 0){
        return res.status(400).json({error:"id is not valid"});
    }
   const client = await pool.connect();
    const result = await pool.query(PRODUCT_BY_ID,[id]);
    if(result.rows.length < 1){
        return res.status(400).json(
            {error: "no such item"});
    }
    client.release();
    res.status(200).json(result.rows[0]
       /* product_id : result[0].product_id,
        name: result[0].name,
        description : result[0].description,
        user_id : result[0].user_id,*/
    );
    
});
//temporary add product which will go in /seller/products , will add function to utils
router.post('/', async function (req,res){
   
    const {user, name, description, price, stock} = req.body;
    const client = await pool.connect();
    if( user <= 0 || typeof name !== 'string' || typeof description !== 'string' || price < 0 || stock < 0){
        client.release();
        return res.status(400).json({error : 'invalid input'});
    }
    if(typeof DbUtils.GetUserDataById(client,user) == 'undefined'){
        client.release();
        return res.status(400).json({error : "user doesn't exist"});
        }
    //this one
    await client.query(ADD_PRODUCT, [user,name,description,price,stock]);
    client.release();
    return res.status(201).send();

});

//deez
router.get('/', async function (req, res) {
   const client = await pool.connect()
    const {rows} = await pool.query(PRODUCT_BY_ID,[1])
    res.json(rows[0]);
    client.release()
});

module.exports = router;
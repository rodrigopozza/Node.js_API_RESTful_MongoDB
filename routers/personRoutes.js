const router = require('express').Router()
const Person = require('../models/Person');


//CRUD
// C - inserção
router.post('/', async(req,res)=>{
    const {name, salary, approved} = req.body
    if(!name){
        res.status(422).json({error:"O campos sao todos obrigatórios!"})
        return
    } 
 
  
    const person ={
        name,
        salary,
        approved
    }
    try{
        await Person.create(person)
        res.status(201).json({message:"Pessoa criada com sucesso!"})
  
    }catch(error){
        res.status(500).json({error: error})
    }
  });

  //R - consulta

  router.get('/', async(req,res)=>{
    try {
      const people = await Person.find()
      res.status(200).json(people)
      
    } catch (error) {
      res.status(500).json({error: error})
    }
  })

  router.get('/:id', async(req,res)=>{
    const id = req.params.id
    try {
      const people = await Person.findOne({_id:id})
      if(!people){
        res.status(422).json({message:'o usuario nao foi encontrado!'})
        return
      }
      res.status(200).json(people)
    } catch (error) {
      res.status(500).json({error: error})
    }
  })
  
  // U - atualização de dados (PUT, PATCH)

  router.patch('/:id', async(req,res)=>{
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person ={
        name,
        salary,
        approved
    }
    try {
      const updatePerson = await Person.updateOne({_id: id}, person)
      if(updatePerson.matchedCount === 0){
        res.status(422).json({message:'o usuario nao foi encontrado!'})
        return
      }
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({error: error})
    }
  });

  //D - deletar/excluir dados

  router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    const people = await Person.findOne({_id:id})
    if(!people){
        res.status(422).json({message:'o usuario nao foi encontrado!'})
        return
         }
    try {
      const people = await Person.deleteOne({_id:id})
      
      
      res.status(200).json({message: 'o usuario foi excluido com sucesso!'})
    } catch (error) {
      res.status(500).json({error: error})
    }

  })




  module.exports = router
const { token } = require('morgan');
const {Task}=require('../models');

const read=async(req,res)=>{
    try{
        let idToken=req.user.id;
        let query=await Task.findAll({where:{userId: idToken}});
        if(query){
            res.status(200).json({
                status:200,
                message: 'Ok',
                data:{
                    tasks: query
                }
            });
        }
        else{
            res.status(404).json({
                status: 404,
                message: 'Error en la consulta',
            });
        }
    }
    catch(error){
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor',
            data:{
                errors: error
            }
        });
    }
}

const readOne=async(req,res)=>{
    try{
        let id=req.params.id;
        let idToken=req.user.id;
        let query=await Task.findOne({where:{id:id, userId: idToken}});
        if(query){
            res.status(200).json({
                status: 200,
                message: 'okk',
                data:{
                    task: query
                }
            });
        }
        else{
            res.status(404).json({
                status: 404,
                message: `No se encontró una tarea con el id ${id}`
            });
        }
    }
    catch(error){
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor',
            data:{
                errors: error
            }
        });
    }
}

const add=async(req,res)=>{
    try{
        let taskObj=req.body;
        taskObj.userId=req.user.id;
        await Task.create(taskObj);
        res.status(201).json({
            status: 201,
            message: 'Tarea creada',
            data: req.body
        });
    }
    catch(error){
        if(error.name== 'SequelizeValidationError'){
            const validations=error.errors.reduce((obj,e)=>{obj[e.path]=e.message; return obj;},{});
            return res.status(400).json({
                status:400,
                message: 'Errores de validación',
                data:{
                    errors: validations
                }
            });
        }
        else{
            return res.status(500).json({
                status: 500,
                message: 'Error en el servidor',
                data:{
                    errors: error
                }
            });
        }
    }
}

const update=async(req,res)=>{
    try{
        let id=Number(req.params.id);
        let idToken=req.user.id;
        let taskObj=req.body;
        if(isNaN(id)){
            return res.status(400).json({
                status: 400,
                message: 'El id proporcionado no es válido'
            });
        }
        let query=await Task.findOne({where:{id: id}});
        if(!query){
            return res.status(404).json({
                status: 404,
                message: `No se encontró una tarea con el id ${id}`
            });
        }
        if(query.userId !== idToken){
            return res.status(403).json({
                status: 403,
                message: 'No estás autorizado para realizar esta acción'
            });
        }
        await query.update(taskObj);
        res.status(200).json({
            status: 200,
            message: 'Tarea actualizada'
        });
    }
    catch(error){
        if(error.name=='SequelizeValidationError'){
            const validations=error.errors.reduce((obj,e)=>{
                obj[e.path]=e.message;
                return obj;
            },{})
            return res.status(400).json({
                status: 400,
                message: 'Error en las validaciones',
                data:{
                    errors: validations
                }
            })
        }
        else{
            return res.status(500).json({
                status: 500,
                message: 'Error en el servidor',
                data:{
                    errors: error
                }
            })
        }
    }
}

const remove=async(req,res)=>{
    try{
        let id=Number(req.params.id);
        let idToken=req.user.id;
        if(isNaN(id)){
            return res.status(400).json({
                status: 400,
                message: 'No se proporcionó un id válido'
            });
        }
        let query=await Task.findOne({where:{id: id}});
        if(!query){
            return res.status(404).json({
                status: 404,
                message: `La tarea con el id ${id} no se puede borrar porque no existe`
            })
        }
        if(query.userId !==idToken){
            return res.status(403).json({
                status: 403,
                message: 'No estás autorizado para realizar esta acción'
            });
        }
        await query.destroy({where: {id:id}});
        res.status(200).json({
            status: 200,
            message: 'Tarea eliminada'
        });
    }
    catch(error){
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor',
            data:{
                errors: error
            }
        });
    }
}

module.exports={read,readOne,add,update,remove}
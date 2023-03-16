const {User}=require('../models');
const bcrypt=require('bcryptjs');
const configToken=require('../configToken');
const jwt=require('jsonwebtoken');


const register=async(req,res)=>{
    try{
        let userObj={
            userName: req.body.userName,
            password: req.body.password
        }
        const sal=10;
        const hashResult=await new Promise((resolve,reject)=>{
            bcrypt.hash(userObj.password,sal,(err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
        if(req.body.password===req.body.passwordR){
            userObj.password=hashResult;
            await User.create(userObj);
            res.status(201).json({
                status: 201,
                message: 'Usuario registrado',
                data: userObj
            });
        }
        else{
            return res.status(400).json({
                status: 400,
                message: 'Los campos de contraseñas no coinciden',
            });
        }
    }
    catch(error){
        if(error.name== 'SequelizeValidationError'){
            const validations=error.errors.reduce((obj,e)=>{obj[e.path]=e.message; return obj;},{});
            return res.status(400).json({
                status:400,
                message: 'Errores de validación',
                errors: validations
            });
        }
        else{
            return res.status(500).json({
                status: 500,
                message: 'Error en el servidor',
                errors: error
            });
        }
    }
}

const login=async(req,res)=>{
    try{
        let userQuery=await User.findOne({where: {userName: req.body.userName}});
        if(userQuery){
            let match=await bcrypt.compare(req.body.password,userQuery.password);
            if(!match){
                return res.status(401).json({
                    status: 401,
                    message: 'Error en el usuario o contraseña',
                });
            }
            let paiload={
                id: userQuery.id,
                userName: userQuery.userName
            }
        let token=jwt.sign(paiload,configToken.secret);
        res.status(200).json({
            status: 200,
            message: 'Se inició sesión',
            token: token
        });
        }
    }
    catch(error){
        if(error.name== 'SequelizeValidationError'){
            const validations=error.errors.reduce((obj,e)=>{obj[e.path]=e.message; return obj;},{});
            return res.status(400).json({
                status:400,
                message: 'Errores de validación',
                errors: validations
            });
        }
        else{
            return res.status(500).json({
                status: 500,
                message: 'Error en el servidor',
                errors: error
            });
        }
    }
}

const verifyToken=(req,res,next)=>{
    const AuthHeader=req.headers["authorization"]
    const token= AuthHeader && AuthHeader.split(" ")[1];
    if(token==null){
        return res.status(403).json({
            status: 403,
            message: 'Acceso restringido'
        })
    }
    jwt.verify(token, configToken.secret,(err,user)=>{
        if(err){
            return res.status(401).json({
                status: 401,
                message: 'Token inválido'
            });
        }
        else{
            req.user= user;
            next();
        }
    });
}

module.exports={register,login, verifyToken};
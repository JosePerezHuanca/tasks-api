const express=require('express');
const router=express.Router();
const taskController=require('../controller/tasksController');
const veryfiToken=require('../controller/usersController').verifyToken;


router.get('/',veryfiToken , taskController.read);
router.get('/:id', veryfiToken, taskController.readOne);
router.post('/', veryfiToken, taskController.add);
router.put('/:id', veryfiToken, taskController.update);
router.delete('/:id', veryfiToken, taskController.remove);

module.exports=router;
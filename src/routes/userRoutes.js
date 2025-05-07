import express from 'express'
import {createUser, getAllUsers, deleteUser, updateUser, getUserId} from "../controllers/userController.js"
import { validate } from '../middleware/validate.js'
import {createUserSchema, updateUserSchema} from '../schemas/userSchemas.js'


const router = express.Router()

router.get ('/', getAllUsers)
router.post ('/', validate(createUserSchema), createUser)

router.put('/:id', validate(updateUserSchema), updateUser)

router.delete('/:id', deleteUser)

router.get('/:id', getUserId)

export default router
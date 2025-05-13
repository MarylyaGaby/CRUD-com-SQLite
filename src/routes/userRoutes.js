import express from 'express'
import {createUser,
     getAllUsers,
     deleteUser,
     updateUser,
     getUserId,
     registerUser,
     login
    } from "../controllers/userController.js"
import { validate } from '../middleware/validate.js'
import {createUserSchema, loginSchema, updateUserSchema} from '../schemas/userSchemas.js'
import { authenticate } from '../middleware/authentication.js'

const router = express.Router()

router.get ('/', getAllUsers)
router.post ('/', validate(createUserSchema),  createUser)

router.put('/:id', authenticate, validate(updateUserSchema), updateUser)

router.delete('/:id', authenticate, deleteUser)

router.get('/:id', getUserId)

router.post('/register', registerUser)

router.post('/login', validate(loginSchema), login)

export default router
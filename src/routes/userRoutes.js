import express from 'express'
import {getAllUsers} from "../controllers/userController.js"
import {postNewuser} from "../controllers/userController.js"
const router = express.Router()

router.get ('/', getAllUsers)
router.post ('/', postNewuser)
export default router
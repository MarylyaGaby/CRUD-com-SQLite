import { PrismaClient } from "@prisma/client"
import {comparePassword, generateToken, hashPassword} from "../utils/auth.js"

const prisma = new PrismaClient()

//[get]
/*export const getAllUsers = (req, res)=>{
    res.status(200).json({
        mensagem: "Rota GET users funcionando!"
    })
}
*/

export const getAllUsers = async (req, res)=>{
    try{
        //tento fazer algo aqui
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    }catch (error){
     //se der erro faça isso aqui
      res.status(500).json({
        mensagem:"Erro ao criar o novo usuario",
        erro:error.message
      })
    }
}

/*export const postNewuser = (req, res)=>{
//  const nome = req.body.name
    const {nome, email} = req.body
    const novoUser = {
      nome: nome,
      email: email
    };
    res.status(200).json(novoUser)
}
*/

//professor fez 
export const createUser = async(req, res) =>{
    const {name, email, password} = req.body
    
    try{
        //tento fazer algo aqui
        const NewUser= await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        res.status(201).json(NewUser)
    }catch (error){
     //se der erro faça isso aqui
      res.status(500).json({
        mensagem:"Erro ao criar o novo usuario",
        erro:error.message
      })
    }
}

export const updateUser = async (req, res) => {

    const id = req.params.id
    const {name, email, password} = req.body
    try {
        const userUpdated = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name, email, password}
        })
      res.status(200).json(userUpdated)
    } catch (error) {
        res.status(400).json({
            mensagem:"Erro ao atualizar usuário",
            erro: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await prisma.user.delete({
            where: { id: Number(id) },
      });
      res.status(204).send()
    }catch (error){
         res.status(400).json({
           mensagem:"Erro ao criar o novo usuario",
           erro:error.message
         })
       }
}

export const getUserId = async (req, res)=>{
        const id = req.params.id
        
        try {
            const getUserId = await prisma.user.findUnique({
             
                where: {id: Number(id)},
        
            })
          res.status(200).json(getUserId)
        } catch (error) {
            res.status(400).json({
                mensagem:"Erro ao atualizar usuário",
                erro: error.message
            })
        }
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        //Criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)

        //Criar usuário no banco de dados
        const newRegisteredUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        //Gerar um token JWT
        const token = generateToken(newRegisteredUser)
        //Mandar como resposta infos do usuário criado e o token de acesso
        res.status(201).json({
            name: newRegisteredUser.name,
            email: newRegisteredUser.email,
            token: token
        })


    }catch (error) {
        res.status(400).json({
            erro: "Erro ao criar usuário",
            detalhes: error.message
        })
    }
}

export const login = async (req, res) => {

    const {email, password} = req.body

    try {
        //01. Buscar usuário pelo email
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            return res.status(401).json({
                mensagem: "Credenciais Inválidas!"
            })
        }
          /*02. Comparar a senha fornecida com 
          a senha hash armazenada */
        const passwordMatch = await comparePassword(
            password, user.password
        )
        if(!passwordMatch){
            return res.status(401).json({
                mensagem: "Credenciais Inválidas!"
        })
    }

        //03. Gerar o token jwt
        const token = generateToken(user)

        //04. Envia como resposta o usuário e o token
        res.json({
            usuario: {name: user.name, email: user.email},
            token: token
        })
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao fazer login!',
            erro: error.message
        })
    }

}

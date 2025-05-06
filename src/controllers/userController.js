import { PrismaClient } from "@prisma/client"
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
    const {name, email} = req.body
    try {
        await prisma.user.update({
            where: {id: parseInt},
            data: {name, email}
        })
      res.status(200).json(updateUser)
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
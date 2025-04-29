
export const getAllUsers = (req, res)=>{
    res.status(200).json({
        mensagem: "Rota GET users funcionando!"
    })
}

export const postNewuser = (req, res)=>{
    const {nome, email} = req.body
    const novoUser = {
      nome: nome,
      email: email
    };
    res.status(200).json(novoUser)
}



import { verifyToken } from "../utils/auth.js"

export function authenticate(req, res, next) {

    //Obter o token do header Authorization
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            mensagem: "Token de acesso não fornecido!"
        })
    }

    try {
        //Verificar se o token é valido]
        //Adicionar  os dados decodificados do token
        // na requisição
        const decoded = verifyToken(token)
        return res.json({
            decoded
        })
        //req.user = decoded;
        //next();
    } catch(erro){
        return res.status(403).json({
            mensagem: "Token Inválido ou Expirado!"
        })
    }

}
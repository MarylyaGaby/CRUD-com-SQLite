
// Requisição -> Middleware -> 
// Rota(Controllers) -> Resposta

/*function middleware(req, res, next){

    //1. Fazer algo com a requisição
    // -> Validar as informações
    // -> Verificar se o usr tem conta
    //2. Modificar a resposta
    // -> Dar uma resposta ao cliente
    //3. Chamar o next() para passar para
    //  o próximo middleware(agente)
    // Ou encerrar com res.send()

}*/

//import {createUserSchema} from "../schemas/userSchemas"

/*export function validate (req, res, next, schema){

    createUserSchema.parse(req.body)

}
*/
export function validate (schema){
    return (req, res, next) => {

    try{
        /*Validar o corpo da requisição contra
         schema fornecido*/
         const validateData = schema.parse(req.body)

         /**Substituir o body pelos dados validados */
         req.body = validateData

         /**Chamo o próximo agente(middleware) */
         next()
     } catch (error) {
        return res.status(400).json({
            mensagem: "Erro de validação",
            erros: error.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }))
        })
     }
}}
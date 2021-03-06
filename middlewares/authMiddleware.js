import jwt from "jsonwebtoken"

export default (req, res, next) => {
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.token
        if(!token){
            res.status(401).json({message: "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECKRET_KEY)
        req.user = decoded
        next()
    }catch(e){
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}
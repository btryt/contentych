function adminMiddleware(req,res,next){
    if(req.session.owner){
       return next()
    }
    res.status(403).send({message:"Нет доступа"})
}

export default adminMiddleware
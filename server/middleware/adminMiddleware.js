function adminMiddleware(req,res,next){
    if(req.session.admin){
       return next()
    }
    res.status(403).send({message:"Нет доступа"})
}

export default adminMiddleware
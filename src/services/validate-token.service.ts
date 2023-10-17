import jwt from "jsonwebtoken";

class ValidateTokenService{
    public async validate(req: any, res:any, next:any){
        const headerToken = req.headers["authorization"];
        if(headerToken != null && headerToken.startsWith("Bearer ")){
           try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, "pepe")
            bearerToken;
            next();
           } catch (error) {
            return res.this.status(401).json({
                msg:"Token invalido, No Autorizado"
            })
           }
        }else{
            return res.status(401).json({
                msg: "Accseso denegado"
            })
        }
    }
}
export default ValidateTokenService;
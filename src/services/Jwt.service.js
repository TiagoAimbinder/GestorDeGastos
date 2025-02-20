
import jwt from 'jsonwebtoken';


export class JWTSrv {

    static createToken = async (usu_name) => {
        try {
            return jwt.sign({ username: usu_name }, process.env.SECRET_KEY, {expiresIn:'4h'});
        } catch (err) {
            throw err
        }
    }; 

    
}
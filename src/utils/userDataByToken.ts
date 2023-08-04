import jwt from 'jsonwebtoken';
import config from '../staticData/config';

const userDataByToken = async (token: string) => {
    const result: any | null = jwt.verify(token, config.secret, (err, res) => {
        if (err) {
            return null
        }
        return res
    })
    return result
}

export default userDataByToken

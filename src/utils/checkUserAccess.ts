import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../staticData/config';
import User, { IUser } from '../database/userSchema';
import UserTypes from '../staticData/userTypes';

const checkUserAccess = async (token: string | undefined, userAccess: string) => {
    if (!token) return false
    
    const userTypes: Array<String> = Object.values(UserTypes)
    const accessLevel: Number = userTypes.indexOf(userAccess)

    if (accessLevel == -1) return false

    const result: any = jwt.verify(token, config.secret, (err, res) => {
        if (err) {
            return null
        }
        return res
    })

    if (!result) return false

    const userFromDB: any = await User.findOne({ email: result.email })
    const userAccessLevel: Number = userTypes.indexOf(userFromDB.userAccess)

    return userAccessLevel >= accessLevel
}

export default checkUserAccess

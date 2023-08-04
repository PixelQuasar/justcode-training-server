import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../staticData/config';
import User, { IUser } from '../database/userSchema';
import UserTypes from '../staticData/userTypes';

const checkUserAccess = async (token: string | undefined, userAccess: string) => {
    if (!token) return { allowed: false }
    
    const userTypes: Array<String> = Object.values(UserTypes)
    const accessLevel: Number = userTypes.indexOf(userAccess)

    if (accessLevel == -1) return { allowed: false }

    const result: any = jwt.verify(token, config.secret, (err, res) => {
        if (err) {
            return null
        }
        return res
    })

    if (!result) return { allowed: false }

    const userFromDB = await User.findOne({ email: result.email })
    if (!userFromDB) return { allowed: false }
    const userAccessLevel: Number = userTypes.indexOf(userFromDB.userAccess)

    return {
        allowed: userAccessLevel >= accessLevel,
        userId: userFromDB._id,
        role: userFromDB.userAccess
    }
}

export default checkUserAccess

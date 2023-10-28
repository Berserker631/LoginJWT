import { Request, Response, response } from "express"
import bcrypt from "bcrypt"
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validar si el usuario ya existe
    const user = await User.findOne({ where: { userName } })

    if (user) {
        return res.status(400).json({
            msg: `User: ${userName} already exist.`
        })
    }

    try {
        //Guardar usuario en la BD
        await User.create({
            userName,
            password: hashedPassword,
        })

        res.json({
            msg: 'User: ' + userName + 'was created successfully',
        })
    } catch (error) {
        res.status(400).json({ msg: 'Ocurrio un problema', error })
    }

}

export const loginUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const user: any = await User.findOne({ where: { userName } });

    //Validamos si el usuario existe en la Base de datos
    if (!user) {
        return res.status(400).json({
            msg: `The user: ${userName} doesn't exist`
        })
    }
    //Validamos la contraseña

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'Password Incorrect'
        })
    }

    //Generamos token
    const token = jwt.sign({
        userName: userName
    }, process.env.SECRET_KEY || 'omega')
    
    res.json(token)
}
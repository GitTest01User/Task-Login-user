const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")


const SECRET_KET = "123456";

LoginValue = async (req, res) => {
    try {
        const { id } = req.query

        let tblLogin
        if (id) {
            tblLogin = await prisma.users.findMany({
                where: {
                    OR: [{ id: parseInt(id) || undefined }]
                }
            })
        } else {
            tblLogin = await prisma.users.findMany()
        }
        res.status(200).send({
            status: true,
            result: tblLogin,
            message: "succecs"
        })

    } catch (error) {
        res.status(500).send({
            status: false,

            message: "user Not valid Found !"
        })
    }
}


LoginUserController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.users.findMany({
            where: {
                email, password
            }
        })

        if (!user) {
            res.status(400).send({
                status: false,

                message: "Authentication failed !"
            })
            return;
        }
        var token = jwt.sign({ userId: user.id }, SECRET_KET, { expiresIn: '1h' })

       

        res.status(200).send({
            status: true,
            token: token,

            message: "Login SuccessFully"
        })


        
    } catch (error) {
        res.status(500).send({
            status: false,

            message: "Login failed !"
        })
    }
}


module.exports = { LoginUserController, LoginValue }
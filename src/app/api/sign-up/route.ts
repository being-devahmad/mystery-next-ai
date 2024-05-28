import dbConnect from "@/lib/dbConnect";
import UserModel, {Message} from "@/models/User";
import bcrypt from "bcryptjs"
import {sendVerificationEmail} from "@/helpers/sendVeridicationEmail";
import User from "@/models/User";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const {username, email, password} = await request.json()

        const existingVerifiedUser = await User.findOne({
            username,
            isVerified: true
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email"
                }, {status: 500})
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })
            await newUser.save()
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(
            email, username, verifyCode
        )
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }
        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, {status: 201})


    } catch (error) {
        console.log("Error registering user") // response on terminal
        return Response.json(
            {
                success: false,
                message: "Error registering user" // response on frontend
            },
            {status: 500})
    }
}




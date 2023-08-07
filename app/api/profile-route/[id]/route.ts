import connectDB from "@/utils/db/conn";
import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
import User from "@/models/User";
          

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

//get user's profile
export const GET = async  ( req: Request, { params }: { params: { id: string}}) => {
    const { id } = params
    console.log(id)

    try {
        await connectDB();

        const userPorfile = await User.findById(id).select('-password')
        return NextResponse.json(userPorfile, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json('User can not found', { status: 500 })
    }
}


  
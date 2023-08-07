import Car from "@/models/Car";
import connectDB from "@/utils/db/conn";
import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
          

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  

// Get all cars belong to specific user
export const GET = async (req: Request, { params }: { params : { id: string }}) => {
    const { id } = params;
    try {
        await connectDB()

        const userCars = await Car.find({ creator: id}).populate('creator')
        return NextResponse.json(userCars, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json('Failed to get user`s cars')
    }
}


// create a new car for a user
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    // user id
    const { id } = params;
    console.log(id)
    //all info
    const carInfo = await req.json();
    console.log(carInfo)

    try {
        await connectDB();
        //upload all base64 of photos to cloudinary and get their urls 
        const photoUploadPromises = carInfo.imageFiles.map(async (base64: string) => {
            const { url } = await cloudinary.uploader.upload(base64);
            return url;
        });
        //all photos urls
        const photosUrl = await Promise.all(photoUploadPromises);
        //create new car on mongodb
        const newCar = new Car({
            ...carInfo,
            imageFiles: photosUrl,
            creator: id
        });
        //save new car
        await newCar.save();
        return NextResponse.json(newCar, { status: 201 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to create a  Car', { status: 500 });
    }
}

// user deletes own car 
export const DELETE = async (req: Request, { params}: { params: {id: string }}) => {
    const { id } = params;

    try {
        await connectDB()
        await Car.findByIdAndDelete(id)
        return NextResponse.json('Car deleted Successfully', { status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json('Car could not be deleted', { status: 500 })
    }
}

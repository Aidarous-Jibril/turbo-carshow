import Favorite from '@/models/Favorite'
import connectDB from '@/utils/db/conn'
import { NextResponse } from 'next/server';


// add favor car to the DB
export const POST = async ( req: Request ) => {
    const favorCar = await req.json();
    console.log(favorCar)

    try {
        await connectDB()

        const favorCarExist = await Favorite.findById(favorCar?._id)
        if(!favorCarExist) {
            //create new fav car on mongodb
            const newFavorCar = new Favorite(favorCar, { new: true});
            //save new car
            await newFavorCar.save();
            return NextResponse.json(newFavorCar, { status: 201 });
        }
        return NextResponse.json('Car already added to Favor cars')
    } catch (error) {
        console.error(error)
        return NextResponse.json('Failed to add Favor cars', { status: 500})
    }
}

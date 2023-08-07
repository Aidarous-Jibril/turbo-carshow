import Car from "@/models/Car";
import connectDB from "@/utils/db/conn";
import { NextResponse } from "next/server";

  // Get all cars belong to specific user
  export const GET = async (req: Request, res: Response) => {
  //  return NextResponse.json('Latest cars route', { status: 200 });
    try {
        await connectDB()

        const allCars = await Car.find()
        // return NextResponse.json(allCars, { status: 200 })
        return new Response(JSON.stringify(allCars));
    } catch (error) {
        console.error(error)
        return NextResponse.json('Failed to get cars')
    }
}

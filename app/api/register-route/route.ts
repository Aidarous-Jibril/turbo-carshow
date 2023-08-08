import {  RequestBodyProps } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"
import bcrypt from "bcrypt";
// import { hash } from "bcrypt"


export const handler = async (req: Request,) => {
  // export async function POST(req: Request){ 
  
  // if(req.method === 'POST') {
  //   if(!req.body) return NextResponse.json({msg: "No form data"}, {status: 404})
  // }

  const body: RequestBodyProps = await req.json();
    console.log(body)
  const isUserExists =  await User.findOne({email: body.email})
  if(isUserExists) {
      return NextResponse.json({msg: "User already exists"}, {status: 422})
  } else {
      const user = await User.create({
          username: body.username,
          email: body.email,
          password: await bcrypt.hash(body.password as string, 10), 
          coverImage: body.coverImage,
          image: "https://api.multiavatar.com/Aidarous%20A%20Jibril%20(AA).svg"
      });
      const { password, ...result } = user;
      return new Response(JSON.stringify(result));
  }


}

export { handler as GET, handler as POST };
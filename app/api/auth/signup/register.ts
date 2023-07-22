
// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  //     res.json({ message: 'User already exists' });
  
  //     if (req.method==='POST') {
    //         const {email, password, ...otherProps} = req.body;
    //         if (!email || !email.includes('@') || !password) {
      //             res.status(422).json({ message: 'Invalid Data' });
      //             return;
      //         }
      //         const data = await createUser({email, password, ...otherProps})
      //         if (!data) {
        //             res.status(422).json({ message: 'User already exists' });
        //             return;
        //         }
        //         // sign in the user
        //         res.status(201).json({ message: 'User created',...data });
        //         return
        //     }else{
          //         res.status(500).send({message:'Invalid Route'})
          //     }
          // }
          // export const GET = async (req: NextRequest) => {
            //   return NextResponse.json({msg: "Signup Route"}, {status: 200})
            // }
            
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({msg: "Signup Route"}, {status: 200})
}

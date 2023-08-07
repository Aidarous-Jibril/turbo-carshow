import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import connectDB from '@/utils/db/conn';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// s
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        // login with credentials
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: {
                label: "E-mail",
                type: "text",
              },
              password: {
                label: "Password",
                type: "password",
              },
            },
            async authorize(credentials) {
   
              const email = credentials?.email.toLowerCase();
              const user = await User.findOne({ email });
    
              if (!user) {
                throw new Error("Email does not exist.");
              }
              //validate password
              const passwordIsValid = await bcrypt.compare(
                credentials?.password!,
                user.password
              );
      
              if (!passwordIsValid) {
                throw new Error("Invalid password");
              }
              if(user && passwordIsValid){
                return user
              }else{
                return null;
              }
            //   return NextResponse.json(user, { status: 201 });
              // return {
                // id: user._id.toString(),
                // ...user,
              // };
            },
          }),
    ],

    callbacks: {
        async session({ session }) {
            // console.log("SESSION", session)
            if (session?.user) {
                const sessionUser = await User.findOne({ email: session?.user.email });
                
                session.user.id = sessionUser._id.toString();
                // console.log("SESSIONUSER", sessionUser)
            }
            return session;
        },
        // save the the google/github logged in user to DB
        async signIn({ profile }): Promise<boolean> {
            // console.log('PROFILE', profile)
            try {
                await connectDB();
                //check if the user exists
                const isUserExists = await User.findOne({ email: profile?.email });
                if (!isUserExists && profile?.email) {
                    //create user
                    const image = `https://api.multiavatar.com/${profile?.name}.svg`
                    await User.create({
                        username: profile.name?.replace(' ', '').toLowerCase(),
                        email: profile.email,
                        coverImage:'https://images.pexels.com/photos/1590067/pexels-photo-1590067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                        image,
                    });
                }
                return true;
            } catch (error) {
                // Handle the error
                console.error(error)
                return false;
            }
        },
    },

    secret: "HDxAJ5W0GSHwsX42fOH6/6kI3aPqG0ALKYeeEF8bq1Cw="
});

export { handler as GET, handler as POST };
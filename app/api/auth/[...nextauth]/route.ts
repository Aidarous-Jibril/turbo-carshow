import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import User from '@/models/User';
import connectDB from '@/utils/db/conn';
import User from '@/models/User';

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
    ],
    callbacks: {
        async session({ session }) {
            if (session?.user) {
                const sessionUser = await User.findOne({ email: session?.user.email });
                // session.user.id = sessionUser._id.toString();
                console.log(sessionUser)
                console.log(session.user)
            }
            return session;
        },
        async signIn({ profile }): Promise<boolean> {
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
    }
});

export { handler as GET, handler as POST };
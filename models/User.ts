import { IUser } from "@/types";
import { model, models, Schema } from "mongoose";


const UserSchema = new Schema<IUser>({
    username: String,
    email: String,
    password: String,
    coverImage: String,
    image: String
});

// const User = model<IUser>("user", UserSchema);
// export default User;
const User = models.User || model('User', UserSchema);
export default User;
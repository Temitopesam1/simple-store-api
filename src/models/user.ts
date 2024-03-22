import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    tokens: { token: string }[];
    generateAuthToken(): Promise<string>;
}
  

interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): IUser;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: {
       type: String,
       required: true,
       trim: true,
       lowercase: true
     },
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       validate: {
         validator: (value: string) => validator.isEmail(value),
         message: "Email is invalid"
       }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate: {
          validator: (value: string) => !value.toLowerCase().includes("password"),
          message: "Password must not contain 'password'"
        }
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  }, {
    timestamps: true
});

userSchema.pre<IUser>('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(): Promise<string> {
    const token = jwt.sign({ id: this._id.toString()}, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

userSchema.statics.findByCredentials = async function(email: string, password: string): Promise<IUser | null> {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;

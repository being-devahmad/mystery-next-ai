import mongoose, {Schema, Document, Types} from "mongoose";

// Define the Message interface and schema
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) ||
    mongoose.model<Message>('Message', MessageSchema);

// Define the User interface and schema
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verification Code Expiry is required'],
    },
    isVerified: {
        type: Boolean,
        required: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>('User', UserSchema);

export {UserModel, MessageModel};

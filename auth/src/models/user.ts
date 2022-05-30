import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface userAttr {
    email: string;
    password: string;
}

// An interface that describe the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttr): UserDoc;
}

// An interface that describe the properties
// that a user Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Every time we want to creat a user
// we must to call User.build() function 
// if we use "new User" typescript cannot do type checking  
userSchema.statics.build = (userAttr: userAttr) => {
    return new User(userAttr);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }


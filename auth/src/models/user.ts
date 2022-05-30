import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface userAttr {
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

const User = mongoose.model('User', userSchema);


// Every time we want to creat a user
// we must to call buildUser function 
// if we use "new User" typescript cannot do type checking  
const buildUser = (userAttr: userAttr) => {
    return new User(userAttr);
}

export { User, buildUser }
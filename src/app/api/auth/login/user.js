// import { connectToDatabase } from '../../../../libs/mongodb'; 

// export const getUserNyEmail = username => {
//     const client = connectToDatabase();
//     const db = client.db('User');
//     const user = db.collection('User');
//     const userExist = user.findOne
//     ({
//         username: username
//     });
//     return userExist
// }

const users = [
    {
        username: 'admin@admin',
        password: 'admin'
    },
    {
        username: 'user@user',
        password: 'user'
    }
]

export const getUserByEmail = username => {
    const found = users.find(user => user.username == username)
}
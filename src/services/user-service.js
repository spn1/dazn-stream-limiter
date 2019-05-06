import users from '../data/users';

export default async () => {
    // Would send request to check database, but since it is out of the scope of this test we will just check the static data file
    return await users;
};

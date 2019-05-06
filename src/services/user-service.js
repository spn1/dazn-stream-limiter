import users from '../data/users';

export default async (id) => {
    // Would send request to check database, but since it is out of the scope of this test we will just check the static data file
    // I would assume that the database would have the ability to query for a single user, so I would not have to do the filtering here
    return await users.find((user) => {
        return user.id === id;
    });;
};

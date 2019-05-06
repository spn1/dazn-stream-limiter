import users from '../data/users';

const userCheck = (id) => {
    // Would send request to check database, but since it is out of the scope of this test we will just check the static data file
    console.log(users);

    return users.find((user) => {
        return user.id === id;
    });
};

export default async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.send({
            limitReached: true,
            error: 'User ID Not Provided'
        });
    }

    try {
        const user = await userCheck(userId);

        if (!user) {
            return res.send({
                limitReached: true,
                error: 'User Not Found'
            });
        };

        console.log(`${user.currentStreams} >= ${process.env.BASIC_USER_MAX_STREAMS} ? ${user.currentStreams >= process.env.BASIC_USER_MAX_STREAMS}`)

        return res.send({
            limitReached: user.currentStreams >= process.env.BASIC_USER_MAX_STREAMS
        });
    }
    catch (e) {
        return res.send({
            limitReached: true,
            error: `Error Checking User Info: ${e}`
        });
    }
}

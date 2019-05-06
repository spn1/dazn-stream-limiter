import getUsers from '../services/user-service';

const userCheck = async (id) => {
    const users = await getUsers();

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

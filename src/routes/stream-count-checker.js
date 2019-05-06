import getUser from '../services/user-service';

export default async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.send({
            limitReached: true,
            error: 'User ID Not Provided'
        });
    }

    try {
        const user = await getUser(userId);

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

import streamCountChecker from '../routes/stream-count-checker';
import getUsers from '../services/user-service';

jest.mock('../services/user-service');

describe('Stream Count Checker', () => {
    it('should return false for user with less than three streams', async () => {
        const res = {
            send: jest.fn()
        };

        const req = { 
            params: {
                userId: '1'
            }
        };

        const response = await streamCountChecker(req, res);

        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send.mock.calls[0][0].limitReached).toBe(false);
    });

    it('should return true for user with equal to or more than three streams', async () => {
        const res = {
            send: jest.fn()
        };

        const req = { 
            params: {
                userId: '2'
            }
        };

        const response = await streamCountChecker(req, res);

        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send.mock.calls[0][0].limitReached).toBe(true);
    });

    it('should return true when the user does not exist', async () => {
        const res = {
            send: jest.fn()
        };

        const req = { 
            params: {
                userId: '666'
            }
        };

        const response = await streamCountChecker(req, res);

        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send.mock.calls[0][0].limitReached).toBe(true);
        expect(res.send.mock.calls[0][0].error).toBe('User Not Found');
    });

    it('should return true when the user does not exist', async () => {
        const res = {
            send: jest.fn()
        };

        const req = { 
            params: { test: 'Hello World!' }
        };

        const response = await streamCountChecker(req, res);

        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send.mock.calls[0][0].limitReached).toBe(true);
        expect(res.send.mock.calls[0][0].error).toBe('User ID Not Provided');
    });

    it('should return true when there is an error getting the user info', async () => {
        // How to make getUsers throw an error...
        getUsers.mockImplementation(() => Promise.reject('test error'));

        const res = {
            send: jest.fn()
        };

        const req = { 
            params: { userId: '1' }
        };

        const response = await streamCountChecker(req, res);

        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send.mock.calls[0][0].limitReached).toBe(true);
        expect(res.send.mock.calls[0][0].error).toBe('Error Checking User Info: test error');
    });
});

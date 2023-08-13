import { rest } from 'msw';
import { login } from './fixtures/login';

const url = import.meta.env.VITE.BASE_URL as string

export const loginMock = fn =>
    rest.get(
        `${url}/api/login`,
        fn,
    );

export const handlers = () => [
    loginMock((_req, res, ctx) => {
        return res(ctx.json(login));
    }),
];


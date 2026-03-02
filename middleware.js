import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: [
        '/',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/u/(.*)',
        '/api/cron/cleanup',
    ],
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$)|)', '/', '/(api|trpc)(.*)'],
};

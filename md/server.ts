import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import { createEventHandler } from '@remix-run/cloudflare-workers';
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
    build,
    mode: process.env.NODE_ENV,
});

addEventListener(
    "fetch",
    createEventHandler({ build, mode: process.env["NODE_ENV"] ?? "production" })
);

export function onRequest(ctx: EventContext<any, any, any>) {
    return handleRequest(ctx);
}
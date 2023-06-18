import { json, LoaderFunction } from "@remix-run/cloudflare"
import { Outlet, useLoaderData } from "@remix-run/react";

export default function categoryIndex() {
  return (
    <Outlet />
  )
}
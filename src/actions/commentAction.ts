"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateComment() {
    revalidateTag("comments");
}
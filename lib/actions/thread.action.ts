import Thread from "../models/thread.model";
import { connectedDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  connectedDB();

  const createdThread = await Thread.create();
}

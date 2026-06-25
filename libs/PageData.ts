import { createClient } from "@/prismicio";
import type { HomeDocument, MentionsDocument, TagDocument, OffersDocument } from "@/prismicio-types";

type PageIdMap = {
  home: HomeDocument;
  mentions: MentionsDocument;
  tag: TagDocument;
  offers: OffersDocument;
};

export async function getPageSingleData<T extends keyof PageIdMap>(id: T): Promise<PageIdMap[T] | null> {
  const client = createClient();
  return (await client.getSingle(id).catch(() => null)) as PageIdMap[T] | null;
}

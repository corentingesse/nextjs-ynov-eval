import { createClient } from "@/prismicio";
import type { HomeDocument, MentionsDocument, TagDocument, OffersDocument, OfferDocument } from "@/prismicio-types";

type PageIdMap = {
  home: HomeDocument;
  mentions: MentionsDocument;
  tag: TagDocument;
  offers: OffersDocument;
  offer: OfferDocument;
};

export async function getPageSingleData<T extends keyof PageIdMap>(id: T): Promise<PageIdMap[T] | null> {
  const client = createClient();
  return (await client.getSingle(id).catch(() => null)) as PageIdMap[T] | null;
}

export async function getPagesByType<T extends keyof PageIdMap>(id: T): Promise<PageIdMap[T][]> {
  const client = createClient();
  return (await client.getAllByType(id).catch(() => [])) as PageIdMap[T][];
}
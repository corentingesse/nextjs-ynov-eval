import { createClient } from "@/prismicio";
import type { HomeDocument, MentionsDocument, OffersDocument, OfferDocument, TagDocument } from "@/prismicio-types";

type PageIdMap = {
  home: HomeDocument;
  mentions: MentionsDocument;
  offers: OffersDocument;
  offer: OfferDocument;
  tag: TagDocument;
};

type QueryOptions = { fetchLinks?: string[] };

export async function getPageSingleData<T extends keyof PageIdMap>(id: T): Promise<PageIdMap[T] | null> {
  const client = createClient();
  return (await client.getSingle(id).catch(() => null)) as PageIdMap[T] | null;
}

export async function getPagesByType<T extends keyof PageIdMap>(id: T, options?: QueryOptions): Promise<PageIdMap[T][]> {
  const client = createClient();
  return (await client.getAllByType(id, options).catch(() => [])) as PageIdMap[T][];
}

export async function getPageDataByUid<T extends keyof PageIdMap>(id: T, uid: string, options?: QueryOptions): Promise<PageIdMap[T] | null> {
  const client = createClient();
  return (await client.getByUID(id, uid, options).catch(() => null)) as PageIdMap[T] | null;
}

import { createClient } from "@/prismicio";
import type { HomeDocument, MentionsDocument, OffersDocument, OfferDocument, TagDocument, ProfilDocument } from "@/prismicio-types";

type PageIdMap = {
  home: HomeDocument;
  mentions: MentionsDocument;
  offers: OffersDocument;
  offer: OfferDocument;
  tag: TagDocument;
  profil: ProfilDocument;
};

type QueryOptions = { fetchLinks?: string[]; pageSize?: number; page?: number };

export async function getPageSingleData<T extends keyof PageIdMap>(id: T): Promise<PageIdMap[T] | null> {
  const client = createClient();
  return (await client.getSingle(id).catch(() => null)) as PageIdMap[T] | null;
}

export async function getPagesByType<T extends keyof PageIdMap>(id: T, options?: QueryOptions): Promise<PageIdMap[T][]> {
  const client = createClient();
  return (await client.getAllByType(id, options).catch(() => [])) as PageIdMap[T][];
}

export async function getPagedByType<T extends keyof PageIdMap>(
  id: T,
  options?: QueryOptions
): Promise<{ results: PageIdMap[T][]; total_pages: number; total_results_size: number }> {
  const client = createClient();
  const res = await client.getByType(id, options).catch(() => ({ results: [], total_pages: 1, total_results_size: 0 }));
  return res as { results: PageIdMap[T][]; total_pages: number; total_results_size: number };
}

export async function getPageDataByUid<T extends keyof PageIdMap>(id: T, uid: string, options?: QueryOptions): Promise<PageIdMap[T] | null> {
  const client = createClient();
  return (await client.getByUID(id, uid, options).catch(() => null)) as PageIdMap[T] | null;
}

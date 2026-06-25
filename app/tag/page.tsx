import Title from "@/composants/ui/Title";
import ListTags from "@/composants/ui/offers/ListTags";
import { getPagesByType } from "@/libs/PageData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
};

export default async function TagsPage() {
  const allTags = await getPagesByType("tag");
  const tags = allTags.map((t) => ({ uid: t.uid!, title: t.data.title || t.uid! }));

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="w-full bg-medium dark:bg-black">
        <div className="mx-10 md:mx-40 my-10 flex flex-col items-center justify-center gap-4 p-4 sm:items-start">
          <Title tag="h1">Tags</Title>
          <div className="my-5">
            <ListTags tags={tags} />
          </div>
        </div>
      </main>
    </div>
  );
}

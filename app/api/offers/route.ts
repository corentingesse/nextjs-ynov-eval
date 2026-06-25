import { NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function GET() {
  const client = createClient();

  const { results } = await client.getByType("offer", {
    fetchLinks: ["tag.title"],
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    pageSize: 3,
  });

  return NextResponse.json(results);
}

import Link from "next/link";

export default function ListTags({ tags }: { tags: { uid: string; title: string }[] }) {
    return (
        <div className="w-full flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Link key={tag.uid} href={`/tag/${tag.uid}`} className="hover:bg-blue-light hover:text-white border border-2 border-blue-light text-blue-light px-4 py-2">
                    {tag.title}
                </Link>
            ))}
        </div>
    );
}

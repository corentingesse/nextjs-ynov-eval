type TitleType = {
  tag: "h1" | "h2";
  children: React.ReactNode;
};

export default function Title({ tag = "h1", children }: TitleType) {
  const Tag = tag;
  return (
    <div className="w-full border-b border-black">
      <Tag className="inline-block text-blue-950 pb-3 border-b-4 border-blue-800 mb-[-1px]" style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "48px", lineHeight: "100%", letterSpacing: "0%" }}>
        {children}
      </Tag>
    </div>
  );
}

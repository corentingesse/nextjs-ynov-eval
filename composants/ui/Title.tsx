type TitleType = {
  tag: "h1" | "h2";
  children: React.ReactNode;
  rightPart?: React.ReactNode;
};

export default function Title({ tag = "h1", children, rightPart }: TitleType) {
  const Tag = tag;
  return (
    <div className="w-full items-center flex justify-between border-b border-black">
      <Tag className="inline-block text-black pb-3 border-b-4 border-blue-light mb-[-1px]" style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "48px", lineHeight: "100%", letterSpacing: "0%" }}>
        {children}
      </Tag>
      {rightPart && (
        <div className="ml-4">
          {rightPart}
        </div>
      )}
    </div>
  );
}

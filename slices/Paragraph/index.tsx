import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type ParagraphProps = SliceComponentProps<Content.ParagraphSlice>;

const Paragraph: FC<ParagraphProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-8"
    >
      {slice.primary.title && (
        <h2 className="text-blue-light text-2xl font-semibold mb-6">
          {slice.primary.title}
        </h2>
      )}
      <div className="flex flex-col gap-4 text-blue-dark">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </section>
  );
};

export default Paragraph;

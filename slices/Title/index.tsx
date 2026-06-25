import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Title from "@/composants/ui/Title";

export type TitleProps = SliceComponentProps<Content.TitleSlice>;

const TitleSlice: FC<TitleProps> = ({ slice }) => {
  return (
    <Title tag={(slice.primary.tag as "h1" | "h2") ?? "h2"}>
      {slice.primary.text}
    </Title>
  );
};

export default TitleSlice;

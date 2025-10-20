export interface FlashCardProps {
  title: string;
  year: number;
  director: string;
  image: string;
  question: string;
  answer: string;
  side: "left" | "right"; // pour alterner le placement sur la timeline
}

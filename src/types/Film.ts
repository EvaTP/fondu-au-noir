export interface Film {
  id: number;
  title: string;
  year: number;
  director: string;
  question: string;
  options: string[];
  answer: string;
  era: string;
  image: string; // chemin relatif vers public/affiches/...
}

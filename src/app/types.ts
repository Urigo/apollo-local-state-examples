export type Author = {
  id: number;
  firstName: string;
  lastName: string;
}

export type Message = {
  id: number;
  content: string;
  selected: boolean;
}

export type Query = {
  messages: Message[];
}

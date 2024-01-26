interface Hero {
  id: number;
  name: string;
  owner: string;
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: "Iron Man",
    owner: "Marvel"
  },
  {
    id: 2,
    name: "Spider Man",
    owner: "Marvel"
  },
  {
    id: 3,
    name: "Bat Man",
    owner: "DC"
  },
];
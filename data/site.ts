export type NavItem = {
  label: string;
  href: string;
};

export const nav: NavItem[] = [
  { label: "Personal Project", href: "/personal-project" },
  { label: "Commissioned", href: "/commercial-works" },
  { label: "Archive", href: "/archives" },
  { label: "Contact", href: "/contacts" },
];

export const site = {
  name: "Aadil.Doc",
  photographer: "Aadil",
  email: "aadilab.doc@gmail.com",
  description:
    "Aadil.Doc is the photographic archive and portfolio of Aadil, documenting weddings, people, and quiet stories.",
  footerStatement:
    "A record of light, patience, and the moments that pass quietly between the ones we notice.",
  social: [
    { label: "Instagram", href: "https://instagram.com", icon: "/insta.svg" },
    { label: "Facebook", href: "https://facebook.com", icon: "/facebook.svg" },
  ],
  about: {
    label: "About the Author",
    heading: "Aadil",
    paragraphs: [
      "Aadil is a photographer drawn to the quiet details of life, the intimacy of human connection, and the stories that remain long after a moment has passed.",
      "Working mostly in available light, his photographs favour patience over spectacle — a hand resting on a shoulder, the last light in a courtyard, the pause before a room empties.",
    ],
    philosophy:
      "Every photograph is treated as a small archive: a document first, an image second. The camera is a way of paying attention.",
  },
};

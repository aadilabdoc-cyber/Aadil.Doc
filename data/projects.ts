import type { Project } from "@/types/project";

const dims: Record<string, { width: number; height: number }> = {
  "01": { width: 5472, height: 3648 },
  "02": { width: 4261, height: 6392 },
  "03": { width: 4000, height: 6000 },
  "04": { width: 3705, height: 5220 },
  "05": { width: 5861, height: 3907 },
  "06": { width: 4480, height: 6720 },
  "07": { width: 4480, height: 6720 },
  "08": { width: 4242, height: 2828 },
  "09": { width: 6016, height: 4016 },
  "10": { width: 5184, height: 3456 },
  "11": { width: 3648, height: 5472 },
};

function withImages(
  ids: string[],
  captions: string[],
): Pick<
  Project,
  "coverImage" | "coverWidth" | "coverHeight" | "images" | "imageDimensions" | "captions"
> {
  return {
    coverImage: `/images/${ids[0]}.jpg`,
    coverWidth: dims[ids[0]].width,
    coverHeight: dims[ids[0]].height,
    images: ids.map((id) => `/images/${id}.jpg`),
    imageDimensions: ids.map((id) => dims[id]),
    captions,
  };
}

export const projects: Project[] = [
  // Commercial Works
  {
    slug: "a-quiet-ceremony",
    title: "A Quiet Ceremony",
    category: "commercial",
    year: "2024",
    location: "Wayanad, Kerala",
    description:
      "A small lakeside ceremony documented over a single afternoon — the exchange of rings, the walk to the water, and the quiet after the guests had gone.",
    note:
      "Shot entirely on available light. No flash was used during the ceremony itself.",
    featured: true,
    ...withImages(
      ["05", "09", "03", "08"],
      [
        "The couple, lakeside, late afternoon",
        "The floral arch, before the ceremony",
        "Bridal portrait, natural light",
        "The reception, after dusk",
      ],
    ),
  },
  {
    slug: "winter-vows",
    title: "Winter Vows",
    category: "commercial",
    year: "2023",
    location: "Munnar, Kerala",
    description:
      "A hill-country wedding shot across two days of shifting weather — mist in the mornings, clear light by afternoon.",
    featured: true,
    ...withImages(
      ["06", "07", "02"],
      ["Morning preparation", "The processional", "Portrait, tea estate"],
    ),
  },
  {
    slug: "the-long-table",
    title: "The Long Table",
    category: "commercial",
    year: "2022",
    location: "Fort Kochi, Kerala",
    description:
      "An intimate reception built around a single long table — documented as a dinner, not a spectacle.",
    ...withImages(
      ["10", "04", "11"],
      ["The table, set before guests arrive", "Portrait, courtyard light", "Evening, after the toasts"],
    ),
  },
  {
    slug: "first-light",
    title: "First Light",
    category: "commercial",
    year: "2021",
    location: "Kumarakom, Kerala",
    description:
      "A backwater wedding shot at first light, before the heat of the day set in.",
    ...withImages(["09", "05"], ["Backwater, sunrise", "The couple, jetty"]),
  },
  {
    slug: "the-vow",
    title: "The Vow",
    category: "commercial",
    year: "2020",
    location: "Alleppey, Kerala",
    description:
      "A houseboat ceremony documented for close family only — a small, deliberate guest list.",
    ...withImages(["06", "02"], ["The vows, deck of the boat", "Portrait, waterline"]),
  },
  {
    slug: "evening-guests",
    title: "Evening Guests",
    category: "commercial",
    year: "2020",
    location: "Kottayam, Kerala",
    description:
      "A reception photographed after dark, lit mostly by string lights and the venue's own lamps.",
    ...withImages(["10", "08"], ["Arrival, dusk", "The hall, after dinner"]),
  },
  {
    slug: "old-church-road",
    title: "Old Church Road",
    category: "commercial",
    year: "2019",
    location: "Fort Kochi, Kerala",
    description:
      "A ceremony at a century-old church, documented for its architecture as much as its guests.",
    ...withImages(["03", "11"], ["The aisle, before the guests", "Portrait, church steps"]),
  },
  {
    slug: "the-garden-party",
    title: "The Garden Party",
    category: "commercial",
    year: "2019",
    location: "Wayanad, Kerala",
    description:
      "An afternoon reception held in a working spice garden, shot between the rows.",
    ...withImages(["07", "04"], ["Guests, among the plantation rows", "Portrait, garden light"]),
  },
  {
    slug: "harvest-wedding",
    title: "Harvest Wedding",
    category: "commercial",
    year: "2018",
    location: "Idukki, Kerala",
    description:
      "A wedding timed to the harvest — documented across the fields as well as the ceremony itself.",
    ...withImages(
      ["05", "09", "10"],
      ["The fields, morning of the wedding", "Hands, exchange of the ring", "The procession, midday"],
    ),
  },
  {
    slug: "quiet-reception",
    title: "Quiet Reception",
    category: "commercial",
    year: "2018",
    location: "Munnar, Kerala",
    description:
      "A small reception for under thirty guests, documented as a gathering rather than an event.",
    ...withImages(["02", "06"], ["Portrait, tea-estate light", "The gathering, late afternoon"]),
  },

  // Personal Project
  {
    slug: "undergrowth",
    title: "Undergrowth",
    category: "personal",
    year: "2024",
    description:
      "An ongoing study of hands, gesture, and the small botanical details that usually go unphotographed.",
    note: "Made in the margins of other work, over the course of a year.",
    featured: true,
    ...withImages(["01", "09"], ["Study, double exposure", "Botanical detail"]),
  },
  {
    slug: "between-seasons",
    title: "Between Seasons",
    category: "personal",
    year: "2023",
    description:
      "A short series made during the turn from monsoon to summer — a period the photographer returns to every year.",
    ...withImages(["08", "10"], ["Threshold, late monsoon", "Open field, early summer"]),
  },
  {
    slug: "small-hours",
    title: "Small Hours",
    category: "personal",
    year: "2022",
    description:
      "Photographs made before sunrise, when the light is still uncertain and the world is mostly quiet.",
    ...withImages(
      ["02", "04", "11"],
      ["Portrait, first light", "Still life, kitchen table", "Doorway, before dawn"],
    ),
  },
  {
    slug: "night-studies",
    title: "Night Studies",
    category: "personal",
    year: "2021",
    description:
      "A set of photographs made after dark, mostly by lamplight and the glow of open doorways.",
    ...withImages(["04", "11"], ["Doorway, lamplight", "Portrait, after dark"]),
  },
  {
    slug: "paper-weight",
    title: "Paper Weight",
    category: "personal",
    year: "2021",
    description:
      "Photographs of objects kept for no reason other than habit — a study in accumulated weight.",
    ...withImages(["03", "08"], ["Still life, kept objects", "Detail, worn edges"]),
  },
  {
    slug: "still-life",
    title: "Still Life",
    category: "personal",
    year: "2020",
    description:
      "A quiet set made entirely indoors during a period of enforced stillness.",
    ...withImages(["09", "05"], ["Table, morning light", "Window, midday"]),
  },
  {
    slug: "the-waiting-room",
    title: "The Waiting Room",
    category: "personal",
    year: "2020",
    description:
      "Photographs made in transit spaces — waiting rooms, platforms, and the pauses between them.",
    ...withImages(["06", "07"], ["Platform, early morning", "Waiting room, midday"]),
  },
  {
    slug: "ordinary-days",
    title: "Ordinary Days",
    category: "personal",
    year: "2019",
    description:
      "A year documented without occasion — the unremarkable days that make up most of a life.",
    ...withImages(["02", "10"], ["Portrait, ordinary afternoon", "Field, nothing happening"]),
  },
  {
    slug: "low-tide",
    title: "Low Tide",
    category: "personal",
    year: "2019",
    description:
      "Photographs made at the coast during the lowest tides of the year, when the shoreline changes shape.",
    ...withImages(["01", "03"], ["Shoreline, low tide", "Portrait, coastal light"]),
  },
  {
    slug: "afterlight",
    title: "Afterlight",
    category: "personal",
    year: "2018",
    description:
      "The last series made on film before moving to digital — kept as a closing chapter.",
    ...withImages(
      ["04", "08", "11"],
      ["Detail, final roll", "Portrait, late afternoon", "Doorway, closing light"],
    ),
  },

  // Archives
  {
    slug: "field-notes",
    title: "Field Notes",
    category: "archive",
    year: "2019",
    location: "Idukki, Kerala",
    description:
      "An early collection made while travelling for unrelated work — the beginning of a documentary habit.",
    ...withImages(["03", "06"], ["Roadside portrait", "Field, late season"]),
  },
  {
    slug: "coastal-studies",
    title: "Coastal Studies",
    category: "archive",
    year: "2020",
    location: "Alleppey, Kerala",
    description:
      "A short archive of coastal light and working boats, shot over a single monsoon season.",
    ...withImages(["05", "07"], ["Backwater, midday", "Boatyard, overcast"]),
  },
  {
    slug: "interior-light",
    title: "Interior Light",
    category: "archive",
    year: "2021",
    location: "Thrissur, Kerala",
    description:
      "A study of old houses and the particular quality of light that moves through them in the late afternoon.",
    featured: true,
    ...withImages(
      ["01", "09", "10"],
      ["Window light, west-facing room", "Detail, wooden threshold", "Courtyard, late afternoon"],
    ),
  },
  {
    slug: "salt-roads",
    title: "Salt Roads",
    category: "archive",
    year: "2018",
    location: "Kollam, Kerala",
    description:
      "A collection made along the old salt-trade roads, before the last of the warehouses were repurposed.",
    ...withImages(["04", "08"], ["Warehouse, late light", "Roadside, midday"]),
  },
  {
    slug: "old-quarter",
    title: "Old Quarter",
    category: "archive",
    year: "2017",
    location: "Fort Kochi, Kerala",
    description:
      "An index of the old trading quarter, made before much of it was restored for tourism.",
    ...withImages(["02", "10"], ["Street portrait, old quarter", "Facade, afternoon"]),
  },
  {
    slug: "monsoon-ledger",
    title: "Monsoon Ledger",
    category: "archive",
    year: "2017",
    location: "Wayanad, Kerala",
    description:
      "A season-long record of a single monsoon, kept as a kind of ledger of rain and light.",
    ...withImages(["06", "03"], ["Rain, hill road", "Portrait, monsoon light"]),
  },
  {
    slug: "attic-light",
    title: "Attic Light",
    category: "archive",
    year: "2016",
    location: "Thrissur, Kerala",
    description:
      "Photographs made in the attic storerooms of a family house before it was sold.",
    ...withImages(["09", "11"], ["Storeroom, single window", "Detail, kept furniture"]),
  },
  {
    slug: "river-notes",
    title: "River Notes",
    category: "archive",
    year: "2016",
    location: "Alleppey, Kerala",
    description:
      "A short archive of the river routes, made from a single working boat over one season.",
    ...withImages(["05", "07"], ["River, early morning", "Boatman, midday"]),
  },
  {
    slug: "backyard-studies",
    title: "Backyard Studies",
    category: "archive",
    year: "2015",
    location: "Kottayam, Kerala",
    description:
      "An early, informal collection made in the photographer's own backyard over a single year.",
    ...withImages(["01", "04"], ["Backyard, morning", "Detail, garden wall"]),
  },
  {
    slug: "the-last-roll",
    title: "The Last Roll",
    category: "archive",
    year: "2015",
    location: "Idukki, Kerala",
    description:
      "The final roll of a since-discontinued film stock, shot over a single afternoon as a farewell to it.",
    ...withImages(
      ["08", "02", "10"],
      ["Field, final frames", "Portrait, last roll", "Afternoon, closing light"],
    ),
  },
];

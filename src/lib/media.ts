/**
 * Manifest for the owner's real job photography.
 *
 * Nothing here is a stock image or a placeholder graphic. Files were pulled
 * from the Down South Pressure Washing Facebook page and are served straight
 * out of /public, with intentional, descriptive alt text.
 *
 * Before/after collages are already composed side-by-side (or stacked) by the
 * owner, so they are presented as a gallery. We deliberately do NOT build a
 * drag-to-reveal slider on top of them — the split is already baked into the
 * image and a second control would fight it.
 */

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  note: string;
  /** CSS object-position, tuned per photo so phone screenshots lose their letterbox. */
  focus?: string;
};

/**
 * Pre-composed before/after collage images.
 * All five are 2048x2048. Three are split left/right, two are stacked top/bottom.
 */
export const beforeAfter: readonly GalleryItem[] = [
  {
    id: "ba-house",
    src: "/BeforeAndAfterCollages/First-beforeandafter.jpg",
    title: "Full exterior soft wash",
    note: "Siding, shutters, porch and the roof line on a ranch home.",
    alt: "Stacked before-and-after of a cream vinyl-sided ranch home: the top photo shows dull siding, mildew on the wall and a streaked roof, the bottom shows bright siding, clean shutters and a washed roofline.",
  },
  {
    id: "ba-walkway",
    src: "/BeforeAndAfterCollages/fourth.jpg",
    title: "Concrete walkway",
    note: "Algae growth under pine trees, lifted out of the slabs.",
    alt: "Side-by-side before-and-after of a curved concrete walkway under pine trees: the left photo shows grey slabs streaked with algae and needles, the right shows pale, uniform clean concrete.",
  },
  {
    id: "ba-garage",
    src: "/BeforeAndAfterCollages/second.jpg",
    title: "Garage doors & apron",
    note: "Yellowed doors and a stained driveway apron, brought back.",
    alt: "Stacked before-and-after of a two-car garage: the top photo shows yellowed doors and stained concrete, the bottom shows bright doors with clean, even concrete.",
  },
  {
    id: "ba-driveway",
    src: "/BeforeAndAfterCollages/fifth.jpg",
    title: "Long driveway",
    note: "Caught mid-clean — rinse water still running off in the before panel.",
    alt: "Side-by-side before-and-after of a long driveway in front of a detached garage: the left photo shows water and pine-straw runoff sheeting across the concrete, the right shows dry, evenly clean concrete.",
  },
  {
    id: "ba-brick-steps",
    src: "/BeforeAndAfterCollages/third.jpg",
    title: "Brick steps & entry",
    note: "Mildew off the brick, grime off the stoop and door frame.",
    alt: "Side-by-side before-and-after of brick porch steps and a red-framed door: the left photo shows dark, mildewed brick, the right shows clean brick with bright mortar joints and a clean stoop.",
  },
];

/**
 * Action shots — the owner actually working.
 * Four are portrait phone photos; one is landscape. Portrait photos of social
 * screenshots carry letterboxing at the top and bottom, which the 3:4 tile crop
 * and `focus` values below cut away.
 */
export const inAction: readonly GalleryItem[] = [
  {
    id: "act-house-wash",
    src: "/images/471255998_583503847760918_2673380321037851906_n.jpg",
    title: "House wash",
    note: "Working a wand down a shaded wall where tree cover leaves the heaviest buildup.",
    alt: "The owner in a camo jacket and beanie spraying the vinyl siding of a house with a pressure washing wand, with a visible line of grime still to be cleaned beside him.",
    focus: "50% 45%",
  },
  {
    id: "act-equipment",
    src: "/images/471855520_587974043980565_1549348945666442495_n.jpg",
    title: "Equipment cleaning",
    note: "A skid steer washed on site so it is not hauling mud back onto the lot.",
    alt: "The owner in a hi-vis jacket washing a tracked John Deere skid steer with a pressure washing wand in a working yard.",
    focus: "50% 55%",
  },
  {
    id: "act-fleet",
    src: "/images/475677408_612899194821383_2351478879853530751_n.jpg",
    title: "Fleet & trailer wash",
    note: "Tractor and dump trailer getting a full wash-down at a commercial account.",
    alt: "The owner washing the side of a red semi tractor and its dump trailer at a commercial yard.",
    focus: "0% 50%",
  },
  {
    id: "act-loader",
    src: "/images/471529693_587974260647210_2822392385388742556_n.jpg",
    title: "Heavy equipment rinse",
    note: "A wheel loader dusted down in a working yard.",
    alt: "A wheel loader being rinsed down in a dusty commercial yard.",
    focus: "50% 55%",
  },
  {
    id: "act-lot",
    src: "/images/471587009_587974160647220_8485580509345012153_n.jpg",
    title: "Commercial lot wash-down",
    note: "Hosing down a commercial yard beside a parked trailer.",
    alt: "A worker hosing down a concrete commercial yard beside a parked semi trailer.",
    focus: "50% 50%",
  },
];

/** The logo, exactly as supplied by the owner. */
export const logo = {
  /**
   * The real file. It is a square JPEG whose artwork is a white circular badge
   * on a black ground, so it is always presented inside a circular clip on a
   * black plate (see components/Logo.tsx) — that way it sits correctly on both
   * the dark chrome and the light sections without editing the owner's artwork.
   */
  src: "/logo/491991785_679408204837148_1618388454364210265_n.jpg",
  /** Circular crop derived from the same file, used for favicons / app icons. */
  badge: "/logo/downsouth-badge.png",
  width: 200,
  height: 200,
  alt: "Down South Pressure Washing logo: a white circular badge with a black North Carolina state silhouette, the Down South wordmark and a blue water arc spraying across it.",
} as const;

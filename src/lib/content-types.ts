export type GroupItem = { label: string; description: string };
export type Group = { title: string; items: GroupItem[] };
export type Pole = { name: string; description: string };

export type CustomSection = {
  id: string;
  title: string;
  text: string;
  image: string | null;
  video: string | null;
  mediaPosition: "left" | "right";
  mediaPublished: boolean;
};

export type HomeFixedSectionKey = "hero" | "poles" | "filConducteur" | "contact";
export type EntityFixedSectionKey = "groups" | "synergy";

export type SectionOrderEntry =
  | { kind: "fixed"; key: HomeFixedSectionKey | EntityFixedSectionKey }
  | { kind: "custom"; id: string };

export type Entity = {
  slug: string;
  number: string;
  name: string;
  short: string;
  tagline: string;
  kicker: string;
  description: string;
  synergy: string;
  groupsLabel: string;
  groups: Group[];
  poles?: Pole[];
  sections: CustomSection[];
  sectionOrder: SectionOrderEntry[];
};

export type SiteContent = {
  hero: {
    titleMain: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
    backgroundImage: string | null;
    backgroundVideo: string | null;
    mediaPublished: boolean;
  };
  polesSection: {
    kicker: string;
    title: string;
  };
  filConducteur: {
    kicker: string;
    quote: string;
    caseALabel: string;
    caseAText: string;
    caseBLabel: string;
    caseBText: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
  };
  footer: {
    tagline: string;
    copyrightName: string;
  };
  homeSections: CustomSection[];
  homeSectionOrder: SectionOrderEntry[];
  entities: Entity[];
};

export type SiteTheme = {
  colors: {
    paper: string;
    paperDim: string;
    ink: string;
    inkSoft: string;
    black: string;
    navy950: string;
    navy900: string;
    navy800: string;
    navy700: string;
    blue600: string;
    blue100: string;
    cream: string;
    creamDim: string;
    contactBlue: string;
  };
  typography: {
    scale: number;
    fieldSizes: Record<string, number>;
  };
};

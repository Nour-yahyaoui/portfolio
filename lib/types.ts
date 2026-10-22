export type ProjectAccent = "orange" | "blue" | "cyan" | "violet";
export type ProjectArtwork =
  | "vexos"
  | "nour-code"
  | "learning"
  | "commerce"
  | "storefront"
  | "components"
  | "security"
  | "dashboard"
  | "buttons"
  | "studio";

export interface ProjectLink {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "quiet";
}

export interface Project {
  title: string;
  description: string;
  /** Legacy v1 artwork key — v2 (Paper & Ink) renders projects typographically. */
  artwork?: ProjectArtwork;
  accent?: ProjectAccent;
  featured?: boolean;
  status?: string;
  version?: string;
  highlights?: string[];
  links?: ProjectLink[];
  tags: string[];
  mainTag: string;
  liveDemo?: string;
  code?: string;
  underConstruction?: boolean;
  privateCode?: boolean;
  note?: string;
  loginInstructions?: string;
  isPrivate?: boolean;
}

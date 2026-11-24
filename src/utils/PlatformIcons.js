import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaLinux,
  FaApple,
  FaAndroid,
} from "react-icons/fa";

import { SiStadia } from "react-icons/si";

// Maps IGDB platform IDs to platform families
export const platformFamilies = {
  // PlayStation
  8: "playstation",
  9: "playstation",
  48: "playstation",
  167: "playstation",

  // Xbox
  11: "xbox",
  12: "xbox",
  49: "xbox",
  169: "xbox",

  // PC
  6: "windows",
  3: "linux",

  // Mobile and Apple
  34: "android",
  74: "android",
  14: "apple",
  39: "apple",

  // Google Stadia
  170: "stadia",

  // Nintendo
  41: "nintendo",
  130: "nintendo",
  508: "nintendo",

  // OnLive
  113: "onlive",
};

// One icon per platform family
export const platformIcons = {
  playstation: FaPlaystation,
  xbox: FaXbox,
  windows: FaWindows,
  linux: FaLinux,
  apple: FaApple,
  android: FaAndroid,
  stadia: SiStadia,
};
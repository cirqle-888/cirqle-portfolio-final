import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || "dummy_space",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || "dummy_token",
});


export function createPageUrl(input) {
  if (!input) return "/";

  const [name, qs] = String(input).split("?");
  const n = String(name).trim();

  const map = {
    Home: "/",
    Contact: "/contact",
    Properties: "/properties",
    PropertyDetail: "/property",
    TerminosPrivacidad: "/terminos-privacidad",
  };

  const base = map[n] ?? ("/" + n.toLowerCase());
  return qs ? `${base}?${qs}` : base;
}

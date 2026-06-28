// Travel affiliate config. Add the IDs once each programme approves you; until then the links
// fall back to the plain sites (still useful as "getting there" links, just no commission yet).
// Apply: kenya-airways.com/en/affiliate-program · travelpayouts.com · partner.getyourguide.com
export const AFFILIATE = {
  kenyaAirways: '',           // Kenya Airways affiliate ID / link param (pending approval)
  travelpayouts: '544313',    // Travelpayouts / Trip.com marker (flights + hotels) — live
  getYourGuide: 'JQQKLMG',    // GetYourGuide partner_id (tours & experiences) — live
};

const enc = (s: string) => encodeURIComponent(s);

export function flightsLink(city: string): string {
  return AFFILIATE.kenyaAirways
    ? `https://www.kenya-airways.com/?aff=${AFFILIATE.kenyaAirways}&to=${enc(city)}`
    : 'https://www.kenya-airways.com/en/';
}
export function staysLink(city: string): string {
  return AFFILIATE.travelpayouts
    ? `https://search.hotellook.com/?marker=${AFFILIATE.travelpayouts}&destination=${enc(city)}`
    : `https://www.booking.com/searchresults.html?ss=${enc(city)}`;
}
export function experiencesLink(city: string): string {
  return AFFILIATE.getYourGuide
    ? `https://www.getyourguide.com/s/?q=${enc(city)}&partner_id=${AFFILIATE.getYourGuide}&cmp=share_to_earn`
    : `https://www.getyourguide.com/s/?q=${enc(city)}`;
}
// True once at least one programme is wired, so we only show the section when it can earn.
export const affiliateLive = Boolean(AFFILIATE.kenyaAirways || AFFILIATE.travelpayouts || AFFILIATE.getYourGuide);

// Real art events a traveller plans a trip around (attend, not apply). Date-verified against
// official sources (June 2026). Africa first-class. The traveller's side of the calendar.
// Facts rule: dates verified === true; unconfirmed dates carry a window and verified === false.

export interface ArtEvent {
  title: string;
  venue: string;
  city: string;
  country: string;
  start?: string;
  end?: string;
  window?: string;
  why: string;
  url: string;
  region: 'Americas' | 'Europe' | 'Africa' | 'Asia/Middle East';
  verified: boolean;
}

export const EVENTS: ArtEvent[] = [
  { title: 'Biennale Arte 2026: In Minor Keys', venue: 'La Biennale di Venezia', city: 'Venice', country: 'Italy', start: '2026-05-09', end: '2026-11-22', why: 'The art world’s flagship: 99 national pavilions and the late Koyo Kouoh’s main show across the Giardini and Arsenale.', url: 'https://www.labiennale.org/en/art/2026', region: 'Europe', verified: true },
  { title: '16th Dak’Art: (Anti)fragilité', venue: 'Biennale de l’Art Africain Contemporain', city: 'Dakar', country: 'Senegal', start: '2026-11-19', end: '2026-12-19', why: 'The continent’s most important pan-African biennial, with a sprawling OFF programme across the city.', url: 'https://biennaledakar.org/', region: 'Africa', verified: true },
  { title: 'ART X Lagos 2026', venue: 'ART X Collective', city: 'Lagos', country: 'Nigeria', start: '2026-11-05', end: '2026-11-08', why: 'West Africa’s premier fair and the anchor of Lagos Art Week, drawing galleries from across Africa and its diaspora.', url: 'https://www.artxlagos.com/', region: 'Africa', verified: true },
  { title: 'FNB Art Joburg 2026', venue: 'Sandton Convention Centre', city: 'Johannesburg', country: 'South Africa', start: '2026-09-04', end: '2026-09-06', why: 'Africa’s longest-running contemporary fair and the centre of Joburg’s September art weekend.', url: 'https://artjoburg.com/', region: 'Africa', verified: true },
  { title: 'Zeitz MOCAA: 2026–27 Season', venue: 'Zeitz Museum of Contemporary Art Africa', city: 'Cape Town', country: 'South Africa', start: '2026-10-01', window: 'New season opens 1 October 2026', why: 'Africa’s flagship contemporary museum in the Silo District, opening newly commissioned films by Mati Diop, Wanuri Kahiu, Jim Chuchu and more.', url: 'https://zeitzmocaa.museum/exhibitions-and-events/', region: 'Africa', verified: true },
  { title: 'Forever Is Now (6th edition)', venue: 'Art D’Égypte, at the Pyramids of Giza', city: 'Giza', country: 'Egypt', window: 'November 2026 (dates to be confirmed)', why: 'Monumental contemporary installations set against the Great Pyramids, one of the most photographed art events on earth.', url: 'https://artdegypte.org/', region: 'Africa', verified: false },
  { title: '16th Gwangju Biennale: You Must Change Your Life', venue: 'Gwangju Biennale Foundation', city: 'Gwangju', country: 'South Korea', start: '2026-09-05', end: '2026-11-15', why: 'Asia’s leading biennial, a deliberately tight 45-artist edition curated by Ho Tzu Nyen.', url: 'https://www.gwangjubiennale.org/en/', region: 'Asia/Middle East', verified: true },
  { title: 'Bangkok Art Biennale 2026: Angels and Mara', venue: 'Bangkok Art Biennale Foundation', city: 'Bangkok', country: 'Thailand', start: '2026-10-29', end: '2027-02-28', why: 'Contemporary art staged inside Bangkok’s temples and across the city, turning the whole capital into a venue.', url: 'https://www.bkkartbiennale.com/', region: 'Asia/Middle East', verified: true },
  { title: 'Sharjah Biennial 17: What Remains, Sits Restive', venue: 'Sharjah Art Foundation', city: 'Sharjah', country: 'United Arab Emirates', start: '2027-01-21', end: '2027-06-13', why: 'One of the Gulf’s most ambitious biennials, spread across heritage venues and former industrial sites. Worth planning ahead for.', url: 'https://www.sharjahart.org/en/sharjah-biennial/sb-17', region: 'Asia/Middle East', verified: true },
  { title: 'Frieze London & Frieze Masters 2026', venue: 'The Regent’s Park', city: 'London', country: 'United Kingdom', start: '2026-10-14', end: '2026-10-18', why: 'London’s defining art week: two tented fairs plus Frieze Sculpture and Mayfair openings.', url: 'https://www.frieze.com/fairs/frieze-london', region: 'Europe', verified: true },
  { title: 'Art Basel Paris 2026', venue: 'Grand Palais', city: 'Paris', country: 'France', start: '2026-10-23', end: '2026-10-25', why: 'Art Basel’s Paris edition in the restored Grand Palais, the hub of Paris Art Week.', url: 'https://www.artbasel.com/paris', region: 'Europe', verified: true },
  { title: 'Frida: The Making of an Icon', venue: 'Tate Modern', city: 'London', country: 'United Kingdom', start: '2026-06-25', end: '2027-01-04', why: 'Tate Modern’s blockbuster on how Frida Kahlo became a modern icon.', url: 'https://www.tate.org.uk/whats-on', region: 'Europe', verified: true },
  { title: 'The 90s', venue: 'Tate Britain, guest-curated by Edward Enninful', city: 'London', country: 'United Kingdom', start: '2026-10-01', end: '2027-02-14', why: 'A landmark survey of the decade that reshaped British art, fashion and photography.', url: 'https://www.tate.org.uk/whats-on', region: 'Europe', verified: true },
  { title: 'Krasner and Pollock: Past Continuous', venue: 'The Metropolitan Museum of Art', city: 'New York', country: 'United States', start: '2026-10-04', end: '2027-01-31', why: 'The first major New York show in two decades on Lee Krasner and Jackson Pollock, 120+ works in parallel.', url: 'https://www.metmuseum.org/exhibitions', region: 'Americas', verified: true },
];

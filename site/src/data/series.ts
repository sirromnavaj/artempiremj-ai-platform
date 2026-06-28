// The series board (skill v3.17 SERIES.md). Departments are desks, not brands.
// Every series tells the world through an artist. A series gets a typographic label,
// never its own colour.

export type Department = 'Spotlight' | 'DISCOVER' | 'Art Itineraries' | 'The Studio';

export interface Series {
  slug: string;
  name: string;
  department: Department;
  what: string;
  day?: string;
}

export const SERIES: Series[] = [
  { slug: 'the-world-column', name: 'The World column', department: 'Spotlight',
    what: 'World news told through an art lens. The flagship. It runs when a world event has a specific, strong art lens.', day: 'Responsive' },
  { slug: 'global-art-spotlight', name: 'Global Art Spotlight', department: 'Spotlight',
    what: 'The Monday anchor. The week through a maker’s eye.', day: 'Monday' },
  { slug: 'art-and-finance', name: 'Art + Finance', department: 'Spotlight',
    what: 'The art market’s economics, carried by an artist who lives it. Home of the paid intelligence tier.', day: 'Tuesday' },
  { slug: 'money-stories', name: 'Money Stories', department: 'Spotlight',
    what: 'Money through the lens of art, portrait-led, with Kathleen Mureithi. An Artist Edition feeds exhibitions.', day: 'Wednesday' },
  { slug: 'artist-spotlight', name: 'Artist Spotlight', department: 'Spotlight',
    what: 'Profile an artist. The artist is the subject.', day: 'Thursday' },
  { slug: 'art-of-mind', name: 'Art of Mind', department: 'Spotlight',
    what: 'The contemplative register, grounded in real artists’ work.', day: 'Saturday' },
  { slug: 'ink', name: 'Ink', department: 'Spotlight',
    what: 'Where skin meets story. The body as archive, the mark as testimony, worldwide.', day: 'Sunday' },
  { slug: 'intersections', name: 'Intersections', department: 'Spotlight',
    what: 'An artist at the seam of two domains, like art and music.' },
  { slug: 'nude', name: 'Nude', department: 'Spotlight',
    what: 'Fine-art figurative, global not Western. The body as a form of art across world traditions. Attributed works, adults only.' },
  { slug: 'art-itineraries', name: 'Art Itineraries', department: 'Art Itineraries',
    what: 'Art travel guides for the culturally-curious traveller, built around the calendar.' },
  { slug: 'art-to-soul', name: 'Art to Soul', department: 'The Studio',
    what: 'Studio co-creation series and Artist Edition. In development.' },
];

export const WEEKLY = [
  ['Monday', 'Global Art Spotlight'],
  ['Tuesday', 'Art + Finance'],
  ['Wednesday', 'Money Stories'],
  ['Thursday', 'Artist Spotlight'],
  ['Saturday', 'Art of Mind'],
  ['Sunday', 'Ink'],
  ['Daily', 'DISCOVER radar'],
  ['Responsive', 'The World column'],
];

// The stage. Artists ArtempireMJ has put in front of an audience. This is the visibility
// the submission promise is for: a real, public, citable place where a maker is the hero.
// Seeded with real artists from our own coverage; featured submissions join them (the
// /api/submissions desk moves a submission to 'featured', then it is added here).
// Facts rule: only names + context drawn from our correspondent coverage.

export interface FeaturedArtist {
  slug: string;
  name: string;
  medium: string;
  city: string;
  country: string;
  note: string;          // what we covered, drawn from our reporting
  storySlug?: string;    // the feature they appeared in
}

export const FEATURED: FeaturedArtist[] = [
  {
    slug: 'zandile-tshabalala', name: 'Zandile Tshabalala', medium: 'Painting',
    city: 'Johannesburg', country: 'South Africa',
    note: 'Her show held a crowd in the BKhz booth at FNB Art Joburg.',
    storySlug: 'fnb-art-joburg-18th-edition',
  },
  {
    slug: 'sibusiso-bheka', name: 'Sibusiso Bheka', medium: 'Photography',
    city: 'Johannesburg', country: 'South Africa',
    note: 'Won the inaugural ORMS International Photography Prize at ICTAF 2026, with Afronova.',
    storySlug: 'ictaf-2026-prizes-where-capital-moves',
  },
  {
    slug: 'warren-maroon', name: 'Warren Maroon', medium: 'Visual art',
    city: 'Cape Town', country: 'South Africa',
    note: 'Took the Investec Emerging Artist Award at ICTAF 2026, through Everard Read.',
    storySlug: 'ictaf-2026-prizes-where-capital-moves',
  },
  {
    slug: 'chidirim-nwaubani', name: 'Chidirim Nwaubani', medium: 'Visual art',
    city: 'London', country: 'United Kingdom',
    note: 'Secured the Tomorrows/Today section at ICTAF 2026, via Doyle Wham.',
    storySlug: 'ictaf-2026-prizes-where-capital-moves',
  },
  {
    slug: 'blessing-ngobeni', name: 'Blessing Ngobeni', medium: 'Painting',
    city: 'Johannesburg', country: 'South Africa',
    note: 'A stop on Ashraf Jamal’s Highlights Tour at FNB Art Joburg.',
    storySlug: 'fnb-art-joburg-18th-edition',
  },
];

// Real features built from our own correspondent coverage. Voice: warm, specific, the
// maker load-bearing, art as the lens on the world. No em-dashes, no negation. Images are
// our own (Khethiwe Tracy Gumede) or press-pack (credited). Dates and names are from the
// source material; the facts vault governs anything added later.

export interface Article {
  slug: string;
  department: 'Spotlight' | 'Art Itineraries' | 'The Studio';
  series: string;
  title: string;
  dek: string;
  date: string;          // ISO
  image?: string;
  imageAlt?: string;
  credit?: string;
  byline?: string;
  body: string[];        // paragraphs
}

export const ARTICLES: Article[] = [
  {
    slug: 'fnb-art-joburg-18th-edition',
    department: 'Spotlight',
    series: 'The World',
    title: 'Own history now: a continent telling its own story',
    dek: 'At one fair in Johannesburg, fifteen African countries made the same argument: the record of a place belongs to the people who live it.',
    date: '2025-09-06',
    image: '/images/khethiwe_fnb_artjoburg_aerial.jpg',
    imageAlt: 'The FNB Art Joburg fair floor seen from above',
    credit: 'Photograph by Khethiwe Tracy Gumede, our correspondent in South Africa.',
    byline: 'Khethiwe Tracy Gumede',
    body: [
      'Own history now. The line ran along the banners at FNB Art Joburg, and it landed less like a slogan than an argument about power. Who keeps the record of a continent, and who gets to decide what it says.',
      'Around fifteen African countries shared the floor this year, Ghana and Nigeria, Botswana and the DR Congo, Tanzania and Ethiopia. Each booth was a small embassy, and the thing it had come to defend was a version of the story its galleries will not hand to anyone else.',
      'You could read the argument in the work. At the BKhz booth, Zandile Tshabalala’s show held a crowd, the Black figure at ease and in command of the frame rather than arranged inside someone else’s. On the Highlights Tours, Boitumelo Tlhoaele moved through Santu Mofokeng’s photography and Mikhael Subotzky’s vast Cape Town landscape, a country looking at itself instead of being looked at.',
      'Ashraf Jamal’s walk stopped at Ricky Dyaloyi and Blessing Ngobeni, where the history on the wall does not flatter the people who wrote its first draft. The talks said the quiet part aloud. Curating otherwise. A new class of collecting. The room was deciding who the next custodians of the record would be.',
      'That is the world this fair was reporting on, told through the people who make its images. A continent saying, out loud and in paint and photographs, that its history is its own to keep. Own it now, the banners said, before someone else writes it down for you.',
    ],
  },
  {
    slug: 'ictaf-2026-prizes-where-capital-moves',
    department: 'Spotlight',
    series: 'Art + Finance',
    title: 'Five prizes at Cape Town, and two new ones show where the money is moving',
    dek: 'New prize categories are capital placing a bet before the market does. Two appeared at ICTAF 2026.',
    date: '2026-02-21',
    image: '/images/ictaf_southern_guild.jpg',
    imageAlt: 'The Southern Guild booth at the Investec Cape Town Art Fair 2026',
    credit: 'Photograph by Anthea Pokroy, ICTAF 2026 press pack.',
    body: [
      'Five prizes went out at the Investec Cape Town Art Fair this year. Two of them did not exist twelve months ago, and that is the part worth watching.',
      'Sibusiso Bheka took the inaugural ORMS International Photography Prize, represented by Afronova. Warren Maroon won the Investec Emerging Artist Award through Everard Read. Chidirim Nwaubani secured Tomorrows/Today via Doyle Wham. Mellaney Roberts claimed the RDC Art Collection Award at Berman Contemporary.',
      'The geography reads clean: a Cape Town fair, international money, African practices. The two new categories read clearer still. Photography as a critical medium rather than documentation. Materiality as a concept, run with Homo Faber in Venice, rather than craft as a compliment.',
      'A new prize is a structural bet. An artist wins recognition, their gallery’s roster strengthens, their peers get recontextualised, and the ripple reaches price points that did not exist the day before. Prize infrastructure shapes valuations before the market catches up.',
      'Two new prizes in one year is not expansion. It is repositioning, and it tells you where next-cycle collectors are already looking.',
    ],
  },
];

export function bySlug(slug: string) { return ARTICLES.find((a) => a.slug === slug); }

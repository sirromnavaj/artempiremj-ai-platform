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
    series: 'Global Art Spotlight',
    title: 'Fifteen countries under one roof: a day inside FNB Art Joburg',
    dek: 'The 18th edition gathered around fifteen African countries in one hall. Our correspondent walked it.',
    date: '2025-09-06',
    image: '/images/khethiwe_fnb_artjoburg_aerial.jpg',
    imageAlt: 'The FNB Art Joburg fair floor seen from above',
    credit: 'Photograph by Khethiwe Tracy Gumede, our correspondent in South Africa.',
    byline: 'Khethiwe Tracy Gumede',
    body: [
      'Eighteen editions in, FNB Art Joburg still does the thing it was built to do. Around fifteen African countries shared the floor this year, Ghana and Nigeria, Botswana and the DR Congo, Tanzania and Ethiopia, each booth a small embassy for the work its galleries believe in.',
      'Friday opened quiet, with school groups moving through in clusters. Saturday filled with the public, and the artists themselves drifted to the booths beside their gallerists, which is when the fair gets honest. You hear how a work was made from the person who made it.',
      'One line followed you around the hall. "Own history now," the fair said, on banners and in the talks, a push toward collecting that read less like a sales pitch and more like an argument about who gets to keep the record.',
      'The Highlights Tours carried it. Boitumelo Tlhoaele moved through Santu Mofokeng’s photography, Mikhael Subotzky’s vast Cape Town landscape, and Meleko Mokgosi’s painting. Ashraf Jamal stopped at Ricky Dyaloyi and Blessing Ngobeni, then the BKhz booth, where Zandile Tshabalala’s show held a crowd.',
      'The public programme, free with a ticket and carried by ITOO Artinsure, did the quiet work a fair needs. "Curating otherwise: speculating on tomorrow’s practices." "A new class of collecting." The conversations that decide what the next edition looks like happen in those rooms, not at the till.',
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

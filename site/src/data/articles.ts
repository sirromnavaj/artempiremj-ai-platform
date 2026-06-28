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
  body: ArticleBlock[];  // paragraphs, plus optional subheads and pull-quotes
}

// A body item is a plain paragraph, a subhead, or a pull-quote.
export type ArticleBlock = string | { h: string } | { quote: string; cite?: string };

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
  {
    slug: 'the-auction-room-is-no-longer-discovering-prices',
    department: 'Spotlight',
    series: 'Art + Finance',
    title: 'The auction room is no longer discovering prices',
    dek: 'In 2016, guarantees backed 36% of New York’s Evening Sales. By 2025, it was 78%.',
    date: '2026-05-05',
    image: '/images/ictaf_reservoir.jpg',
    imageAlt: 'A gallery booth at the Investec Cape Town Art Fair',
    credit: 'Photograph from the ICTAF press pack.',
    byline: 'Morris Javan',
    body: [
      'In 2016, guarantees backed 36% of the value of New York’s Evening Sales. By 2025, that figure was 78%.',
      'What a guarantee means: before the auction opens, the seller is protected against the work failing to sell. The auction house, or a third-party guarantor, has agreed to pay a minimum price regardless of what happens in the room. The hammer falls. The room bids. But the floor was already set.',
      'When 78% of an evening sale’s value is guaranteed, you are not watching a market discover what something is worth. You are watching it confirm what was agreed in private beforehand.',
      'This is not corruption. It is the rational response of sellers and auction houses to a market that has cooled at the top end. Sellers want certainty. Auction houses want consignments. Guarantees give both.',
      'The consequence is structural. The auction room, which justified its existence as the most transparent price-discovery mechanism in the art market, is becoming closer to a staged confirmation of privately negotiated values. The drama of the paddle is real. The price beneath it is increasingly pre-set.',
      'At the other end of the market, something different is happening. In 2025, artworks under $50,000 made up 61% of total lots sold, well above the pre-pandemic average of 48%. More artists, more accessible prices, new collectors entering from the bottom. The number of artists represented at US auctions widened from 2,717 in 2015 to 3,315 in 2025.',
      'The market is splitting. The top is increasingly pre-negotiated. The bottom is increasingly open. The middle is being hollowed out, which is where most emerging artists and mid-career galleries live.',
      'That is the structure to watch through the spring marquee auctions. Not the hammer prices. The guarantee structures behind them.',
    ],
  },
  {
    slug: 'money-stories-wangari-unbowed',
    department: 'Spotlight',
    series: 'Money Stories',
    title: 'She was planting trees while the world called her dangerous',
    dek: 'Before the Nobel Prize, there was a woman planting trees alone. Money Stories begins with Wangari Maathai, and the long years before the world caught up.',
    date: '2026-05-23',
    image: '/images/wangari_maathai_portrait.jpg',
    imageAlt: 'A graphite portrait of Wangari Maathai',
    credit: 'Wangari Maathai. Art to Soul No. 1, graphite and mixed media by Morris Javan. The Money Stories centrepiece portrait of Kathleen Mureithi accompanies the series.',
    byline: 'Kathleen Mureithi, Financial Adviser',
    body: [
      'Before the Nobel Prize, there was a woman planting trees alone.',
      'Before the standing ovations in Oslo, there were police batons. Before the honorary doctorates and the UN podiums and the streets renamed in her honour, there was a government that called her work subversive, a husband who left her because she was too strong-minded for a woman, and a judge who jailed her for daring to say he was corrupt.',
      'Before Wangari Maathai was celebrated, she was resisted. Loudly. Repeatedly. By people with the power to make resistance painful. And she planted trees anyway.',
      'I have been thinking about her story a great deal lately, not because of the prize, but because of the years before it. The twenty-seven years between the first seven seedlings she planted on World Environment Day in 1977 and the Nobel Peace Prize Committee calling her name in 2004. What happened in those years is not a footnote. It is the whole story. And it speaks directly to something I meet in my work every day: the money stories people carry long before anyone else recognises their worth.',
      { h: 'What was always true, before it was seen' },
      'Wangari Maathai did not begin planting trees because she expected recognition. She began because she saw what others refused to see, that the deforestation stripping Kenya’s hills was not just an environmental problem. It was an economic one. A food security problem. A women’s empowerment problem. A democracy problem.',
      'She understood, before the language for it existed in policy circles, that you cannot separate the health of the land from the financial health of the household. That a woman walking six hours for firewood cannot plant crops, cannot earn income, cannot educate her children.',
      'She acted on it, not with a grand strategy backed by donors, but with seven seedlings and a backyard nursery and a belief that ordinary women, given tools and agency, would do the rest. She was right. The movement planted over 51 million trees across Kenya. But that number arrived one tree at a time, across decades, in the face of a government that saw her not as a conservationist but as a threat.',
      'The value was always there. The world just had not decided to see it yet.',
      { h: 'The cost of being right too early' },
      'Her opposition to a sixty-story development planned for the middle of Uhuru Park led the government of President Daniel arap Moi to label both Maathai and the Green Belt Movement subversive. She was vilified in Parliament and forced to vacate her office of ten years with 24 hours’ notice. In 1992, at a hunger strike to free political prisoners, she was beaten unconscious by police. Her husband divorced her, publicly, calling her too educated, too strong. The judge who ruled in his favour had her jailed for contempt.',
      'She was beaten. Jailed. Ridiculed. Dismissed. And called dangerous by the very people who needed her work the most.',
      { quote: 'Nobody would have bothered me if all I did was encourage women to plant trees.', cite: 'Wangari Maathai' },
      'The moment her work began to threaten power, the moment it was clearly working, was the moment the resistance intensified. The persecution was not a sign that she was wrong. It was a sign that she was right.',
      { h: 'The Wangari Principle' },
      'In my work as a financial adviser, I sit with people’s money stories every day. And I have come to believe something I want to name plainly: the value of your financial story is not determined by the moment someone else recognises it.',
      'I meet women, often women, who have been building quietly for years. Running households on impossible budgets. Raising children while servicing debt someone else took on. Saving a few dollars a month in a stokvel nobody in their professional circle takes seriously. Making micro-decisions that, compounded over time, are extraordinary financial discipline. And yet they come to me apologising, for not starting sooner, for not having more.',
      'Wangari did not wait for the Nobel to validate her work. She planted her next tree the day she was released from prison. The work was the work. The value was the value. The recognition was just the world catching up.',
      { h: 'The Unbowed lesson' },
      'She named her memoir Unbowed. Not Triumphant. Not Celebrated. Unbowed. Because the thing worth preserving, through the beatings and the jailings and the divorce, was not her comfort or her reputation. It was her direction.',
      { quote: 'Until you dig a hole, you plant a tree, you water it, and make it survive, you haven’t done a thing. You’re just talking.', cite: 'Wangari Maathai' },
      'Stay unbowed toward your financial future. Not because the recognition will certainly come, but because the work of planting something that will outlast this season is worth doing for its own sake. The trees are real. The roots are deep. Even when nobody is looking.',
    ],
  },
];

export function bySlug(slug: string) { return ARTICLES.find((a) => a.slug === slug); }

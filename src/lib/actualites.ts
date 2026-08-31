import Parser from 'rss-parser';

export interface ActualiteItem {
  title: string;
  link: string;
  source: string;
  pubDate: Date;
  contentSnippet?: string;
}

// Sources RSS externes, gratuites et publiques. Chaque source est indépendante — si l'une
// tombe ou change d'URL, elle est simplement ignorée (voir fetchActualites), jamais bloquante.
const SOURCES = [
  { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/' },
  { name: 'AWS Machine Learning Blog', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { name: 'KDnuggets', url: 'https://www.kdnuggets.com/feed' },
  { name: 'Towards Data Science', url: 'https://towardsdatascience.com/feed' },
  { name: 'Netflix Tech Blog', url: 'https://netflixtechblog.com/feed' },
  { name: 'Databricks Blog', url: 'https://www.databricks.com/feed' },
  { name: 'Google Research', url: 'https://research.google/blog/rss/' },
  { name: 'Microsoft Research', url: 'https://www.microsoft.com/en-us/research/feed/' },
];

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: 'application/rss+xml, application/xml, text/xml, */*',
  },
});

export async function fetchActualites(maxParSource = 5, maxTotal = 30): Promise<ActualiteItem[]> {
  const resultats = await Promise.allSettled(
    SOURCES.map(async (source) => {
      const feed = await parser.parseURL(source.url);
      return (feed.items ?? []).slice(0, maxParSource).map((item) => ({
        title: item.title ?? '(sans titre)',
        link: item.link ?? source.url,
        source: source.name,
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(0),
        contentSnippet: item.contentSnippet?.slice(0, 200),
      }));
    })
  );

  const items: ActualiteItem[] = [];
  for (const resultat of resultats) {
    if (resultat.status === 'fulfilled') {
      items.push(...resultat.value);
    }
    // Une source en échec (down, URL changée, timeout) est ignorée silencieusement —
    // jamais de raison de faire échouer tout le build pour une seule source externe.
  }

  return items
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
    .slice(0, maxTotal);
}

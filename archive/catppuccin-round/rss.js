function generateRSS() {
    const websiteURL = "https://blanche.nekoweb.org/"; // Replace with your website's URL
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Bianca's corner</title>
    <link>${websiteURL}</link>
    <description>Bianca's blog of random things.</description>
    ${posts
        .map(post => `
    <item>
      <title>${post.title}</title>
      <link>${websiteURL}/posts/${encodeURIComponent(post.file)}</link>
      <description>${post.title}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${websiteURL}/posts/${encodeURIComponent(post.file)}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

    // Create a downloadable link for the RSS feed
    const blob = new Blob([rss], { type: 'application/rss+xml' });
    const rssURL = URL.createObjectURL(blob);

    // Append a link to download the RSS feed
    const link = document.createElement('a');
    link.href = rssURL;
    link.download = 'rss.xml';
    link.textContent = 'Download RSS Feed';
    document.body.appendChild(link);
}
generateRSS();
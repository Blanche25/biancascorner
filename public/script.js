const posts = [
  {
    title: "oh hey i have a website now",
    date: "2025-01-03",
    file: "oh hey i have a website now.html",
  },
  {
    title: "when the house leaves or smth",
    date: "2025-01-05",
    file: "when the house leaves or smth.html",
  },
  {
    title: "breaking nintendo's tos because i can",
    date: "2025-02-03",
    file: "breaking nintendo's tos because i can.html",
  },
];

async function getRecentPosts() {
  const recentPosts = posts
    .filter((post) => post.file.endsWith(".html"))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (most recent first)
    .slice(0, 3);

  return recentPosts;
}

async function displayPosts() {
  const outputElement = document.getElementById("posts-list");
  const recentPosts = await getRecentPosts();

  const ul = document.createElement("ul");
  recentPosts.forEach((post) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `posts/${post.file}`;
    a.textContent = `${post.date} - ${post.title}`;
    li.appendChild(a);
    ul.appendChild(li);
  });

  outputElement.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", displayPosts);

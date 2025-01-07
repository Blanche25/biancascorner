const posts = [
    { title: "01-oh hey i have a website now", date: "2025-01-03", file: "01-oh hey i have a website now.html" },
    { title: "02-when the house leaves or smth", date: "2025-01-05", file: "02-when the house leaves or smth.html" }
];

async function getRecentPosts() {
    const recentPosts = posts
        .filter(post => post.file.endsWith('.html'))
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (most recent first)
        .slice(0, 3);

    return recentPosts;
}

async function displayPosts() {
    const outputElement = document.getElementById('posts-list');
    const recentPosts = await getRecentPosts();

    const ul = document.createElement('ul');
    recentPosts.forEach((post) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `posts/${post.file}`;
        a.textContent = `${post.title} - ${post.date}`;
        li.appendChild(a);
        ul.appendChild(li);
    });

    outputElement.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', displayPosts);

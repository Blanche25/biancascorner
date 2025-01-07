const posts = [
    "01-oh hey i have a website now.html",
    "02-when the house leaves or smth.html"
];

async function fetchDirectoryListing() {
    try {
        const response = await fetch('/posts/posts.json');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching post list:', error);
        return null;
    }
}

async function getRecentPosts() {
    const directoryHtml = await fetchDirectoryListing();
    if (!directoryHtml) return posts;

    const parser = new DOMParser();
    const doc = parser.parseFromString(directoryHtml, 'text/html');
    
    const recentPosts = Array.from(doc.querySelectorAll('a'))
        .filter(link => link.href.endsWith('.html'))
        .map(link => link.href.split('/').pop())
        .sort((a, b) => b.localeCompare(a))
        .slice(0, 3);

    return recentPosts.length > 0 ? recentPosts : posts;
}

async function displayPosts() {
    const outputElement = document.getElementById('posts-list');
    
    const recentPosts = await getRecentPosts();
    
    const ul = document.createElement('ul');
    recentPosts.forEach((post) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `posts/${post}`;
        a.textContent = post.replace('.html', '');
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    outputElement.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', displayPosts);
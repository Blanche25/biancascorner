// Manually specify the post filenames
const posts = [
    "01-oh_hey_i_have_a_website_now.html"
];

// Function to fetch directory listing
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

// Function to parse and get the 3 most recent posts
async function getRecentPosts() {
    const directoryHtml = await fetchDirectoryListing();
    if (!directoryHtml) return posts; // Fallback to manual posts if fetch fails

    const parser = new DOMParser();
    const doc = parser.parseFromString(directoryHtml, 'text/html');
    
    // Get all links ending in .html and sort them in reverse order
    const recentPosts = Array.from(doc.querySelectorAll('a'))
        .filter(link => link.href.endsWith('.html'))
        .map(link => link.href.split('/').pop())
        .sort((a, b) => b.localeCompare(a))
        .slice(0, 3);

    return recentPosts.length > 0 ? recentPosts : posts; // Fallback to manual posts if none found
}

// Function to display the posts as an unordered list
async function displayPosts() {
    const outputElement = document.getElementById('posts-list'); // The element where the list will be displayed
    
    // Get the most recent posts
    const recentPosts = await getRecentPosts();
    
    // Create the unordered list
    const ul = document.createElement('ul');
    recentPosts.forEach((post) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `posts/${post}`; // Adjust the folder path if needed
        a.textContent = post.replace('.html', ''); // Remove .html from the link text
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    // Append the list to the output element
    outputElement.appendChild(ul);
}

// Call the function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayPosts);
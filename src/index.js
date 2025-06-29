const baseURL = "http://localhost:3000/posts";
const postList = document.getElementById("post-list");
const postDetail = document.getElementById("post-detail");
const newPostForm = document.getElementById("new-post-form");

function main() {
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = ""; // clear list
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(div);
      });
    });
}

function handlePostClick(postId) {
  fetch(`${baseURL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>By ${post.author}</em></p>
      `;
    });
}

function addNewPostListener() {
  newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newPost = {
      title: newPostForm.title.value,
      content: newPostForm.content.value,
      author: newPostForm.author.value,
    };

    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then(res => res.json())
      .then(post => {
        displayPosts(); // Refresh the list
        newPostForm.reset();
      });
  });
}

document.addEventListener("DOMContentLoaded", main);

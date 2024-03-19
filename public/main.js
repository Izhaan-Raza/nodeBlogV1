document.addEventListener("DOMContentLoaded", function() {
    fetch('/posts') // Assumes your server endpoint for fetching posts is '/posts'
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        data.forEach(blog => {
            const card = document.createElement('div');
            card.classList.add('card');

            const date = document.createElement('p');
            date.classList.add('date');
            date.innerHTML = blog.date;

            const title = document.createElement('h2');
            title.textContent = blog.title;

            const content = document.createElement('p');
            content.innerHTML = blog.content;

            const foot = document.createElement('p');
            foot.style.alignSelf = 'flex-end';
            foot.style.fontStyle = 'italic';
            foot.style.color = 'gray';
            foot.textContent = "~chai";

            const photo = document.createElement('img');
            photo.classList.add('photo');
            photo.src = blog.photo;
            photo.alt = 'Blog Post Image';

            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(date);
            if (blog.photo) {
                card.appendChild(photo);
            }
            card.appendChild(foot);
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching blog data:', error);
    });
});

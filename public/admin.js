document.addEventListener("DOMContentLoaded", function() {
    const blogForm = document.getElementById('blogForm');

    blogForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(blogForm);
        const postData = {};
        formData.forEach((value, key) => {
            postData[key] = value;
        });

        // Send POST request to server
        fetch('/admin/addpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('New blog post added successfully:', data);
            // Redirect or show success message to the user
            window.location.href = '/'; // Redirect to home page
        })
        .catch(error => {
            console.error('Error adding post:', error);
            // Handle error, show error message to the user, etc.
        });
    });
});

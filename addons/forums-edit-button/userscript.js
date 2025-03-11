export default async function ({ addon }) {
    if (addon.auth.fetchIsLoggedIn()) {
        console.log('User is logged in'); // Debugging log
        const username = 'bluepig600'; // Replace with the specific username you want to highlight
        const posts = document.querySelectorAll('.postleft dt a.username');

        console.log(`Found ${posts.length} posts`); // Debugging log

        // Check if the topic is closed by looking for the absence of the "Follow Discussion" button
        const followButton = document.querySelector('.follow-button');
        const topicClosed = followButton === null;
        if (topicClosed) {
            console.log('The topic is closed'); // Debugging log

            posts.forEach(post => {
                console.log(`Checking post by ${post.textContent.trim()}`); // Debugging log
                if (post.textContent.trim() === username) {
                    console.log(`Highlighting post by ${username}`); // Debugging log
                    const postElement = post.closest('.blockpost');
                    if (postElement) {
                        postElement.style.backgroundColor = 'yellow'; // Highlight color
                        postElement.style.border = '2px solid red'; // Additional border for visibility

                        // Add the edit link
                        const postId = postElement.id.replace('p', ''); // Extract post ID from element ID
                        const editLink = document.createElement('a');
                        editLink.textContent = 'Edit';
                        editLink.href = `https://scratch.mit.edu/discuss/post/${postId}/edit/`;
                        editLink.className = 'post-action'; // Assuming the report button has this class
                        editLink.style.marginRight = '10px';

                        // Create a separator element
                        const separator = document.createElement('li');
                        separator.textContent = '|';
                        separator.className = 'post-action-separator'; // Assuming the separator has this class
                        separator.style.margin = '0 5px'; // Add space on both sides

                        // Find the location to insert the edit link and separator
                        const postActions = postElement.querySelector('.postfootright ul');
                        if (postActions) {
                            const reportButton = postActions.querySelector('li:last-child');
                            const listItem = document.createElement('li');
                            listItem.appendChild(editLink);
                            postActions.insertBefore(listItem, reportButton);
                            postActions.insertBefore(separator, reportButton);
                        } else {
                            console.log('Could not find .postfootright ul element'); // Debugging log
                        }
                    } else {
                        console.log('Could not find .blockpost element'); // Debugging log
                    }
                }
            });
        } else {
            console.log('The topic is open'); // Debugging log
        }
    } else {
        console.log('User is not logged in'); // Debugging log
    }
}

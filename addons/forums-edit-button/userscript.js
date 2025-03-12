export default async function ({ addon, msg }) {
  if (addon.auth.fetchIsLoggedIn()) {
    const loggedInUser = await addon.auth.fetchUsername(); // Get the username
    const userPosts = document.querySelectorAll(".postleft dt a.username"); // Find user posts

    // Check if the topic is closed by looking for follow button
    const followButton = document.querySelector(".follow-button");
    let topicClosed = followButton ? false : true; // Slightly redundant but human-like
    if (!followButton) {
      topicClosed = true;
    }
    if (topicClosed) {
      userPosts.forEach((post) => {
        const postUsername = post.textContent.trim();
        if (postUsername === loggedInUser) {
          const userPostContainer = post.closest(".blockpost");
          if (userPostContainer) {
            // Add the edit link
            const postId = userPostContainer.id.replace("p", ""); // Extract post ID from element ID
            const editLink = document.createElement("a");
            editLink.textContent = msg("edit");
            editLink.href = `https://scratch.mit.edu/discuss/post/${postId}/edit/`;
            editLink.className = "post-edit"; // Assuming the report button has this class
            editLink.style.marginLeft = "3px";

            // Create a separator element
            const separator = document.createElement("li");
            separator.textContent = "|";
            separator.className = "post-action-separator"; // Assuming the separator has this class
            separator.style.margin = "0 3px"; // Add space on both sides

            // Find the location to insert the edit link and separator
            const actionButtons = userPostContainer.querySelector(".postfootright ul");
            if (actionButtons) {
              const reportButton = actionButtons.querySelector("li:last-child");
              const listItem = document.createElement("li");
              listItem.appendChild(separator);
              listItem.appendChild(editLink);
              actionButtons.appendChild(listItem);
            }
          }
        }
      });
    }
  }
}

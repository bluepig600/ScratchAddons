export default async function ({ addon, msg }) {
  if (addon.auth.fetchIsLoggedIn()) {
    const loggedInUser = await addon.auth.fetchUsername();
    const userPosts = document.querySelectorAll(".postleft dt a.username"); // get posts

    //check for follow button
    const followButton = document.querySelector(".follow-button");
    let topicClosed = followButton ? false : true;
    if (!followButton) {
      topicClosed = true;
    }
    if (topicClosed) {
      userPosts.forEach((post) => {
        const postUsername = post.textContent.trim();
        if (postUsername === loggedInUser) {
          const userPostContainer = post.closest(".blockpost");
          if (userPostContainer) {
            // add edit link
            const postId = userPostContainer.id.replace("p", "");
            const editLink = document.createElement("a");
            editLink.textContent = msg("edit");
            editLink.href = `https://scratch.mit.edu/discuss/post/${postId}/edit/`;
            editLink.className = "post-edit";
            editLink.style.marginLeft = "3px";

            // add separator
            const separator = document.createElement("li");
            separator.textContent = "|";
            separator.className = "post-action-separator";
            separator.style.margin = "0 3px";

            // add edit link and separator
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

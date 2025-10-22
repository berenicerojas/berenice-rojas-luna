//Get the body element
const body = document.body;

// -------------------- FOOTER --------------------
// Creating footer
const footer = document.createElement("footer");
// Append footer to body
body.appendChild(footer);
var today = new Date();
var thisYear = today.getFullYear();
document.querySelector("footer");
//Copyright section
const copyright = document.createElement("p");
//Included the copyright name
copyright.innerHTML = "©" + "BRG" + thisYear;
footer.appendChild(copyright);

// -------------------- Skills --------------------

const skills = ["JavaScript", "HTML", "CSS", "Adobe Photoshop", "GitHub","Python","Tableau","Excel"];
const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.textContent = skills[i];
  skillsList.appendChild(skill);
}

//----------------- Message form ------------------------
// select the leave_message form by name
const messageForm = document.querySelector("#leave_messages");

// add event listener to handle "submit"
messageForm.addEventListener("submit", function (event) {
  //Prevent the page refresh
  event.preventDefault();

  //Retrieve form field values
  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;

  //call back for listener
  console.log("Name:", userName);
  console.log("Email:", userEmail);
  console.log("Message:", userMessage);

  const messageSection = document.getElementById("Messages");

  //get the unordered list from there
  const messageList = messageSection.querySelector("ul");

  //Create a new list item
  const newMessage = document.createElement("li");
  // Set the inner HTML
  newMessage.innerHTML = `<a href="mailto:${userName}"> ${userName} </a>: <span>${userMessage}</span>`;

  //create an edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.className = "edit-btn";
  editButton.type = "button";

  //add click event listeneer to edit the message
  editButton.addEventListener("click", function () {
    const messageSpan = newMessage.querySelector("span");
    const newText = prompt("Edit your message:", messageSpan.innerText);
    if (newText !== null) {
      messageSpan.innerText = newText;
    }
  });

  //apprend the edit button to new message
  newMessage.appendChild(editButton);

  //a remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.className = "remove-btn";
  removeButton.type = "button";

  // Add click event listener to remove the message
  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
    toggleMessageSection();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  toggleMessageSection();
  //To clear the form after submission
  messageForm.reset();
});

function toggleMessageSection(){
  const messageSection = document.getElementById("Messages");
  const messageList = messageSection.querySelector("ul");

  if (messageList.children.length === 0){
    console.log("No messages to display. Section could be Hidden");
  } else{
    console.log("Messages found. Section should be visible");
  }
}
//----Fetching the API -------

fetch("https://api.github.com/users/berenicerojas/repos")

  .then((response) => {
    //ERROR fetching data
    if (!response.ok) {
      //In case something goes wrong when it fetches the data it might not be the right data.
      throw new Error(
        "Failed to fetch data from Github. Please try again later"
      );
    }

    //return the response
    return response.json();
  })
  .then((repositories) => {
    // repositories = JSON.parse(this.repositories);
    console.log("Repositories:", repositories);

    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    projectList.innerHTML = "";

    // Iterate through all public repositories
    for (let i = 0; i < repositories.length; i++) {
      // Create a new list item
      const project = document.createElement("li");
      //Create a link for the list item
      const link = document.createElement("a");
      // set the link url
      link.href = repositories[i].html_url;
      // set the text for the link
      link.textContent = repositories[i].name;
      // append the link to the list item
      project.appendChild(link);
      // append the list item to the list of projects
      projectList.appendChild(project);
    }
  })
  .catch((error) => {
    console.error("Error fetching repositories:", error);

    const projectSection = document.getElementById("Projects");

    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Unable to load projects. Please try again later";
    projectSection.appendChild(errorMessage);
  });

//Get the body element
const body = document.body;

// -------------------- FOOTER --------------------
// Creating footer
const footer = document.createElement('footer');
// Append footer to body
body.appendChild(footer);
var today = new Date();
var thisYear = today.getFullYear();
document.querySelector('footer');
//Copyright section
const copyright = document.createElement('p');
//Included the copyright name 
copyright.innerHTML = '©' + 'BRG' + thisYear;
footer.appendChild(copyright);

// -------------------- Skills --------------------

const skills = ['JavaScript', 'HTML', 'CSS', 'Adobe Photoshop', 'GitHub'];
const skillsSection = document.querySelector('#Skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

//----Fetching the API -------

fetch("https://api.github.com/users/berenicerojas/repos")
    .then((response) => {
    //ERROR fetching data 
    if (!response.ok){
        //In case something goes wrong when it fetches the data it might not be the right data.
        throw new Error("Failed to fetch data from Github. Please try again later");
    }

        //return the response
        return response.json();
})
.then((repositories) =>{
    // repositories = JSON.parse(this.repositories);
    console.log("Repositories:", repositories);

    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    projectList.innerHTML = "";

    // Iterate through all public repositories 
    for (let i = 0; i < repositories.length; i++){
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
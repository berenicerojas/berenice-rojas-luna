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
body.appendChild(copyright);
//Included the copyright name 
copyright.innerHTML = 'BRG' + '©' + thisYear;
footer.appendChild(copyright);

// -------------------- Skills --------------------

const skills = ['JavaScript', 'HTML', 'CSS', 'Adobe Photoshop', 'GitHub'];
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skill.length; i++) {
    const skill = document.createElement('ul');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
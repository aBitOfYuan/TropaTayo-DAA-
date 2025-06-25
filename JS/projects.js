document.addEventListener('DOMContentLoaded', function () {
    // Modal open/close logic
    const newProjectBtn = document.getElementById('newProjectBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    function clearProjectForm() {
        // Reset the form fields
        document.getElementById('projectForm').reset();
        // Remove all role entries
        const rolesContainer = document.getElementById('rolesContainer');
        rolesContainer.innerHTML = '';
        // Add back the initial role field
        addRoleField();
        // Re-enable add button if disabled
        document.getElementById('addRoleBtn').disabled = false;
    }

    // Show modal when "New Project" button is clicked
    newProjectBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    // Hide modal and clear form when "×" button is clicked
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        clearProjectForm();
    });

    // Hide modal and clear form when clicking outside the modal
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            clearProjectForm();
        }
    });

    // --- Dynamic Roles Logic ---
    const addRoleBtn = document.getElementById('addRoleBtn');
    const rolesContainer = document.getElementById('rolesContainer');
    const MAX_ROLES = 5;

    // Add initial role field
    addRoleField();

    // Function to add new role field
    function addRoleField() {
        // Check if limit reached
        if (rolesContainer.querySelectorAll('.role-entry').length >= MAX_ROLES) {
            alert('You can only add up to 5 roles.');
            return;
        }
        const roleId = Date.now() + Math.random(); // Unique ID for each role
        const newRoleEntry = document.createElement('div');
        newRoleEntry.className = 'role-entry';
        newRoleEntry.dataset.roleId = roleId;
        newRoleEntry.innerHTML = `
            <div class="role-input-group">
                <label>Role</label>
                <input type="text" class="roleName" placeholder="e.g. Backend Developer" required>
                
                <label>Required Skills (comma separated)</label>
                <input type="text" class="roleSkills" placeholder="e.g. Node.js, Python, SQL" required>
                
                <button type="button" class="btn-remove-role" data-role-id="${roleId}">Remove</button>
            </div>
        `;

        rolesContainer.appendChild(newRoleEntry);

        // Add event listener to the new remove button
        newRoleEntry.querySelector('.btn-remove-role').addEventListener('click', function () {
            const roleIdToRemove = this.dataset.roleId;
            const roleToRemove = document.querySelector(`.role-entry[data-role-id="${roleIdToRemove}"]`);
            if (roleToRemove) {
                rolesContainer.removeChild(roleToRemove);
            }
            // Re-enable add button if below limit
            if (rolesContainer.querySelectorAll('.role-entry').length < MAX_ROLES) {
                addRoleBtn.disabled = false;
            }
        });
    }

    // Add role button event listener
    addRoleBtn.addEventListener('click', addRoleField);

// --- Scoring Functions for Assignment ---
function calculateRoleScore(employeeRole, requiredRole) {
    let employeeRoles;
    if (Array.isArray(employeeRole)) {
        employeeRoles = employeeRole.map(function(r) {
            return r.toLowerCase();
        });
    } else {
        employeeRoles = [employeeRole.toLowerCase()];
    }

    if (employeeRoles.includes(requiredRole.toLowerCase())) {
        return 6;
    } else {
        return 0;
    }
}

// --- Scoring for Skills ---
function calculateSkillsScore(employeeSkills, requiredSkills) {
    if (!requiredSkills || requiredSkills.length === 0) {
        return 0;
    }

    const lowerEmployeeSkills = employeeSkills.map(function(s) {
        return s.toLowerCase();
    });

    const matchedSkills = requiredSkills.filter(function(skill) {
        return lowerEmployeeSkills.includes(skill.toLowerCase());
    });

    const matchedCount = matchedSkills.length;
    const matchRatio = matchedCount / requiredSkills.length;

    if (matchedCount === 0) {
        return 0;
    } else {
        return Math.ceil(matchRatio * 10);
    }
}

// --- Scoring for Experience ---
function calculateExperienceScore(employeeExp, expMin, expMax) {
    if (isNaN(expMin)) {
        return 0;
    }
    if (employeeExp >= expMin && employeeExp <= expMax) {
        return 4;
    } else {
        return 0;
    }
}

// --- Build Score Matrix ---
function buildScoreMatrix(project, employees) {
    // Filter out employees who are "Busy"
    const availableEmployees = employees.filter(function(emp) {
        return emp.status !== "Busy";
    });

    // Build the matrix
    const matrix = project.roles.map(function(role) {
        return availableEmployees.map(function(employee) {
            const roleName = role.roleName || role.role;
            const employeeExp = employee.experience;
            const roleScore = calculateRoleScore(employee.role, roleName);
            const skillsScore = calculateSkillsScore(employee.skills, role.skills);
            const expScore = calculateExperienceScore(employeeExp, project.expMin, project.expMax);
            const total = roleScore + skillsScore + expScore;

            console.log("Score for " + employee.name + " on " + roleName +
                ": Role: " + roleScore +
                ", Skills: " + skillsScore +
                ", Exp: " + expScore +
                ", Total: " + total);

            return total;
        });
    });

    // Console log: header row with employee names and roles
    const header = ['Role \\ Employee'].concat(
        availableEmployees.map(function(emp) {
            if (Array.isArray(emp.role)) {
                return emp.name + " (" + emp.role[0] + ")";
            } else {
                return emp.name + " (" + emp.role + ")";
            }
        })
    );
    console.log(header.join('\t'));
    // Console log: each row with role and scores
    matrix.forEach(function(row, i) {
        const roleName = project.roles[i].roleName || project.roles[i].role;
        console.log([roleName].concat(row).join('\t'));
    });
    // Attach availableEmployees for assignment mapping
    matrix.availableEmployees = availableEmployees;
    return matrix;
}

    // Handle form submission
    document.getElementById('projectForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const projectName = document.getElementById('projectName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const expMin = parseInt(document.getElementById('minExperience').value);
        const expMax = parseInt(document.getElementById('maxExperience').value);
        // Experience validation
        if (isNaN(expMin) || isNaN(expMax) || expMin < 1 || expMax < 1) {
            alert('Experience must be greater than 1 for both minimum and maximum.');
            return;
        }
        if (expMin >= expMax) {
            alert('Minimum experience must be less than maximum experience.');
            return;
        }
        //const dueDate = document.getElementById('dueDate') ? document.getElementById('dueDate').value : null;
        const roles = [];
        document.querySelectorAll('.role-entry').forEach(entry => {
            const roleName = entry.querySelector('.roleName').value.trim().toLowerCase();
            const skills = entry.querySelector('.roleSkills').value
                .split(',')
                .map(skill => skill.trim().toLowerCase())
                .filter(skill => skill.length > 0);
            if (roleName) {
                roles.push({
                    roleName: roleName,
                    skills: skills
                });
            }
        });
        const projectData = {
            name: projectName,
            description: projectDescription,
            expMin: expMin,
            expMax: expMax,
            roles: roles
        };
        const employeesArr = window.employeesData || [];
        if (!employeesArr.length) {
            alert('No employee data found!');
            return;
        }
        // Generate score matrix
        const scoreMatrix = buildScoreMatrix(projectData, employeesArr);
        // Use the attached availableEmployees for assignment
        const availableEmployees = scoreMatrix.availableEmployees;
        // Run Hungarian algorithm
        const paddedMatrix = padToSquare(addTinyNoise(scoreMatrix));
        const result = hungarianAlgorithm(paddedMatrix);
        // Process assignments
        const realAssignments = result.assignment.filter(({ role, employee }) =>
            role < projectData.roles.length &&
            employee < availableEmployees.length
        );
        // Create project team
        const projectTeam = realAssignments.map(ass => {
            const emp = availableEmployees[ass.employee];
            // Set employee status to Busy
            if (window.employeesData) {
                const empObj = window.employeesData.find(e => e.name === emp.name);
                if (empObj) {
                    empObj.status = 'Busy';
                    empObj.statusClass = 'status-busy';
                }
            }
            return {
                name: emp.name,
                role: projectData.roles[ass.role].roleName,
                skills: emp.skills,
                image: emp.img
            };
        });
        // Create new project
        const newProject = {
            name: projectData.name,
            description: projectData.description,
            team: projectTeam,
            created: new Date().toLocaleDateString(),
            status: 'Active'
        };
        // Add to project list
        window.projectDetailsData.push(newProject);
        // --- Local Storage: Save to local storage after adding new project ---
        const localStorageKey = 'projectDetailsData';
        localStorage.setItem(localStorageKey, JSON.stringify(window.projectDetailsData));
        // Close modal and reset form
        modalOverlay.classList.remove('active');
        clearProjectForm();
        alert('Project created with optimal team assignment!');
        // Refresh project display
        renderProjects();
    });
});

// Initial project data with created and status fields
const initialProjectData = [
    {
        name: "Website Redesign",
        description: "A complete overhaul of the company website for better UX.",
        team: [
            { 
                name: "Felip Jhon Suson", 
                role: "Full Stack Developer",
                skills: ["React", "Node.js", "MongoDB"],
                image: "../Images/nek.jpg"
            },
            { 
                name: "Aiah Arceta", 
                role: "Graphic Designer",
                skills: ["Adobe Photoshop", "Illustrator", "Canva", "Figma", "Sketch"],
                image: "../Images/aiah.jpg"
            },
            { 
                name: "Justin De Dios", 
                role: "Backend Developer", 
                skills: ["Node.js", "Express", "MongoDB"],
                image: "../Images/justin.jpg"
            },
            { 
                name: "Sara Duterte", 
                role:  "DevOps Engineer",
                skills: ["Docker", "Kubernetes", "AWS"],
                image: "../Images/sara-duterte.jpg"
            },
            { 
                name: "Bongbong Marcos", 
                role:  "System Administrator",
                skills: ["Linux", "Networking", "Security"],
                image: "../Images/bbm.jpg"
            },
        ],
        created: 'May 15, 2023',
        status: 'In Progress'
    }
];

// Initialize global project data if it doesn't exist
// --- Local Storage: Load from local storage if available ---
const localStorageKey = 'projectDetailsData';

let storedProjects = localStorage.getItem(localStorageKey);
window.projectDetailsData = window.projectDetailsData || [];
if (storedProjects) {
    try {
        window.projectDetailsData = JSON.parse(storedProjects);
    } catch (e) {
        // If parsing fails, fallback to initial data
        window.projectDetailsData = [];
    }
}
if (window.projectDetailsData.length === 0) {
    window.projectDetailsData.push(...initialProjectData);
    // Save initial data to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(window.projectDetailsData));
}

// Modal elements
const detailsModalOverlay = document.getElementById('detailsModalOverlay');
const detailsModalCloseBtn = document.getElementById('detailsModalCloseBtn');
const detailsProjectName = document.getElementById('detailsProjectName');
const detailsProjectDescription = document.getElementById('detailsProjectDescription');
const detailsTeamMembers = document.getElementById('detailsTeamMembers');

// Attach event listeners to all view details buttons
// Update the details modal population code to include meta info
document.querySelectorAll('.btn-view-details').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const project = window.projectDetailsData[idx];
        detailsProjectName.textContent = project.name;
        detailsProjectDescription.textContent = project.description;

        // Create meta information HTML
        const metaHtml = `
            <div class="project-meta">
                <div class="meta-item">
                    <span class="meta-icon">📅</span>
                    <div>
                        <div class="meta-label">Created</div>
                        <div class="meta-value">${project.created || 'May 15, 2023'}</div>
                    </div>
                </div>
                <div class="meta-item">
                    <span class="meta-icon">📌</span>
                    <div>
                        <div class="meta-label">Status</div>
                        <div class="meta-value">${project.status || 'In Progress'}</div>
                    </div>
                </div>
                <div class="meta-item">
                    <span class="meta-icon">👥</span>
                    <div>
                        <div class="meta-label">Team Size</div>
                        <div class="meta-value">${project.team.length} members</div>
                    </div>
                </div>
            </div>
        `;

        // Create team members HTML
        const teamHtml = project.team.slice(0, 5).map(member => {
            // Render roles as badges if array, else as single badge
            let rolesHTML = '';
            if (Array.isArray(member.role)) {
                rolesHTML = member.role.map(role => `<span class="member-role-badge">${role}</span>`).join(' ');
            } else {
                rolesHTML = `<span class="member-role-badge">${member.role}</span>`;
            }
            return `
                <div class="team-member-card">
                    <div class="member-avatar">
                        <img src="${member.image || 'nek.jpg'}" alt="${member.name}" onerror="this.src='nek.jpg'">
                    </div>
                    <div class="member-content">
                        <div class="member-header">
                            <div class="member-name">${member.name}</div>
                            <div class="member-role">${rolesHTML}</div>
                        </div>
                        <div class="member-skills">
                            <span class="skills-label">Skills:</span>
                            ${member.skills.map(skill => `<span class="skill-tag">${skill.toLowerCase()}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        // Combine and insert into modal
        detailsTeamMembers.innerHTML = metaHtml + teamHtml;
        detailsModalOverlay.classList.add('active');
    });
});

// Close modal logic
detailsModalCloseBtn.addEventListener('click', () => {
    detailsModalOverlay.classList.remove('active');
});

detailsModalOverlay.addEventListener('click', (e) => {
    if (e.target === detailsModalOverlay) {
        detailsModalOverlay.classList.remove('active');
    }
});

function renderProjects() {
    const ongoingGrid = document.querySelector('.ongoing-grid');
    if (!ongoingGrid) return;
    ongoingGrid.innerHTML = '';
    window.projectDetailsData.forEach((project, idx) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'ongoing-card primary';
        projectCard.innerHTML = `
            <h4>${project.name}</h4>
            <p class="created-date">Created on: ${project.created}</p>
            <button class="btn-view-details" data-index="${idx}">View Details</button>
        `;
        ongoingGrid.appendChild(projectCard);
    });
    // Reattach event listeners
    document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-index');
            showProjectDetails(idx);
        });
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);

function showProjectDetails(index) {
    const project = window.projectDetailsData[index];
    if (!project) return;
    detailsProjectName.textContent = project.name;
    detailsProjectDescription.textContent = project.description;
    const metaHtml = `
        <div class="project-meta">
            <div class="meta-item">
                <span class="meta-icon">📅</span>
                <div>
                    <div class="meta-label">Created</div>
                    <div class="meta-value">${project.created}</div>
                </div>
            </div>
            <div class="meta-item">
                <span class="meta-icon">📌</span>
                <div>
                    <div class="meta-label">Status</div>
                    <div class="meta-value">${project.status}</div>
                </div>
            </div>
            <div class="meta-item">
                <span class="meta-icon">👥</span>
                <div>
                    <div class="meta-label">Team Size</div>
                    <div class="meta-value">${project.team.length} members</div>
                </div>
            </div>
        </div>
    `;
    const teamHtml = project.team.map(member => {
        return `
            <div class="team-member-card">
                <div class="member-avatar">
                    <img src="${member.image || 'nek.jpg'}" alt="${member.name}" onerror="this.src='nek.jpg'">
                </div>
                <div class="member-content">
                    <div class="member-header">
                        <div class="member-name">${member.name}</div>
                        <div class="member-role">
                            <span class="member-role-badge">${Array.isArray(member.role) ? member.role.map(r => toTitleCase(r)).join(', ') : toTitleCase(member.role)}</span>
                        </div>
                    </div>
                    <div class="member-skills">
                        <span class="skills-label">Skills:</span>
                        ${member.skills.map(skill => `<span class="skill-tag">${skill.toLowerCase()}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    detailsTeamMembers.innerHTML = metaHtml + teamHtml;
    detailsModalOverlay.classList.add('active');
}

// Function to convert a string to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

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

    // Handle form submission
    document.getElementById('projectForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const projectName = document.getElementById('projectName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const expMin = document.getElementById('expMin').value;
        const expMax = document.getElementById('expMax').value;
        const dueDate = document.getElementById('dueDate').value;
        const roles = [];
        document.querySelectorAll('.role-entry').forEach(entry => {
            const roleName = entry.querySelector('.roleName').value;
            const skills = entry.querySelector('.roleSkills').value
                .split(',')
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0);

            if (roleName) {
                roles.push({
                    role: roleName,
                    skills: skills
                });
            }
        });

        // Example: log the result or send to backend
        console.log({
            projectName,
            projectDescription,
            expMin,
            expMax,
            dueDate,
            roles
        });

        alert('Project created successfully!');
        modalOverlay.classList.remove('active');
    });
});

// Sample data for demonstration
const projectDetailsData = [
    {
        name: "Website Redesign",
        description: "A complete overhaul of the company website for better UX.",
        team: [
            { 
                name: "Felip Jhon Suson", 
                role: ["Full Stack Developer", "Software Engineer", "Web Developer"],
                skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS"],
                image: "../Images/nek.jpg" // <-- unique image
            },
            { 
                name: "Aiah Arceta", 
                role: ["Graphic Designer", "Visual Artist", "Content Creator"],
                skills: ["Adobe Photoshop", "Illustrator", "Canva", "Figma", "Sketch"],
                image: "../Images/aiah.jpg" // <-- unique image
            },
            { 
                name: "Justin De Dios", 
                role: "Backend Developer", 
                skills: ["Node.js", "Express", "MongoDB"],
                image: "../Images/justin.jpg" // <-- unique image
            },
            { 
                name: "Sara Duterte", 
                role:  "DevOps Engineer",
                skills: ["Docker", "Kubernetes", "AWS"],
                image: "../Images/sara-duterte.jpg" // <-- unique image
            },
            { 
                name: "Bongbong Marcos", 
                role:  "System Administrator",
                skills: ["Linux", "Networking", "Security"],
                image: "../Images/bbm.jpg" // <-- unique image
            },
        ]
    }

];

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
        const project = projectDetailsData[idx];
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
                            ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
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

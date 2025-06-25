let uploadedImageDataURL = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load from localStorage or initialize with default data
    const savedData = localStorage.getItem('employeesData');
    window.employeesData = savedData ? JSON.parse(savedData) : [
    {
        id: 1,
        name: "Aiah Arceta",
        img: "../Images/aiah.jpg",
        role: ["Graphic Designer", "Visual Artist", "Content Creator"],
        status: "Available",
        statusClass: "status-available",
        email: "aiah.arceta@company.ph",
        phone: "0917 123 4567",
        department: "Creative",
        location: "Makati, Metro Manila",
        skills: ["Adobe Photoshop", "Illustrator", "Canva", "Figma", "Sketch"],
        bio: "Skilled graphic designer and visual artist specializing in digital and print media. Creates compelling content that engages audiences.",
        experience: 5
    },
    {
        id: 2,
        name: "Felip Jhon Suson",
        img: "../Images/nek.jpg",
        role: ["Full Stack Developer", "Software Engineer", "Web Developer"],
        status: "Busy",
        statusClass: "status-busy",
        email: "felip.suson@company.ph",
        phone: "0928 234 5678",
        department: "IT",
        location: "Quezon City",
        skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS"],
        bio: "Versatile full-stack developer with expertise in building scalable web applications using React, Node.js, and MongoDB.",
        experience: 7
    },
    {
        id: 3,
        name: "Justin De Dios",
        img: "../Images/justin.jpg",
        role: "Backend Developer",
        status: "Available",
        statusClass: "status-available",
        email: "justin.dedios@company.ph",
        phone: "0915 345 6789",
        department: "Human Resources",
        location: "Pasig City",
        skills: ["Node.js", "Express", "MongoDB"],
        bio: "Backend developer focused on building robust APIs and server-side solutions to support HR systems and workflows.",
        experience: 3
    },
    {
        id: 4,
        name: "Bongbong Marcos",
        img: "../Images/bbm.jpg",
        role:  "DevOps Engineer",
        status: "Available",
        statusClass: "status-available",
        email: "bongbong.marcos@company.ph",
        phone: "0947 456 7890",
        department: "Development",
        location: "Cebu City",
        skills: ["Docker", "Kubernetes", "AWS"],
        bio: "Experienced DevOps engineer skilled in containerization, orchestration, and cloud infrastructure management.",
        experience: 8
    },
    {
        id: 5,
        name: "Sara Duterte",
        img: "../Images/sara-duterte.jpg",
        role:  "System Administrator",
        status: "Busy",
        statusClass: "status-busy",
        email: "sara.duterte@company.ph",
        phone: "0933 567 8901",
        department: "Marketing",
        location: "Davao City",
        skills: ["Linux", "Networking", "Security"],
        bio: "System administrator ensuring secure and reliable IT infrastructure to support marketing operations.",
        experience: 6
    },
    {
        id: 6,
        name: "Sana Minatozaki",
        img: "../Images/sana.webp",
        role: ["Security Engineer", "Penetration Tester"],
        status: "Available",
        statusClass: "status-available",
        email: "sana.minatozaki@company.ph",
        phone: "0956 678 9012",
        department: "Quality Assurance",
        location: "Mandaluyong City",
        skills: ["SIEM Tools", "Firewall Configuration", "IDS/IPS", "Ethical Hacking", "Metasploit", "OWASP Top 10"],
        bio: "Security engineer specializing in penetration testing and vulnerability assessment to protect company assets.",
        experience: 4
    },
    {
        id: 7,
        name: "Kim Tae-hyung",
        img: "../Images/taeh.jpg",
        role: ["Frontend Developer", "UI Developer"],
        status: "Busy",
        statusClass: "status-busy",
        email: "kim.taehyung@company.ph",
        phone: "0908 789 0123",
        department: "Design",
        location: "Baguio City",
        skills: ["React", "TypeScript", "Redux", "Figma", "Storybook", "CSS-in-JS"],
        bio: "Frontend developer focused on building user-friendly interfaces with React and TypeScript, emphasizing accessibility.",
        experience: 5
    },
    {
        id: 8,
        name: "Jennie Kim",
        img: "../Images/jennie.jpg",
        role: ["Cloud Architect", "DevOps Engineer"],
        status: "Available",
        statusClass: "status-available",
        email: "jennie.kim@company.ph",
        phone: "0999 890 1234",
        department: "IT",
        location: "Taguig City",
        skills: ["AWS Solutions", "Terraform", "Cloud Security", "Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
        bio: "Cloud architect and DevOps engineer designing secure, scalable cloud infrastructure with automation and CI/CD pipelines.",
        experience: 9
    },
    {
        id: 9,
        name: "Mary Loi Ricalde",
        img: "../Images/maloi.jpg",
        role: ["Technical Project Manager", "Scrum Master"],
        status: "Busy",
        statusClass: "status-busy",
        email: "mariloi.ricalde@company.ph",
        phone: "0910 901 2345",
        department: "Operations",
        location: "Iloilo City",
        skills: ["Agile Methodologies", "Risk Management", "JIRA", "Sprint Planning", "Retrospectives", "Team Coaching"],
        bio: "Technical project manager and Scrum Master driving agile teams to deliver projects on time and within scope.",
        experience: 10
    },
    {
        id: 10,
        name: "Jang Wonyoung",
        img: "../Images/jang.jpg",
        role: ["Backend Developer", "API Specialist"],
        status: "Available",
        statusClass: "status-available",
        email: "jang.wonyoung@company.ph",
        phone: "0921 012 3456",
        department: "Engineering",
        location: "Cavite",
        skills: ["Node.js", "Python", "Microservices", "RESTful APIs", "GraphQL", "Swagger"],
        bio: "Backend developer specializing in API design and microservices architecture using Node.js and Python.",
        experience: 7
    },
    {
        id: 11,
        name: "Coco Martin",
        img: "../Images/coco.jpg",
        role: "Content Writer",
        status: "Available",
        statusClass: "status-available",
        email: "coco.martin@company.ph",
        phone: "0932 123 4567",
        department: "Communications",
        location: "Batangas",
        skills: ["Copywriting", "Blogging", "SEO"],
        bio: "Content writer crafting engaging and SEO-optimized stories that align with brand messaging.",
        experience: 4
    },
    {
        id: 12,
        name: "Kween Yasmin",
        img: "../Images/kween.jpg",
        role: ["Data Engineer", "ETL Developer"],
        status: "Busy",
        statusClass: "status-busy",
        email: "kween.yasmin@company.ph",
        phone: "0912 234 5678",
        department: "IT",
        location: "San Fernando, Pampanga",
        skills:  ["Apache Spark", "Data Pipelines", "Big Data", "Informatica", "Talend", "Data Warehousing"],
        bio: "Data engineer skilled in building and optimizing ETL pipelines and managing big data solutions.",
        experience: 6
    },
    {
        id: 13,
        name: "Im Na-yeon",
        img: "../Images/nayeon.jpg",
        role: ["Data Analyst", "Business Intelligence Analyst", "Data Scientist"],
        status: "Available",
        statusClass: "status-available",
        email: "im.na-yeon@company.ph",
        phone: "0943 345 6789",
        department: "Analytics",
        location: "General Santos City",
        skills: ["Excel", "Power BI", "Python"],
        bio: "Data analyst passionate about uncovering insights and creating impactful visualizations using Power BI and Python.",
        experience: 5
    },
    {
        id: 14,
        name: "Naruto Uzumaki",
        img: "../Images/naruto.jpg",
        role: ["Machine Learning Engineer", "Data Scientist"],
        status: "Available",
        statusClass: "status-available",
        email: "naruto.uzumaki@company.ph",
        phone: "0906 456 7890",
        department: "Support",
        location: "Cagayan de Oro",
        skills: ["TensorFlow", "Model Deployment", "MLOps", "Python", "Pandas", "Statistical Modeling"],
        bio: "Machine learning engineer focused on developing and deploying models to solve real-world problems.",
        experience: 8
    },
    {
        id: 15,
        name: "Monkey Luffy",
        img: "../Images/Monkey_D._Luffy.webp",
        role: ["Product Manager", "Business Analyst"],
        status: "Busy",
        statusClass: "status-busy",
        email: "monkey.luffy@company.ph",
        phone: "0914 567 8901",
        department: "Sales",
        location: "Zamboanga City",
        skills: ["Roadmapping", "User Stories", "Prioritization", "Requirements Gathering", "Process Mapping", "Use Cases"],
        bio: "Product manager and business analyst driving product strategy and aligning business goals with user needs.",
        experience: 7
    },
    {
        id: 16,
        name: "Ichigo Kurosaki",
        img: "../Images/ichigo.jpg",
        role:  ["Full Stack Developer", "Mobile Developer"],
        status: "Available",
        statusClass: "status-available",
        email: "ichigo.kurosaki@company.ph",
        phone: "0920 678 9012",
        department: "IT Support",
        location: "Antipolo",
        skills: ["React", "Node.js", "PostgreSQL", "React Native", "Flutter", "Mobile UI"],
        bio: "Full stack and mobile developer building responsive apps with React Native and Flutter for seamless user experiences.",
        experience: 4
    },
    {
        id: 17,
        name: "Kris Bernal",
        img: "../Images/kris.jpg",
        role: ["QA Automation Engineer", "Test Architect"],
        status: "Busy",
        statusClass: "status-busy",
        email: "kris.bernal@company.ph",
        phone: "0931 789 0123",
        department: "L&D",
        location: "Laguna",
        skills: ["Selenium", "Cypress", "TestNG", "Test Strategy", "Framework Design", "Performance Testing"],
        bio: "QA automation engineer designing test frameworks and strategies to ensure software quality and performance.",
        experience: 6
    },
    {
        id: 18,
        name: "Ryzza Mae Dizon",
        img: "../Images/ryzza.jpg",
        role: ["Database Administrator", "Data Architect"],
        status: "Available",
        statusClass: "status-available",
        email: "ryza.dizon@company.ph",
        phone: "0909 890 1234",
        department: "Legal",
        location: "San Juan City",
        skills: ["SQL Server", "Query Optimization", "Backup Recovery", "Database Design", "NoSQL", "Data Modeling"],
        bio: "Database administrator and data architect ensuring efficient data management and compliance with legal standards.",
        experience: 12
    },
    {
        id: 19,
        name: "Taylor Swift",
        img: "../Images/taylor.webp",
        role: ["Blockchain Developer", "Smart Contract Engineer"],
        status: "Busy",
        statusClass: "status-busy",
        email: "taylor.swift@company.ph",
        phone: "0916 901 2345",
        department: "Finance",
        location: "Muntinlupa City",
        skills: ["Solidity", "Ethereum", "Web3.js", "Security Audits", "DeFi Protocols", "Token Standards"],
        bio: "Blockchain developer specializing in smart contracts and decentralized finance protocols.",
        experience: 9
    },
    {
        id: 20,
        name: "Lebron James",
        img: "../Images/lebron.jpg",
        role: ["Site Reliability Engineer", "Performance Engineer"],
        status: "Available",
        statusClass: "status-available",
        email: "lebron.james@company.ph",
        phone: "0948 012 3456",
        department: "Marketing",
        location: "Las Piñas City",
        skills: ["Monitoring", "Incident Response", "SLIs/SLOs", "Load Testing", "Profiling", "Optimization"],
        bio: "Site reliability engineer focused on system monitoring, performance optimization, and incident response.",
        experience: 5
    }
];
 // DOM elements and state variables
    const employeeGrid = document.getElementById('employeeGrid');
    let currentEmployee = null;
    let originalEmployeeData = null;

    // Save employees to localStorage
    function saveEmployeesToStorage() {
        localStorage.setItem('employeesData', JSON.stringify(employeesData));
    }

    // Show success notification
    function showSuccessMessage(message = 'Successfully saved!') {
        const popup = document.getElementById('successPopup');
        const messageElement = popup.querySelector('.popup-message span');
        
        messageElement.textContent = message;
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }

    // Generate all employee cards
    function generateEmployeeCards() {
        if (!employeeGrid) return;
        
        employeeGrid.innerHTML = '';
        
        employeesData.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.setAttribute('data-id', employee.id);

            let firstRole = Array.isArray(employee.role) ? employee.role[0] : employee.role;
            let roleHTML = `<span class="role-badge">${firstRole}</span>`;

            card.innerHTML = `
                <div class="employee-avatar-container">
                    <img src="${employee.img}" alt="${employee.name}" class="employee-avatar">
                    <span class="status ${employee.statusClass}">${employee.status}</span>
                </div>
                <div class="divider"></div>
                <div class="employee-info">
                    <div class="employee-name">${employee.name}</div>
                    <div class="employee-role">${roleHTML}</div>
                    <div class="employee-experience">
                        <span class="experience-badge">${employee.experience} years of experience</span>
                    </div>
                    <button class="view-button">View Details</button>
                </div>
            `;
            employeeGrid.appendChild(card);
        });

        // Add click handlers to view buttons
        document.querySelectorAll('.view-button').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.employee-card');
                const employeeId = parseInt(card.getAttribute('data-id'));
                const employee = employeesData.find(emp => emp.id === employeeId);
                if (employee) showEmployeeModal(employee);
            });
        });
    }

    // Show employee modal
    function showEmployeeModal(employee, isEditMode = false) {
        currentEmployee = employee;
        originalEmployeeData = JSON.parse(JSON.stringify(employee));
        
        const modal = document.getElementById('employeeModal');
        const modalDetails = document.getElementById('modalEmployeeDetails');
        if (!modal || !modalDetails) return;

        let rolesHTML = Array.isArray(employee.role) ? 
            employee.role.map(role => `<span class="role-badge">${role}</span>`).join(' ') : 
            `<span class="role-badge">${employee.role}</span>`;

        const skillsHTML = employee.skills?.map(skill => `<span class="skill-badge">${skill}</span>`).join('') || '';

        if (isEditMode) {
            modalDetails.innerHTML = `
                <div class="modal-header">
                    <div class="modal-avatar-container">
                        <img src="${employee.img}" alt="${employee.name}" class="modal-avatar">
                        <select class="editable-select" id="statusSelect">
                            <option value="available" ${employee.status === 'Available' ? 'selected' : ''}>Available</option>
                            <option value="busy" ${employee.status === 'Busy' ? 'selected' : ''}>Busy</option>
                        </select>
                    </div>
                    <div class="modal-header-info">
                        <input type="text" class="editable-field modal-name" value="${employee.name}">
                        <input type="text" class="editable-field" id="roleInput" value="${Array.isArray(employee.role) ? employee.role.join(', ') : employee.role}" style="width:100%; margin: 0.5rem 0;">
                        <input type="number" class="editable-field" value="${employee.experience}" style="width:100%;" min="0">
                    </div>
                </div>
                <div class="modal-details">
                    <div class="detail-group">
                        <h4>Email</h4>
                        <input type="email" class="editable-field" value="${employee.email}">
                    </div>
                    <div class="detail-group">
                        <h4>Phone</h4>
                        <input type="tel" class="editable-field" value="${employee.phone}">
                    </div>
                    <div class="detail-group">
                        <h4>Department</h4>
                        <input type="text" class="editable-field" value="${employee.department}">
                    </div>
                    <div class="detail-group">
                        <h4>Location</h4>
                        <input type="text" class="editable-field" value="${employee.location}">
                    </div>
                    <div class="detail-group">
                        <h4>Skills</h4>
                        <input type="text" class="editable-field" value="${Array.isArray(employee.skills) ? employee.skills.join(', ') : employee.skills}">
                    </div>
                    <div class="detail-group">
                        <h4>About</h4>
                        <textarea class="editable-field" style="width:100%; min-height:100px;">${employee.bio}</textarea>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-button cancel-button">Cancel</button>
                    <button class="modal-button save-button">Save Changes</button>
                </div>
            `;
        } else {
            modalDetails.innerHTML = `
                <div class="modal-header">
                    <div class="modal-avatar-container">
                        <img src="${employee.img}" alt="${employee.name}" class="modal-avatar">
                        <span class="status ${employee.statusClass}">${employee.status}</span>
                    </div>
                    <div class="modal-header-info">
                        <h2 class="modal-name">${employee.name}</h2>
                        <div class="modal-roles">${rolesHTML}</div>
                        <div class="modal-experience">
                            <span class="experience-badge">${employee.experience} years of experience</span>
                        </div>
                    </div>
                </div>
                <div class="modal-details">
                    <div class="detail-group">
                        <h4>Email</h4>
                        <p>${employee.email}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Phone</h4>
                        <p>${employee.phone}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Department</h4>
                        <p>${employee.department}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Location</h4>
                        <p>${employee.location}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Skills</h4>
                        <div class="skills-container">${skillsHTML}</div>
                    </div>
                    <div class="detail-group">
                        <h4>About</h4>
                        <p>${employee.bio}</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-button edit-button">Edit</button>
                </div>
            `;
        }

        modalDetails.querySelector('.edit-button')?.addEventListener('click', enableEditMode);
        modalDetails.querySelector('.cancel-button')?.addEventListener('click', disableEditMode);
        modalDetails.querySelector('.save-button')?.addEventListener('click', saveEmployeeChanges);

        modal.style.display = "block";
    }

    // Edit mode functions
    window.enableEditMode = function() {
        showEmployeeModal(currentEmployee, true);
    };

    window.disableEditMode = function() {
        showEmployeeModal(originalEmployeeData, false);
    };

    window.saveEmployeeChanges = function() {
        const modalDetails = document.getElementById('modalEmployeeDetails');
        if (!modalDetails) return;
        
        const employeeIndex = employeesData.findIndex(emp => emp.id === currentEmployee.id);
        if (employeeIndex === -1) return;
        
        // Update all fields
        employeesData[employeeIndex].name = modalDetails.querySelector('.modal-name').value;
        
        // Properly handle role field
        const roleInput = document.getElementById('roleInput').value;
        employeesData[employeeIndex].role = roleInput.split(',').map(r => r.trim());
        
        const statusSelect = modalDetails.querySelector('#statusSelect');
        employeesData[employeeIndex].status = statusSelect.options[statusSelect.selectedIndex].text;
        employeesData[employeeIndex].statusClass = `status-${statusSelect.value}`;
        
        const expInput = modalDetails.querySelector('.modal-header-info input[type="number"]');
        employeesData[employeeIndex].experience = expInput.value ? parseInt(expInput.value) : 0;
        
        const inputs = modalDetails.querySelectorAll('.editable-field');
        employeesData[employeeIndex].email = inputs[3].value;
        employeesData[employeeIndex].phone = inputs[4].value;
        employeesData[employeeIndex].department = inputs[5].value;
        employeesData[employeeIndex].location = inputs[6].value;
        
        // Properly handle skills field
        const skillsInput = inputs[7]?.value;
        employeesData[employeeIndex].skills = skillsInput.split(',').map(s => s.trim());
        
        employeesData[employeeIndex].bio = modalDetails.querySelector('textarea')?.value;
        
        currentEmployee = employeesData[employeeIndex];
        
        saveEmployeesToStorage();
        generateEmployeeCards();
        showEmployeeModal(currentEmployee, false);
        showSuccessMessage('Employee updated successfully!');
    };

    // Add new employee
    window.addNewEmployee = function() {
        const newEmployee = {
            id: employeesData.length > 0 ? Math.max(...employeesData.map(e => e.id)) + 1 : 1,
            name: document.getElementById('newEmployeeName').value,
            img: uploadedImageDataURL || "../Images/default-avatar.jpg",
            role: document.getElementById('newEmployeeRole').value.split(',').map(r => r.trim()),
            status: document.getElementById('newEmployeeStatus').options[document.getElementById('newEmployeeStatus').selectedIndex].text,
            statusClass: document.getElementById('newEmployeeStatus').value === 'available' ? 'status-available' : 'status-busy',
            email: document.getElementById('newEmployeeEmail').value,
            phone: document.getElementById('newEmployeePhone').value,
            department: document.getElementById('newEmployeeDepartment').value,
            location: document.getElementById('newEmployeeLocation').value,
            skills: document.getElementById('newEmployeeSkills').value.split(',').map(s => s.trim()),
            bio: document.getElementById('newEmployeeBio').value,
            experience: parseInt(document.getElementById('newEmployeeExperience').value) || 0
        };

        employeesData.push(newEmployee);
        saveEmployeesToStorage();
        generateEmployeeCards();
        closeAddModal();
        showSuccessMessage('Employee added successfully!');
        // Reset uploaded image data URL after adding
        uploadedImageDataURL = null;
        // Reset image preview and file input
        const imagePreview = document.getElementById('newEmployeeImagePreview');
        const imageUploadInput = document.getElementById('newEmployeeImageUpload');
        if (imagePreview) imagePreview.src = "../Images/default-avatar.jpg";
        if (imageUploadInput) imageUploadInput.value = '';
    };

    // Initialize
    generateEmployeeCards();

    // Handle image upload preview
    const imageUploadInput = document.getElementById('newEmployeeImageUpload');
    const imagePreview = document.getElementById('newEmployeeImagePreview');

    if (imageUploadInput && imagePreview) {
        imageUploadInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadedImageDataURL = e.target.result;
                    imagePreview.src = uploadedImageDataURL;
                };
                reader.readAsDataURL(file);
            } else {
                uploadedImageDataURL = null;
                imagePreview.src = "../Images/default-avatar.jpg";
            }
        });
    }

    // Clear image preview and uploadedImageDataURL when opening add employee form
    const openAddEmployeeFormOriginal = window.openAddEmployeeForm;
    window.openAddEmployeeForm = function() {
        uploadedImageDataURL = null;
        if (imagePreview) imagePreview.src = "../Images/default-avatar.jpg";
        if (imageUploadInput) imageUploadInput.value = '';
        openAddEmployeeFormOriginal();
    };

    // Close modal handlers
    document.querySelector('.close')?.addEventListener('click', () => {
        document.getElementById('employeeModal').style.display = "none";
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('employeeModal')) {
            document.getElementById('employeeModal').style.display = "none";
        }
    });
});

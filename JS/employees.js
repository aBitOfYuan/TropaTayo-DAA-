document.addEventListener('DOMContentLoaded', function() {
    // Employee data array with years of experience
    const employees = [
        {
            id: 1,
            name: "Aiah Arceta",
            img: "../Images/aiah.jpg",
            role: ["Graphic Designer", "Visual Artist", "Content Creator"],
            status: "Available",
            statusClass: "status-available",
            email: "maria.santos@company.ph",
            phone: "0917 123 4567",
            department: "Creative",
            location: "Makati, Metro Manila",
            skills: ["Adobe Photoshop", "Illustrator", "Canva", "Figma", "Sketch"],
            bio: "Creative artist with a keen eye for detail. Experienced in creating promotional materials for both digital and print.",
            experience: 5
        },
        {
            id: 2,
            name: "Felip Jhon Suson",
            img: "../Images/nek.jpg",
            role: ["Full Stack Developer", "Software Engineer", "Web Developer"],
            status: "Busy",
            statusClass: "status-busy",
            email: "juan.delacruz@company.ph",
            phone: "0928 234 5678",
            department: "IT",
            location: "Quezon City",
            skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS"],
            bio: "Tech-savvy developer passionate about building scalable web applications. Loves working on start-up projects.",
            experience: 7
        },
        {
            id: 3,
            name: "Justin De Dios",
            img: "../Images/justin.jpg",
            role: "Backend Developer",
            status: "Available",
            statusClass: "status-available",
            email: "ana.villanueva@company.ph",
            phone: "0915 345 6789",
            department: "Human Resources",
            location: "Pasig City",
            skills: ["Node.js", "Express", "MongoDB"],
            bio: "HR advocate who values employee well-being and efficient onboarding. Promotes a positive work culture.",
            experience: 3
        },
        {
            id: 4,
            name: "Bongbong Marcos",
            img: "../Images/bbm.jpg",
            role:  "DevOps Engineer",
            status: "Available",
            statusClass: "status-available",
            email: "carlos.reyes@company.ph",
            phone: "0947 456 7890",
            department: "Development",
            location: "Cebu City",
            skills: ["Docker", "Kubernetes", "AWS"],
            bio: "Builds intuitive and reliable mobile apps. Believes in simple, functional user experiences.",
            experience: 8
        },
        {
            id: 5,
            name: "Sara Duterte",
            img: "../Images/sara-duterte.jpg",
            role:  "System Administrator",
            status: "Busy",
            statusClass: "status-busy",
            email: "liza.mendoza@company.ph",
            phone: "0933 567 8901",
            department: "Marketing",
            location: "Davao City",
            skills: ["Linux", "Networking", "Security"],
            bio: "Driven marketer who thrives on digital trends and content performance metrics. Loves optimizing social media campaigns.",
            experience: 6
        },
        {
            id: 6,
            name: "Nico Alvarado",
            img: "https://i.pravatar.cc/150?img=6",
            role: "QA Tester",
            status: "Available",
            statusClass: "status-available",
            email: "nico.alvarado@company.ph",
            phone: "0956 678 9012",
            department: "Quality Assurance",
            location: "Mandaluyong City",
            skills: ["TestRail", "Selenium", "Manual Testing"],
            bio: "Detail-oriented tester ensuring bugs don't reach production. Finds joy in breaking things and fixing them.",
            experience: 4
        },
        {
            id: 7,
            name: "Grace Lopez",
            img: "https://i.pravatar.cc/150?img=7",
            role: "UI/UX Designer",
            status: "Busy",
            statusClass: "status-busy",
            email: "grace.lopez@company.ph",
            phone: "0908 789 0123",
            department: "Design",
            location: "Baguio City",
            skills: ["Figma", "Wireframing", "User Testing"],
            bio: "Creates seamless designs rooted in real user feedback. Advocates for accessible design.",
            experience: 5
        },
        {
            id: 8,
            name: "Paolo Enriquez",
            img: "https://i.pravatar.cc/150?img=8",
            role: "Network Administrator",
            status: "Available",
            statusClass: "status-available",
            email: "paolo.enriquez@company.ph",
            phone: "0999 890 1234",
            department: "IT",
            location: "Taguig City",
            skills: ["Cisco", "Firewalls", "LAN/WAN"],
            bio: "Keeps networks stable and secure. Loves tinkering with routers and optimizing traffic flow.",
            experience: 9
        },
        {
            id: 9,
            name: "Janelle Cruz",
            img: "https://i.pravatar.cc/150?img=9",
            role: "Project Manager",
            status: "Busy",
            statusClass: "status-busy",
            email: "janelle.cruz@company.ph",
            phone: "0910 901 2345",
            department: "Operations",
            location: "Iloilo City",
            skills: ["Agile", "Scrum", "Risk Management"],
            bio: "Hands-on project lead who ensures deadlines are met and teams collaborate effectively.",
            experience: 10
        },
        {
            id: 10,
            name: "Miguel Ramos",
            img: "https://i.pravatar.cc/150?img=10",
            role: "DevOps Engineer",
            status: "Available",
            statusClass: "status-available",
            email: "miguel.ramos@company.ph",
            phone: "0921 012 3456",
            department: "Engineering",
            location: "Cavite",
            skills: ["Docker", "Kubernetes", "CI/CD"],
            bio: "Passionate about automation and system reliability. Ensures the pipeline runs like clockwork.",
            experience: 7
        },
        {
            id: 11,
            name: "Elaine Torres",
            img: "https://i.pravatar.cc/150?img=11",
            role: "Content Writer",
            status: "Available",
            statusClass: "status-available",
            email: "elaine.torres@company.ph",
            phone: "0932 123 4567",
            department: "Communications",
            location: "Batangas",
            skills: ["Copywriting", "Blogging", "SEO"],
            bio: "Crafts compelling stories that align with brand identity. Loves writing content that educates and engages.",
            experience: 4
        },
        {
            id: 12,
            name: "Rafael Dimaculangan",
            img: "https://i.pravatar.cc/150?img=12",
            role: "Systems Analyst",
            status: "Busy",
            statusClass: "status-busy",
            email: "rafael.dimaculangan@company.ph",
            phone: "0912 234 5678",
            department: "IT",
            location: "San Fernando, Pampanga",
            skills: ["UML", "Data Modeling", "SQL"],
            bio: "Bridges business needs and tech solutions. Enjoys turning problems into process improvements.",
            experience: 6
        },
        {
            id: 13,
            name: "Patricia Cruzado",
            img: "https://i.pravatar.cc/150?img=13",
            role: "Data Analyst",
            status: "Available",
            statusClass: "status-available",
            email: "patricia.cruzado@company.ph",
            phone: "0943 345 6789",
            department: "Analytics",
            location: "General Santos City",
            skills: ["Excel", "Power BI", "Python"],
            bio: "Passionate about uncovering insights from data. Enjoys working with visualization tools to make numbers talk.",
            experience: 5
        },
        {
            id: 14,
            name: "Leo Gutierrez",
            img: "https://i.pravatar.cc/150?img=14",
            role: "Customer Support Lead",
            status: "Available",
            statusClass: "status-available",
            email: "leo.gutierrez@company.ph",
            phone: "0906 456 7890",
            department: "Support",
            location: "Cagayan de Oro",
            skills: ["Zendesk", "CRM", "Conflict Resolution"],
            bio: "Ensures customer concerns are resolved with empathy and efficiency. Values the customer's voice.",
            experience: 8
        },
        {
            id: 15,
            name: "Tricia Magpantay",
            img: "https://i.pravatar.cc/150?img=15",
            role: "E-commerce Manager",
            status: "Busy",
            statusClass: "status-busy",
            email: "tricia.magpantay@company.ph",
            phone: "0914 567 8901",
            department: "Sales",
            location: "Zamboanga City",
            skills: ["Shopify", "Inventory Management", "Conversion Optimization"],
            bio: "E-commerce guru with a track record of increasing online sales. Focused on improving user shopping experience.",
            experience: 7
        },
        {
            id: 16,
            name: "Jerome Aquino",
            img: "https://i.pravatar.cc/150?img=16",
            role: "IT Support Specialist",
            status: "Available",
            statusClass: "status-available",
            email: "jerome.aquino@company.ph",
            phone: "0920 678 9012",
            department: "IT Support",
            location: "Antipolo",
            skills: ["Troubleshooting", "Hardware Repair", "Remote Desktop"],
            bio: "Friendly tech support go-to. Solves IT issues quickly and explains solutions in simple terms.",
            experience: 4
        },
        {
            id: 17,
            name: "Diana Francisco",
            img: "https://i.pravatar.cc/150?img=17",
            role: "Training Coordinator",
            status: "Busy",
            statusClass: "status-busy",
            email: "diana.francisco@company.ph",
            phone: "0931 789 0123",
            department: "L&D",
            location: "Laguna",
            skills: ["Learning Management Systems", "Facilitation", "Assessment"],
            bio: "Coordinates staff development programs and workshops. Believes in lifelong learning and continuous improvement.",
            experience: 6
        },
        {
            id: 18,
            name: "Aaron Salazar",
            img: "https://i.pravatar.cc/150?img=18",
            role: "Legal Officer",
            status: "Available",
            statusClass: "status-available",
            email: "aaron.salazar@company.ph",
            phone: "0909 890 1234",
            department: "Legal",
            location: "San Juan City",
            skills: ["Contract Review", "Corporate Law", "Compliance"],
            bio: "Ensures all company practices follow Philippine laws. Passionate about ethical business practices.",
            experience: 12
        },
        {
            id: 19,
            name: "Bea Pascual",
            img: "https://i.pravatar.cc/150?img=19",
            role: "Finance Analyst",
            status: "Busy",
            statusClass: "status-busy",
            email: "bea.pascual@company.ph",
            phone: "0916 901 2345",
            department: "Finance",
            location: "Muntinlupa City",
            skills: ["Financial Reporting", "Budgeting", "QuickBooks"],
            bio: "Keeps an eye on the bottom line. Works closely with departments to ensure sound budgeting and forecasting.",
            experience: 9
        },
        {
            id: 20,
            name: "Erwin Navarro",
            img: "https://i.pravatar.cc/150?img=20",
            role: "Social Media Manager",
            status: "Available",
            statusClass: "status-available",
            email: "erwin.navarro@company.ph",
            phone: "0948 012 3456",
            department: "Marketing",
            location: "Las Piñas City",
            skills: ["Content Creation", "Analytics", "Engagement Strategy"],
            bio: "Grows online presence and brand engagement. Loves turning likes into leads.",
            experience: 5
        }
    ];

    // Get the container where employee cards will be inserted
    const employeeGrid = document.getElementById('employeeGrid');

    // Function to generate employee cards
    function generateEmployeeCards() {
        employeeGrid.innerHTML = ''; // Clear existing content
        
        employees.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.setAttribute('data-id', employee.id);

            // Show only the first role in the card
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

        // Add event listeners to the view buttons
        document.querySelectorAll('.view-button').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.employee-card');
                const employeeId = parseInt(card.getAttribute('data-id'));
                const employee = employees.find(emp => emp.id === employeeId);
                
                if (employee) {
                    showEmployeeModal(employee);
                }
            });
        });
    }

    // Function to show employee details in modal
    function showEmployeeModal(employee) {
        const modal = document.getElementById('employeeModal');
        const modalDetails = document.getElementById('modalEmployeeDetails');

        // Show all roles as badges in the modal
        let rolesHTML = '';
        if (Array.isArray(employee.role)) {
            rolesHTML = employee.role.map(role => `<span class="role-badge">${role}</span>`).join(' ');
        } else {
            rolesHTML = `<span class="role-badge">${employee.role}</span>`;
        }

        // Generate skills badges
        const skillsHTML = employee.skills 
            ? employee.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')
            : '';

        modalDetails.innerHTML = `
            <div class="modal-header">
                <div class="modal-avatar-container">
                    <img src="${employee.img}" alt="${employee.name}" class="modal-avatar">
                    <span class="modal-status ${employee.statusClass}">${employee.status}</span>
                </div>
                <div class="modal-header-info">
                    <h2 class="modal-name">${employee.name}</h2>
                    <div class="modal-role">
                        ${rolesHTML}
                    </div>
                    <div class="modal-experience">
                        <span class="experience-badge">${employee.experience}+ years experience</span>
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
                ${skillsHTML ? `
                <div class="detail-group" style="grid-column: span 2;">
                    <h4>Skills</h4>
                    <div class="skills-list">
                        ${skillsHTML}
                    </div>
                </div>
                ` : ''}
                <div class="detail-group" style="grid-column: span 2;">
                    <h4>About</h4>
                    <p>${employee.bio}</p>
                </div>
            </div>
        `;
        
        modal.style.display = "block";
    }

    // Initialize the page
    generateEmployeeCards();

    // Modal close functionality
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('employeeModal').style.display = "none";
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('employeeModal')) {
            document.getElementById('employeeModal').style.display = "none";
        }
    });
});
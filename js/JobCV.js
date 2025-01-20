
const STOPWORDS = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as",
    "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "can't",
    "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
    "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he",
    "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
    "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's",
    "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
    "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll",
    "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs",
    "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've",
    "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while",
    "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
    "you've", "your", "yours", "yourself", "yourselves"
]);

function processText() {
    const jobDescriptionText = document.getElementById("jobDescriptionInput").value;
    const cvText = document.getElementById("cvInput").value;

    const jobDescriptionWordFrequency = getWordFrequency(jobDescriptionText);
    const cvWordFrequency = getWordFrequency(cvText);

    const combinedData = mergeFrequencies(jobDescriptionWordFrequency, cvWordFrequency);

    renderSingleTable(combinedData, "outputTable");
}

function getWordFrequency(text) {
    const words = text.split(/\s+/)
        .map(word => word.toLowerCase().replace(/[^\w]/g, ""))
        .filter(word => word && !STOPWORDS.has(word));
    
    const wordCounts = {};
    for (const word of words) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    return Object.entries(wordCounts).sort((a, b) => b[0].localeCompare(a[0])); // Sort alphabetically
}

function mergeFrequencies(jobDescFreq, cvFreq) {
    const allWords = new Set([
        ...jobDescFreq.map(([word]) => word),
        ...cvFreq.map(([word]) => word)
    ]);

    const combinedData = [];
    allWords.forEach(word => {
        const jobDescCount = jobDescFreq.find(([w]) => w === word)?.[1] || 0;
        const cvCount = cvFreq.find(([w]) => w === word)?.[1] || 0;
        combinedData.push([word, jobDescCount, cvCount]);
    });

    return combinedData.sort((a, b) => b[1] - a[1]); // Sort by Job Description word count in descending order
}

function renderSingleTable(data, outputId) {
    const outputDiv = document.getElementById(outputId);
    if (data.length === 0) {
        outputDiv.innerHTML = "<p>No data to display.</p>";
        return;
    }

    // Generate the table with conditional formatting for zero counts
    let tableHTML = `<table><thead>
        <tr><th>Word</th><th>Job Description Word Count</th><th>CV Word Count</th></tr>
        </thead><tbody>`;
    
    data.forEach(([word, jobDescCount, cvCount]) => {
        tableHTML += `<tr>
            <td>${word}</td>
            <td>${jobDescCount > 0 ? jobDescCount : "❌"}</td>
            <td>${cvCount > 0 ? cvCount : "❌"}</td>
        </tr>`;
    });

    tableHTML += "</tbody></table>";
    outputDiv.innerHTML = tableHTML;
}



const HARD_SKILLS = [
    // IT and Software Development
    "data analysis", "programming", "web development", "machine learning",
    "cloud computing", "database management", "cybersecurity", "software engineering",
    "devops", "ui/ux design", "api development", "blockchain development",

    // Marketing and Design
    "digital marketing", "seo", "graphic design", "video editing", "content creation",
    "social media management", "branding", "market research", "copywriting",
    "email marketing", "advertising strategy", "event planning",

    // Finance and Business
    "financial modeling", "accounting", "business strategy", "project management",
    "budgeting", "data visualization", "investment analysis", "risk management",
    "tax preparation", "supply chain analysis", "lean six sigma",

    // Engineering and Manufacturing
    "cad design", "mechanical engineering", "electrical engineering",
    "quality assurance", "product design", "manufacturing processes",
    "automation engineering", "civil engineering", "materials science",
    "structural analysis", "thermal engineering", "industrial design",

    // Healthcare
    "clinical research", "patient care", "medical coding", "pharmacology",
    "diagnostic imaging", "public health analysis", "surgical assistance",
    "occupational therapy", "mental health counseling",

    // Education and Research
    "curriculum development", "academic research", "educational technology",
    "assessment design", "scientific writing", "grant writing",
    // IT and Software Development
    "ethical hacking", "mobile app development", "game development", "data engineering", "system administration", "virtualization",

    // Marketing and Design
    "e-commerce management", "motion graphics", "user research", "marketing automation", "product photography",

    // Finance and Business
    "portfolio management", "forensic accounting", "credit analysis", "business analytics", "financial planning", "sales forecasting",

    // Engineering and Manufacturing
    "robotics engineering", "hydraulic systems design", "thermodynamics", "nanotechnology", "aerospace engineering", "environmental engineering",

    // Healthcare
    "telemedicine", "nursing informatics", "epidemiology", "biostatistics", "genetic counseling", "healthcare administration",

    // Education and Research
    "instructional design", "learning management systems", "educational psychology", "library science", "education policy analysis",

    // Miscellaneous
    "event coordination", "sound engineering", "fashion design", "interior design", "arbitration", "wildlife conservation", "horticulture",
    
    // Legal and Compliance
    "contract drafting", "compliance auditing", "intellectual property law",
    "litigation support", "regulatory analysis", "employment law",

    // Media and Communications
    "broadcast journalism", "public relations", "media production",
    "speech writing", "crisis communication", "media planning",

    // Art and Entertainment
    "acting", "scriptwriting", "music production", 
    "choreography", "costume design", "set design",

    // Environmental Science
    "climate modeling", "environmental impact assessment", 
    "renewable energy systems", "wildlife monitoring", "ecological research",

    // Architecture and Urban Planning
    "urban design", "landscape architecture", 
    "historic preservation", "building information modeling (BIM)",
    "zoning regulations",

    // Customer Service and Support
    "conflict resolution", "client relationship management",
    "helpdesk support", "service recovery", "customer experience design",

    // Sports and Fitness
    "personal training", "sports coaching", "physiotherapy",
    "sports psychology", "nutrition planning", "fitness programming",

        // Logistics and Supply Chain
        "inventory management", "freight forwarding", "procurement",
        "route optimization", "warehouse management", "customs clearance",
    
        // Agriculture and Farming
        "soil testing", "crop management", "irrigation systems",
        "precision farming", "livestock care", "pest control",
    
        // Space and Astronomy
        "astrophysics research", "satellite operations", "space mission planning",
        "planetary geology", "telescope instrumentation", "space weather analysis",
    
        // Renewable Energy
        "solar panel installation", "wind turbine maintenance", 
        "energy storage systems", "biofuel production", "energy auditing",
    
        // Food and Beverage
        "recipe development", "food safety compliance", "bartending",
        "menu engineering", "beverage production", "catering management",
    
        // Beauty and Wellness
        "cosmetology", "massage therapy", "spa management",
        "makeup artistry", "holistic health coaching", "esthetician services",
    
        // Transportation and Automotive
        "vehicle maintenance", "fleet management", "automotive design",
        "traffic flow analysis", "autonomous vehicle testing", "logistics coordination",
    
            // Security and Defense
    "risk assessment", "counterterrorism strategies", "cyber intelligence",
    "security systems installation", "emergency response planning", "forensic analysis",

    // Data Science and Analytics
    "big data processing", "natural language processing", "time series analysis",
    "predictive modeling", "data storytelling", "data pipeline development",

    // Tourism and Hospitality
    "travel planning", "tour guiding", "hotel management",
    "event hospitality coordination", "destination marketing", "guest services",

    // Fashion and Textile
    "pattern making", "textile design", "garment manufacturing",
    "trend forecasting", "fashion merchandising", "sustainable fashion practices",

    // Maritime and Naval
    "ship navigation", "marine engineering", "underwater welding",
    "coastal management", "oceanographic research", "maritime law",

    // Psychology and Counseling
    "clinical therapy", "child psychology", "behavioral analysis",
    "career counseling", "group therapy facilitation", "neuropsychological testing",

    // Construction and Real Estate
    "building inspection", "property valuation", "real estate sales",
    "land surveying", "construction project management", "green building design",

        // Veterinary and Animal Care
        "veterinary diagnostics", "animal training", "wildlife rehabilitation",
        "animal nutrition", "equine care", "zoo management",
    
        // Renewable Materials and Recycling
        "waste management", "plastic recycling", "e-waste processing",
        "compost production", "circular economy design", "renewable material engineering",
    
        // Biotechnology and Life Sciences
        "genetic engineering", "bioinformatics", "clinical trials management",
        "microbial research", "stem cell research", "pharmaceutical development",
    
        // Aerospace and Aviation
        "aircraft maintenance", "flight navigation", "aerodynamics research",
        "air traffic control", "aviation safety compliance", "spacecraft design",
    
        // Mining and Geology
        "mineral exploration", "geotechnical analysis", "mine safety management",
        "drilling operations", "rock mechanics", "resource estimation",
    
        // Energy and Power Systems
        "grid management", "power plant operation", "renewable energy integration",
        "smart grid design", "energy efficiency consulting", "nuclear power management",
    
        // Artificial Intelligence and Robotics
        "robotics programming", "computer vision", "autonomous systems",
        "AI ethics", "reinforcement learning", "intelligent automation",
    
        // Performing Arts and Entertainment
        "stage management", "lighting design", "sound design",
        "costume fabrication", "theatrical production", "set construction",
        // Software Engineering and Development
        "system architecture design", "microservices development", "test-driven development (TDD)",
        "code refactoring", "software performance optimization", "application lifecycle management",
        "REST API development", "CI/CD pipeline setup", "software scalability design",
    
        // Firmware Engineering
        "bare-metal programming", "real-time operating systems (RTOS)", "low-level driver development",
        "bootloader programming", "firmware debugging", "embedded Linux development",
        "memory optimization", "peripheral integration", "wireless protocol implementation",
    
        // Hardware Engineering
        "PCB design", "circuit simulation", "analog circuit design",
        "signal integrity analysis", "FPGA development", "ASIC design",
        "sensor interfacing", "hardware debugging", "power electronics design",
    
        // UI/UX Design
        "wireframing", "prototyping", "interaction design",
        "usability testing", "design systems development", "accessibility standards compliance",
        "responsive design", "motion design", "persona creation",
    
        // System Design and Architecture
        "distributed systems design", "fault tolerance design", "load balancing techniques",
        "data replication", "system integration testing", "event-driven architecture",
        "API gateway design", "message queue management", "database sharding",
    
        // Hardware-Software Integration
        "driver development", "hardware abstraction layer (HAL)", "serial communication protocols",
        "IoT device integration", "real-time data processing", "firmware-hardware testing",
        "custom hardware programming", "interfacing with sensors and actuators",
    
        // Frontend Development
        "component-based development", "state management libraries", "progressive web app development",
        "frontend performance optimization", "cross-browser compatibility", "frontend testing frameworks",
    
        // Backend Development
        "server-side rendering", "authentication and authorization", "backend caching strategies",
        "scalable database design", "queue-based processing", "API versioning",
    
        // Game Development
        "game physics programming", "shader programming", "game engine optimization",
        "character rigging", "level design", "artificial intelligence in games",
        // Programming Languages
        "python", "java", "c++", "c#", "javascript", "typescript", 
        "ruby", "php", "swift", "kotlin", "go", "rust", 
        "sql", "r", "matlab", "perl", "scala", "haskell", 
        "shell scripting", "dart", "visual basic", "lua", "assembly", "fortran",
        "cobol", "groovy", "sas", "julia", "vhdl", "verilog",
        "powershell", "elixir", "objective-c", "prolog", "f#", "clojure",
        // Programming Skills
        "object-oriented programming (OOP)", "functional programming", "data structures and algorithms",
        "multithreading and concurrency", "design patterns", "debugging and troubleshooting",
        "unit testing", "code version control (Git)", "API integration",
        "memory management", "asynchronous programming", "dynamic programming",
        "network programming", "scripting languages", "cross-platform development",
        "domain-specific languages (DSL)", "parallel computing", "compiler construction",
        "data serialization (JSON, XML)", "shell scripting", "error handling and exceptions",
        "meta-programming", "cryptography and security", "performance optimization",
        "framework and library usage", "real-time programming", "low-level programming",
            // Hardware Description and Programming Languages
    "vhdl", "verilog", "systemverilog", "hdl", "spice", 
    "assembly language", "embedded c", "microPython", "arduino c",
    "openCL", "cuda", "chisel", "bluespec", "c", 
    "bare-metal programming", "firmware scripting", "rtl (register transfer level)",
    "hardware abstraction language", "tcl (tool command language)",
    "systemc", "ams (analog/mixed-signal hdl)", "pearl",
    "matlab for hardware simulation", "quartus scripting", "vivado hls",

        // Firmware Development Languages
        "embedded c", "c++", "assembly language", "rust", 
        "microPython", "c", "ada", "forth", 
        "lua", "freeRTOS scripting", "openCL", "zephyr os scripting",
        "bare-metal programming", "python (for scripting and debugging)", 
        "verilog (for hardware interaction)", "vhdl (for hardware interaction)",
        "systemverilog (for hardware interaction)", "tcl (build scripts for EDA tools)",
        "shell scripting (for firmware builds)", "pascal (legacy systems)",
    
            // Software Platforms and Tools
    "visual studio", "intellij idea", "eclipse", "xcode", "netbeans",
    "android studio", "pycharm", "webstorm", "vscode", "rider",
    "matlab", "jupyter notebook", "docker", "jenkins", "kubernetes",
    "aws", "azure", "google cloud", "heroku", "salesforce",
    "postman", "swagger", "git", "github", "gitlab",
    "jira", "confluence", "tableau", "power bi", "splunk",

    // Hardware Platforms and Tools
    "arduino", "raspberry pi", "stm32", "esp32", "nvidia jetson",
    "altera quartus", "xilinx vivado", "keil uvision", "atmel studio",
    "cadence", "mentor graphics", "altium designer", "kicad", "eagle",
    "ltspice", "multisim", "pspice", "proteus", "ansys",
    "solidworks", "autodesk fusion 360", "hyperlynx", "schematic capture",

    // Firmware Platforms and Tools
    "freeRTOS", "zephyr os", "mbed os", "arduino ide", "platformio",
    "keil mdk", "iar embedded workbench", "openocd", "cmsis",
    "cubemx", "u-boot", "barebox", "segger j-link tools",
    "tiva c series tools", "ti code composer studio", "esp-idf",
    "microchip mplab", "avr studio", "debug probes (st-link, j-link)",
    "open-source firmware development tools", "hex editors",
    // Marketing and Design Platforms and Tools
    "adobe photoshop", "adobe illustrator", "adobe premiere pro", 
    "canva", "figma", "sketch", "coreldraw", "final cut pro",
    "google ads", "facebook ads manager", "hubspot", 
    "mailchimp", "hootsuite", "buffer", "semrush", "ahrefs",
    "google analytics", "sprout social", "moz", "adobe after effects",

    // Finance and Business Platforms and Tools
    "quickbooks", "xero", "sap", "oracle financials",
    "microsoft dynamics 365", "tableau", "power bi",
    "mint", "zoho books", "wave accounting",
    "excel", "google sheets", "trello", "asana",
    "jira", "monday.com", "netsuite", "workday",

    // Engineering and Manufacturing Platforms and Tools
    "autodesk autocad", "solidworks", "ansys",
    "autodesk inventor", "catia", "ptc creo",
    "nx siemens", "hypermesh", "simulink", 
    "matlab", "abaqus", "camworks", "fusion 360",
    "mastercam", "simscale", "comsol multiphysics",

    // Healthcare Platforms and Tools
    "epic systems", "cerner", "meditech",
    "allscripts", "athenahealth", "practice fusion",
    "drchrono", "nextgen healthcare", "eclinicalworks",
    "healthstream", "mckesson", "dicom viewers", 
    "telehealth platforms", "lab information systems (LIS)",

    // Education and Research Platforms and Tools
    "blackboard", "moodle", "google classroom",
    "canvas", "khan academy", "turnitin",
    "edmodo", "microsoft teams for education",
    "zoom", "webex", "nearpod", "quizlet",
    "researchgate", "mendeley", "zotero", "endnote",

    // Construction and Real Estate Platforms and Tools
    "autodesk revit", "sketchup", "bluebeam revu",
    "planGrid", "procore", "bentley systems",
    "buildertrend", "coConstruct", "stack",
    "arcGIS", "costX", "rhino 3D", "civil 3D",
    "trimble connect", "fieldwire", "vectormap",

    // Legal and Compliance Platforms and Tools
    "clio", "mycase", "lexisnexis",
    "westlaw", "relativity", "disco",
    "casetext", "litera", "documate",
    "contract express", "netdocuments",
    "smokeball", "simplifile", "docuSign",
    "logicaldoc", "icompli", "compliance tracker",

    // Art and Entertainment Platforms and Tools
    "procreate", "autodesk maya", "blender",
    "zbrush", "finale", "sibelius",
    "avid pro tools", "ableton live", "logic pro",
    "garageband", "unity 3D", "unreal engine",
    "3ds max", "krita", "clip studio paint",
    "davinci resolve", "toon boom harmony",

    // Customer Service and Support Platforms and Tools
    "zendesk", "freshdesk", "salesforce service cloud",
    "hubspot service hub", "kayako", "help scout",
    "livechat", "intercom", "olark",
    "tawk.to", "zoho desk", "teamSupport",
    "kustomer", "happyfox", "chatbots like drift",

    // Miscellaneous
    "technical writing", "foreign language proficiency", "legal research",
    "teaching", "logistics management", "culinary arts", "music composition",
    "drone piloting", "3d modeling", "animation", "game development"
];


const SOFT_SKILLS = [
    "communication", "problem-solving", "leadership", "time management",
    "teamwork", "adaptability", "emotional intelligence", "creativity",
    "critical thinking", "organization", "self-motivation", "work ethic",
    "conflict resolution", "collaboration", "negotiation skills",
    "decision-making", "public speaking", "resilience", "interpersonal skills",
    "active listening", "stress management", "empathy", "strategic thinking",
    "initiative", "mentorship", "persuasion", "cultural competence",
    "feedback delivery", "diplomacy", "storytelling", "innovation",
    "dependability", "accountability", "openness to feedback", "goal setting",
    "multitasking", "prioritization", "curiosity", "perspective-taking",
    "relationship building", "self-discipline", "influence",
    "customer focus", "change management", "active learning",
    "detail orientation", "positive attitude", "collaborative leadership",
    "decision prioritization", "networking", "constructive criticism",
    "cross-functional coordination", "mindfulness"
];


function processText() {
    const jobDescriptionText = document.getElementById("jobDescriptionInput").value.toLowerCase();
    const cvText = document.getElementById("cvInput").value.toLowerCase();

    const jobDescriptionWordFrequency = getWordFrequency(jobDescriptionText);
    const cvWordFrequency = getWordFrequency(cvText);

    const combinedData = mergeFrequencies(jobDescriptionWordFrequency, cvWordFrequency);

    renderSingleTable(combinedData, "outputTable");
    renderSkillComparison(HARD_SKILLS, cvText, jobDescriptionText, "hardSkillsTable");
    renderSkillComparison(SOFT_SKILLS, cvText, jobDescriptionText, "softSkillsTable");
}

function renderSkillComparison(skills, cvText, jobDescriptionText, outputId) {
    // Filter skills that are present in the Job Description
    const relevantSkills = skills.filter(skill => jobDescriptionText.includes(skill));

    // Map skills to determine their presence in Job Description and CV
    const tableData = relevantSkills.map(skill => {
        const inJobDescription = jobDescriptionText.includes(skill) ? "✔️" : "❌";
        const inCV = cvText.includes(skill) ? "✔️" : "❌";
        return { skill, inJobDescription, inCV };
    });

    const outputDiv = document.getElementById(outputId);
    if (tableData.length === 0) {
        outputDiv.innerHTML = "<p>No relevant skills found in the Job Description.</p>";
        return;
    }

    // Generate the table HTML
    let tableHTML = `<table><thead>
        <tr><th>Skill</th><th>In Job Description</th><th>In CV</th></tr>
        </thead><tbody>`;

    tableData.forEach(({ skill, inJobDescription, inCV }) => {
        tableHTML += `<tr>
            <td>${skill}</td>
            <td>${inJobDescription}</td>
            <td>${inCV}</td>
        </tr>`;
    });

    tableHTML += "</tbody></table>";
    outputDiv.innerHTML = tableHTML;
}

// The existing functions like getWordFrequency and mergeFrequencies remain unchanged

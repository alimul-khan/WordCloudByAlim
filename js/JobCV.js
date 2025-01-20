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
    "data analysis", "programming", "web development", "machine learning",
    "cloud computing", "seo", "database management", "graphic design",
    "technical writing", "financial modeling", "project management", 
    "cad design", "cybersecurity", "digital marketing", "video editing"
];

const SOFT_SKILLS = [
    "communication", "problem-solving", "leadership", "time management",
    "teamwork", "adaptability", "emotional intelligence", "creativity",
    "critical thinking", "organization", "self-motivation", "work ethic",
    "conflict resolution", "collaboration", "negotiation skills"
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

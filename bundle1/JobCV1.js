// List of common stopwords to filter out
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

/**
 * Processes the text input for both CV and Job Description
 */
function processText() {
    const cvText = document.getElementById("cvInput").value;
    const jobDescriptionText = document.getElementById("jobDescriptionInput").value;

    const cvWordFrequency = getWordFrequency(cvText);
    const jobDescriptionWordFrequency = getWordFrequency(jobDescriptionText);

    renderTable(cvWordFrequency, "cvOutput");
    renderTable(jobDescriptionWordFrequency, "jobDescriptionOutput");
}

/**
 * Computes the word frequency from the given text
 * @param {string} text - The input text
 * @returns {Array} - Sorted array of [word, count] pairs
 */
function getWordFrequency(text) {
    const words = text.split(/\s+/)
        .map(word => word.toLowerCase().replace(/[^\w]/g, ""))
        .filter(word => word && !STOPWORDS.has(word));
    
    const wordCounts = {};
    for (const word of words) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    return Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
}

/**
 * Renders a table of word frequencies into the specified output element
 * @param {Array} data - Array of [word, count] pairs
 * @param {string} outputId - The ID of the output element
 */
function renderTable(data, outputId) {
    const outputDiv = document.getElementById(outputId);
    if (data.length === 0) {
        outputDiv.innerHTML = "<p>No words found.</p>";
        return;
    }

    let tableHTML = "<table><thead><tr><th>Word</th><th>Frequency</th></tr></thead><tbody>";
    for (const [word, count] of data) {
        tableHTML += `<tr><td>${word}</td><td>${count}</td></tr>`;
    }
    tableHTML += "</tbody></table>";

    outputDiv.innerHTML = tableHTML;
}

from flask import Flask, render_template, request
from wordcloud import WordCloud, STOPWORDS
from collections import Counter
from io import BytesIO
import base64

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def word_frequency():
    # Initialize variables
    job_table, resume_table = None, None
    job_wordcloud, resume_wordcloud = None, None

    if request.method == "POST":
        # Get input from both textboxes
        job_text = request.form["job_text"]
        resume_text = request.form["resume_text"]

        # Stopwords set
        stopwords = set(STOPWORDS)

        # Process Job Requirements
        job_words = [word.lower() for word in job_text.split() if word.lower() not in stopwords]
        job_counts = Counter(job_words)
        job_table = sorted(job_counts.items(), key=lambda x: x[1], reverse=True)
        job_wordcloud = generate_wordcloud(job_counts)

        # Process Resume
        resume_words = [word.lower() for word in resume_text.split() if word.lower() not in stopwords]
        resume_counts = Counter(resume_words)
        resume_table = sorted(resume_counts.items(), key=lambda x: x[1], reverse=True)
        resume_wordcloud = generate_wordcloud(resume_counts)

    return render_template("word_frequency_advanced.html",
                           job_table=job_table,
                           resume_table=resume_table,
                           job_wordcloud=job_wordcloud,
                           resume_wordcloud=resume_wordcloud)

def generate_wordcloud(word_counts):
    """Generate a word cloud from word counts and return it as a base64-encoded string."""
    wordcloud = WordCloud(background_color="white", max_words=100, stopwords=STOPWORDS, width=800, height=400)
    wordcloud.generate_from_frequencies(word_counts)
    img = BytesIO()
    wordcloud.to_image().save(img, format="PNG")
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, render_template, request
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from collections import Counter

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def word_frequency():
    word_table = None
    wordcloud_image = None

    if request.method == "POST":
        text = request.form["text"]
        
        # Remove stopwords and split text into words
        stopwords = set(STOPWORDS)
        words = [word.lower() for word in text.split() if word.lower() not in stopwords]
        
        # Calculate word frequencies
        word_counts = Counter(words)
        word_table = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)

        # Generate word cloud
        wordcloud = WordCloud(background_color="white", max_words=100, stopwords=stopwords, width=800, height=400)
        wordcloud.generate_from_frequencies(word_counts)

        # Convert word cloud image to base64 for HTML rendering
        img = BytesIO()
        wordcloud.to_image().save(img, format="PNG")
        img.seek(0)
        wordcloud_image = base64.b64encode(img.getvalue()).decode()

    return render_template("word_frequency1.html", word_table=word_table, wordcloud_image=wordcloud_image)

if __name__ == "__main__":
    app.run(debug=True)

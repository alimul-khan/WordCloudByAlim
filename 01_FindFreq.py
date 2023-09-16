from collections import Counter
from wordcloud import STOPWORDS

def print_word_frequency(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as file:
        text = file.read()

    # Split the text into words
    words = text.split()

    # Remove stopwords
    words = [word for word in words if word.lower() not in STOPWORDS]

    # Count the frequency of each word
    word_counts = Counter(words)

    # Filter words that appear more than once
    repeated_words = [word for word, count in word_counts.items() if count > 1]

    # Sort the repeated words list in descending order of frequency
    repeated_words.sort(key=lambda word: word_counts[word], reverse=True)

    with open(output_file, "w", encoding="utf-8") as file:
        for word in repeated_words:
            frequency = word_counts[word]
            file.write(f"{word}: {frequency}\n")
            print(f"{word}: {frequency}")

# Provide the input file path and output file path
input_file = "Article.txt"
output_file = "WordFreq.txt"

# Call the function
print_word_frequency(input_file, output_file)

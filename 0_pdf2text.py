import pdfplumber

def convert_pdf_to_txt(pdf_path, txt_path):
    with pdfplumber.open(pdf_path) as pdf:
        with open(txt_path, "w", encoding="utf-8") as txt_file:
            for page in pdf.pages:
                text = page.extract_text()
                txt_file.write(text)

# Provide the input PDF file path and output TXT file path
# pdf_file = "IoT.pdf"
# txt_file = "Article.txt"

pdf_file = "Embedded.pdf"
txt_file = "Embedded.txt"

# Call the conversion function
convert_pdf_to_txt(pdf_file, txt_file)

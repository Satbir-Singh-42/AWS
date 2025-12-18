FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    nmap \
    nikto \
    wkhtmltopdf \
    ffuf \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install wapiti3

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p results logs scripts

EXPOSE 5000

ENV PORT=5000

CMD ["gunicorn", "--bind=0.0.0.0:5000", "--workers=2", "--timeout=120", "app:app"]

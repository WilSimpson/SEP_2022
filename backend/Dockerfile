FROM python:3

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install
RUN apt-get install -y \
    libpq-dev \
    python3-dev \
    dos2unix \
    && apt-get clean

COPY ./ ./
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt

# Fix for windows based CRLF file endings
RUN find . -type f -print0 | xargs -0 dos2unix && \
    apt-get remove --purge dos2unix -y && \
    rm -rf /var/lib/apt/lists/*
FROM python:3

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install
RUN apt-get install -y \
    libpq-dev \
    && apt-get clean

COPY ./ ./
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt
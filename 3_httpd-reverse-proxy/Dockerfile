FROM php:7.3-apache

# Overwrite script used in parent image to add IP management
COPY apache2-foreground /usr/local/bin/

COPY conf /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000* 001*
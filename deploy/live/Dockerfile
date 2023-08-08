## Pull the minimal Ubuntu image
#FROM ubuntu
#
## Install Nginx
#RUN apt-get -y update && apt-get -y install nginx
#
## Copy the Nginx config
#COPY default /etc/nginx/sites-available/default
#
## Expose the port for access
#EXPOSE 80/tcp
#
## Run the Nginx server
#CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

FROM php:7.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y apt-utils \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    unzip \
    curl \
    libcurl4-gnutls-dev \
    libxml2-dev \
    libssl-dev \
    libmcrypt-dev \
    libwebp-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) iconv mysqli pdo_mysql zip curl xml gd

# Install xdebug
RUN pecl install xdebug-3.0.4
RUN docker-php-ext-enable xdebug

# Configure xdebug
COPY xdebug.ini /usr/local/etc/php/conf.d/

# Add application
#WORKDIR /var/www/html
#COPY . /var/www/html
#RUN chown -R www-data:www-data /var/www/html

# Import database
#COPY kouider.sql /docker-entrypoint-initdb.d/

# Start script
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]


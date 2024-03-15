FROM php:8.2-apache

# Configuration
RUN echo 'memory_limit = 512M' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;
RUN echo 'upload_max_filesize = 40M' >> /usr/local/etc/php/conf.d/docker-php-uploads.ini;
RUN apt-get update && apt-get -qq -y install curl --no-install-recommends \
    libpq-dev \
    git \
    unzip \
    libzip-dev \
    zlib1g-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) zip pdo pdo_pgsql bcmath gd sockets
RUN pecl install grpc && docker-php-ext-enable grpc
RUN apt-get install -y autoconf pkg-config libssl-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/bin --filename=composer

RUN a2enmod rewrite
WORKDIR /var/www
COPY ./ /var/www
RUN rm -rf /var/www/html \
    && mv /var/www/public /var/www/html \
    && chmod -R 0777 /var/www/storage/
RUN composer install
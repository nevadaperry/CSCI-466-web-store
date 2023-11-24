FROM php:8.2-cli
EXPOSE 8080
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD [ "php", "-S", "0.0.0.0:8080", "router.php" ]

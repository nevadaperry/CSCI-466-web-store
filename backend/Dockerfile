FROM php:8.2-cli
EXPOSE 8080
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD [ "php", "-S", "localhost:8080", "router.php" ]
# docker run -it --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp -p 8080:8080 php:8.2-cli php -S 0.0.0.0:8080 router.php
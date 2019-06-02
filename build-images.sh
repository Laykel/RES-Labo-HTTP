echo ""
echo "********* Killing all running containers"
docker kill $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo ""
echo "********* Rebuilding images"
docker build -t res/apache-static --file ./1_httpd-php-static/Dockerfile ./1_httpd-php-static/
docker build -t res/express-dynamic --file ./2_express-dynamic/Dockerfile ./2_express-dynamic/
docker build -t res/httpd-rp --file ./3_httpd-reverse-proxy/Dockerfile ./3_httpd-reverse-proxy/

echo ""
echo "********* Launching containers"
docker run -d --name apache-static res/apache-static
docker run -d --name express-dynamic res/express-dynamic
docker run -d -p 2205:80 res/httpd-rp
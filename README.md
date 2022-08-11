instalacion: 
1- $npm i || npm install 

2-Creamos un archivo .env en el directorio raiz y ponemos lo siguiente
TOKEN_SECRET=cualquierclave

3- $npm run dev

4-Los endpoints estaran corriendo en el puerto 4000 :)

endpoints: 

-profile:
curl --request POST \
  --url http://localhost:4000/api/auth/signup \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "cameron",
	"email": "cameron@gmail.com",
	"password": "password"
}'

-signin
curl --request POST \
  --url http://localhost:4000/api/auth//signin \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "cameron@gmail.com",
	"password": "password"
}'

-singnup
curl --request POST \
  --url http://localhost:4000/api/auth/signup \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "cameron",
	"email": "cameron@gmail.com",
	"password": "password"
}'

## Node JS Webshop ##
### Webshop made by Märta, Cornelia and Kanistha with NodeJS, ExpressJS MongoDB and EJS ###
Vi har gjort en WebShop som säljer växter. 

## hur man laddar ner ##
1. clonea detta repo `$ git clone https://github.com/ballardinimarta/NodeJS-Webshop.git`
2. öppna en terminal i repot och kör `$ npm install` för att få tillgång till alla dependecies
3. skapa en <b>.env</b>-fil och lägg till 
    - DATABASE_URL= < connectionstring för mongodb >
    - PORT= < port för localhost >
    - SECRET_KEY= < jwt secretkey >
    - STRIPE_PUBLIC_KEY= < stripe public key >
    - STRIPE_SECRET_KEY= < stripe secret key >
    - EMAIL_SERVICE= < email service för reset >
    - EMAIL_PORT= < email port för reset >
    - RESET_EMAIL= < mailadress för reset >
    - RESET_PASSWORD=< lösenord för ovanstående mailadress >
4. kör `$ npm start`
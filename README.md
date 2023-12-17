# 335FinalProject

Members: Chris Giang (117937671), Ryan Zheng (117917512), Jordan Maggin (117796230)

Description: Our application mimics a club sign-up page and includes the functionality to filter current members by weight class. It uses Google OAuth to
allow the server to interact with the client's google account. Additionally, we use the Google Places API to find gyms near the user's requested location. 
When a user applies on the website, it stores the user's data in Mongo, to be queried later by the user. 

API Link:
we use Google OAuth as well as Google Places api
https://developers.google.com/maps/documentation/places/web-service/overview 



Youtube Video: https://www.youtube.com/watch?v=EJN88TRROX8

Database user info (Which is also in .env):
Username: user1
Password: TEpKplKG5rDE662U


to run, run npm i node start
if running locally, use http://localhost:3000/google/callback as the callback URL, else uncomment other URL if in prod

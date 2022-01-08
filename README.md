# divercity-coding-question

## Req1

For requeriment 1 I created an expressJS server and and a Postgres database which I hosted on Heroku.
I implemented an **auth** route with the following end points: 

* POST /api/auth/register <br>
![registration](/screenshots/register.JPG)

* POST /api/auth/login <br>
![login](/screenshots/login.JPG)

* GET /api/auth/logout <br>
![logout](/screenshots/logout.JPG)

Those endpoints will be used to authenticate users as shown above. After a user login in, a jwt is generated and returned. this token is used to authorize the user
to differents routes. It is sent as **auth** in the request headers.
Also, I build an User and Post models using sequelize which represents our data will be stored in our DB.




## Req2

For requeriment 2, I implemented the post functionality. 
I created a route **posts** with the following endpoints:

* GET /api/posts <br>
![get single post](/screenshots/singlePost.JPG)

* GET /api/posts/all <br>
![get all posts](/screenshots/allPost.JPG)

* POST /api/posts <br>
![make a post](/screenshots/makePost.JPG)

* PUT /api/posts <br>
![edit a post](/screenshots/editPost.JPG)

All posts have an attribute **createdAt**. I made use of a trird party package called moment
to calculate the time elapsed in convesional time when a post is fetched. 
to get a single post **post_id** needs to be passed in the query params

I added an attribute photo to our Post model which is an Array of **Blobs**. I modified the USER and POST model to estabelish a 1:M relationship between
those tables. ownerId is a foreign key which represents the id of the user who made the post.
Since there is no UI the API returns the metadata instead.
As shown above, I created a route to allow users to edit their post which requires them to be authenticated. created an auth middleware **authMiddleware**
to check whether a user is logged in before making a post, check if the jwt is valid and returns an error accordingly or redirects to the posts routes.

## Req3

I created the another for COMMENT and estabalished a 1:M relationship between USER and COMMENT, and 1:M relationship between POST and COMMENT.
Comments have the id of the user who commented and the id of the post and foreign key.
So, 
* a user/post can have multiple comments. 
* a post/comment can only belong to one user

I created a route **comments** with the following endpoints:

* GET /api/comments <br>
![get single comment](/screenshots/singleComment.JPG)

* GET /api/comments/all <br>
![get all comments](/screenshots/allComment.JPG)

* POST /api/comments <br>
![make a comment](/screenshots/makeComment.JPG)

* PUT /api/comments <br>
![edit a comment](/screenshots/editComment.JPG)

When returning all Comments/Posts from the API we can pass **pageNumber** and **offSet**, as query parameters, to paginate them.
to get a single comment **comment_id** needs to be passed in the query params

Lastly, I deployed my server on AWS EB using AWS codePipeline which is a continuous integration tool. then I configured the load balancer to allow inbound HTTP requests.

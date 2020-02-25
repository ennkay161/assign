<<<<<<< HEAD
=======
# Neeraj
>>>>>>> a69021563891f601a0b8ae7877d97c3f7c1ae9a3
1. First Route - /api/auth
			(this route includes user registration containing multiple params , POST onto server and stor in db)
				i) /api/auth/register 
						paramaters - 
							firstname, 
							lastname, 
							email, 
							password,(password should be encrypted) 
							token(JWT) auto generated
			(this route is Login Authenication having multiple params, and that particular user should be verify in database using token that is stored in first one path)							
				ii) /api/auth/login 
						paramters - 
							email, 
							password (should be verify by token stored in db)

2. Second Route - /api/products
			(this route POST the product description including id,name,description and reviews and stored the info in db)
						Parameters - 
							prod_id,
							prod_name,
							prod_desc,
							reviews,
							user_id (token)

3. Third Route - /api/reviews
			(this route get information of product from db by passing prod_id parameter in url)
					parameters -
<<<<<<< HEAD
							req.params.id (pass in url) and GET information of product
=======
							req.params.id (pass in url) and GET information of product
>>>>>>> a69021563891f601a0b8ae7877d97c3f7c1ae9a3

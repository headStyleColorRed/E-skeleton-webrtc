const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')

// Modules
const User = require("../mongoDB/userModel.js")
const ValidationManager = require("../tools/validation.js")


router.post("/log_user", async (req, res) => {
	let body = req.body
	let isError = false

	// Verify request data
	let validation = ValidationManager.validateLoginData(body)
	if (validation.isError) {
		res.status(200).send({ code: "400", status: validation.errorMessage })
		isError = true
	}
	if (isError) return; 

	// Decrypt and compare user
	let loginResult = await decriptUser(body)
	if (loginResult.isError) {
		res.status(200).send({ code: "400", status: loginResult.errorMessage })
		isError = true
	}
	if (isError) return; 

	res.status(200).send({ code: "200", status: "Login Succesfull" })
});


async function decriptUser(body) {

	const filter = { email: body.email };
	const update = { status: "logged in" };
	let validationResult = {
		isError: false,
		errorMessage: new String()
	}

	let promise = new Promise((resolve, reject) => {
		User.findOneAndUpdate(filter, update)
			.then(user => {

				// Check if user field exists
				if (!user) {
					validationResult.isError = true
					validationResult.errorMessage = "User doesn't exist"
					resolve(validationResult)
					return
				}

				// Compare the crypted passwords
				bcrypt.compare(body.password, user.password, (err, isMatch) => {
					if (err || !isMatch) {
						validationResult.isError = true
						validationResult.errorMessage = "Wrong Password"
						resolve(validationResult)
					}
					resolve(validationResult)
				})
			})
			.catch(err => {
				validationResult.isError = true
				validationResult.errorMessage = err
				reject(validationResult)
			})
	})

	let result = await promise;
	return (result)
}



module.exports = router;
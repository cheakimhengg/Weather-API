import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index", { weather: null, error: null });
});

dotenv.config();

app.get("/weather", async (req, res) => {
	const city = req.query.city;
	const apiKey = process.env.APIKEY;

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

	let weather;
	let error = null;
	try {
		const response = await axios.get(url);
		weather = response.data;
	} catch (error) {
		weather = null;
		error = "Error,Please try again";
	}
	res.render("index", { weather, error });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

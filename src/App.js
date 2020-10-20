import React from "react";
import { useState, useEffect } from "react";
import { getJobs } from "./component/apiFetch";
import SearchBar from "./component/searchBar";

import "./App.css";

function App() {
	const [type, setType] = useState("");
	const [location, setLocation] = useState("");
	const [fulltime, setFulltime] = useState(false);
	// const [jobs, setJobs] = useState([]);
	// const [loading, setloading] = useState();
	// const [error, seterror] = useState();

	useEffect(() => {
		const fetchJobs = async () => {
			const data = await getJobs(type, fulltime, location);
			console.log(data);
		};
		fetchJobs();
	}, [type, fulltime, location]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = await getJobs(type, fulltime, location);
		console.log(data);
	};
	return (
		<div>
			<SearchBar
				onSubmit={onSubmit}
				location={location}
				fulltime={fulltime}
				type={type}
				setType={setType}
				setLocation={setLocation}
				setFulltime={setFulltime}
			/>
		</div>
	);
}

export default App;

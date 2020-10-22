import React from "react";
import { useState, useEffect } from "react";
import { getJobs } from "./component/apiFetch";
import SearchBar from "./component/searchBar";
import JobsPagination from "./component/JobsPagination";

import "./App.css";

function App() {
	const allJobs = "";
	let [jobs, setJobs] = useState([]);
	let [page, setPage] = useState(1);
	const [type, setType] = useState("");
	const [location, setLocation] = useState("");
	const [fulltime, setFulltime] = useState(false);

	const [loading, setloading] = useState(true);
	const [error, seterror] = useState();

	useEffect(() => {
		setloading(true);
		const fetchJobs = async () => {
			await getJobs(allJobs, allJobs, allJobs, 1)
				.then((data) => {
					setJobs([...data]);
					setloading(false);
					return data;
				})
				.then((res) => {
					console.log(res);
					return res;
				})
				.catch((error) => console.log(error));
		};
		fetchJobs();
	}, [allJobs]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setJobs([]);
		setPage(1);
		await getJobs(type, fulltime, location, page)
			.then((data) => {
				setJobs([...data]);
				setloading(false);
				return data;
			})
			.then((res) => {
				console.log("here res", res);
				return res;
			})
			.catch((error) => console.log(error));
	};

	const LoadMore = async (e) => {
		e.preventDefault();
		console.log("Before LoadMore Jobs", jobs.length);
		setPage(++page);
		let data = await getJobs(type, fulltime, location, page);
		console.log("data length", data.length);

		setJobs((jobs) => [...jobs, ...data]);
		console.log("after LoadMore Jobs", jobs.length);
	};

	if (loading) return "it is loading";
	return (
		<>
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
			<JobsPagination page={page} setPage={setPage} LoadMore={LoadMore} />
		</>
	);
}

export default App;

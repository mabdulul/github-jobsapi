import React from "react";
import { useState, useEffect } from "react";
//import { getJobs } from "./component/apiFetch";
import SearchBar from "./component/searchBar";
import JobsPagination from "./component/JobsPagination";
import useFetchJobs from "./component/useFetchJobs";

import "./App.css";

function App() {
	let [page, setPage] = useState(1);
	const [type, setType] = useState("");
	const [location, setLocation] = useState("");
	const [fulltime, setFulltime] = useState(false);

	const { loading, error, jobs } = useFetchJobs(type, fulltime, location, page);

	const onSubmit = (e) => {
		setPage(1);
		e.preventDefault();
		console.log(jobs);
	};

	useEffect(() => {
		setType("");
		setLocation("");
		setFulltime("");
	}, []);

	const LoadMore = async (e) => {
		e.preventDefault();

		setPage(++page);
	};

	// if (loading) return "it is loading";

	console.log(jobs);
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
			{jobs.map((jo) => (
				<>
					<p>{jo.title}</p>;
				</>
			))}
		</>
	);
}

export default App;

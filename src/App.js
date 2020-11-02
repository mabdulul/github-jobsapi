import React from "react";
import { useState, useEffect } from "react";
import { getJobs } from "./component/apiFetch";
import useFetchJobs from "./component/useFetchJobs.js";
import SearchBar from "./component/searchBar";
import JobsPagination from "./component/JobsPagination";

import "./App.css";

function App() {
	let [page, setPage] = useState(1);
	const [type, setType] = useState("");
	const [location, setLocation] = useState("");
	const [fulltime, setFulltime] = useState(false);
	const [state, dispatch] = useFetchJobs();

	const [jobsLength, setjobsLength] = useState("");

	const fetchJobs = async (type, fulltime, location, page) => {
		await setPage(1);
		dispatch({ type: "FETCH_LOADING" });
		await getJobs(type, fulltime, location, 1)
			.then((response) => {
				dispatch({ type: `FETCH_SUCCESS`, payload: response });
			})
			.then((res) => {
				return res;
			})
			.catch((error) => dispatch({ type: "FETCH_ERROR" }));
	};

	useEffect(() => {
		//UseEffect only need to run once start
		fetchJobs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();

		await fetchJobs(type, fulltime, location, page);
	};

	const LoadMore = async (e) => {
		e.preventDefault();
		dispatch({ type: "FETCH_LOAD_MORE_LOADING" });
		setPage(++page);
		await getJobs(type, fulltime, location, page)
			.then((response) => {
				dispatch({ type: `FETCH_LOADMORE`, payload: response });
				setjobsLength(state.jobs.length);
			})
			.then((res) => {
				return res;
			})
			.catch((error) => dispatch({ type: "FETCH_ERROR" }));
	};

	let count = 1;

	return (
		<>
			<div>
				<SearchBar
					onSubmit={onSubmit}
					location={state.location}
					fulltime={fulltime}
					type={type}
					setType={setType}
					setLocation={setLocation}
					setFulltime={setFulltime}
				/>
				{state.loading && <h1>Loading...</h1>}
				{!!state.error}
				<>
					{state.jobs.length === 0 && state.loading === false ? (
						<p>No jobs found</p>
					) : (
						<>
							{state.jobs.map((jo) => (
								<>
									<p>
										{jo.title}:{count++}
									</p>
									;
								</>
							))}
						</>
					)}
				</>
			</div>
			<div>{state.loading && <h1>Loading...</h1>}</div>
			<div>
				{jobsLength === state.jobs.length ? (
					" "
				) : (
					<JobsPagination LoadMore={LoadMore} />
				)}
			</div>
		</>
	);
}

export default App;

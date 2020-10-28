import React from "react";
import { useState, useEffect, useReducer } from "react";
import { getJobs } from "./component/apiFetch";
import SearchBar from "./component/searchBar";
import JobsPagination from "./component/JobsPagination";

import "./App.css";

const initalState = {
	loading: true,
	jobs: [],
	error: " ",
};

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_CLEAR":
			return {
				loading: true,
				jobs: [],
				error: " ",
			};
		case "FETCH_LOADING":
			return {
				loading: true,
				jobs: [],
			};
		case "FETCH_SUCCESS":
			return {
				loading: false,
				jobs: action.payload,
				error: "",
			};
		case "FETCH_ERROR":
			return {
				loading: false,
				jobs: [],
				error: "Something went wrong",
			};
		case "FETCH_LOAD_MORE_LOADING":
			return {
				...state,
				loading: true,
			};
		case "FETCH_LOADMORE":
			return { jobs: [...state.jobs, ...action.payload] };
		default:
			return state;
	}
}

function App() {
	let [page, setPage] = useState(1);
	const [type, setType] = useState("");
	const [location, setLocation] = useState("");
	const [fulltime, setFulltime] = useState(false);
	const [state, dispatch] = useReducer(reducer, initalState);

	const fetchJobs = async () => {
		setPage(1);
		dispatch({ type: "FETCH_LOADING" });
		await getJobs()
			.then((response) => {
				dispatch({ type: `FETCH_SUCCESS`, payload: response });
			})
			.then((res) => {
				return res;
			})
			.catch((error) => dispatch({ type: "FETCH_ERROR" }));
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		fetchJobs();
	};

	const LoadMore = async (e) => {
		e.preventDefault();
		dispatch({ type: "FETCH_LOAD_MORE_LOADING" });
		setPage(++page);
		await getJobs(type, fulltime, location, page)
			.then((response) => {
				dispatch({ type: `FETCH_LOADMORE`, payload: response });
			})
			.then((res) => {
				return res;
			})
			.catch((error) => dispatch({ type: "FETCH_ERROR" }));
	};

	console.log(state.jobs.length);

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
				{state.error && <h1>Error. Try Refreshing.</h1>}
				<>
					{state.jobs.map((jo) => (
						<>
							<p>{jo.title}</p>;
						</>
					))}
				</>
			</div>
			<div>{state.loading && <h1>Loading...</h1>}</div>
			<div>
				<JobsPagination LoadMore={LoadMore} />
			</div>
		</>
	);
}

export default App;

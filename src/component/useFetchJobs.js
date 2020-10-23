import { useReducer, useEffect } from "react";
import axios from "axios";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_SUCCESS":
			return {
				loading: false,
				jobs: [...action.payload],
				error: "",
			};
		case "FETCH_ERROR":
			return {
				loading: false,
				jobs: [],
				error: "Something went wrong",
			};
		case "ACTIONS.LOAD_MORE":
			return { jobs: [...action.payload] };
		default:
			return state;
	}
}

export default function useFetchJobs(type, fulltime, location, page) {
	const [state, dispatch] = useReducer(reducer, {
		loading: true,
		error: "",
		jobs: [],
	});
	useEffect(() => {
		const cancelToken1 = axios.CancelToken.source();
		axios
			.get(
				`https://confident-khorana-8491e4.netlify.app/.netlify/functions/api/description=${type}&full_time=${fulltime}&location=${location}&page=${page}`,
				{
					cancelToken: cancelToken1.token,
				}
			)
			.then((response) => {
				console.log(response);
				dispatch({ type: `FETCH_SUCCESS`, payload: response.data });
			})
			.catch((e) => {
				if (axios.isCancel(e)) return dispatch({ type: "FETCH_ERROR" });
			});

		return () => {
			cancelToken1.cancel();
		};
	}, [type, fulltime, location, page]);

	return state;
}

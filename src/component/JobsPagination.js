import React from "react";

export default function JobsPagination({ page, setPage, LoadMore }) {
	return (
		<div>
			<button onClick={LoadMore}>Load More</button>
		</div>
	);
}

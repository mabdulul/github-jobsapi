import React from "react";

const SearchBar = ({
	onSubmit,
	location,
	fulltime,
	type,
	setType,
	setLocation,
	setFulltime,
}) => {
	return (
		<>
			<div>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						placeholder="Title, Key Word, Companies"
						name="type"
						value={type}
						onChange={(e) => setType(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Filter by Location"
						name="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
					<input
						type="checkbox"
						name="fulltime"
						value={fulltime}
						onChange={(e) => setFulltime(!!!fulltime)}
					/>
					Fulltime
					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
};

export default SearchBar;

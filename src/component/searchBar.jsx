import React from "react";

import "./css/search.css";
import Search from "./images/search_MandT.svg";

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
				<form onSubmit={onSubmit} className="SearchBar">
					<img className="search-icon" src={Search} alt="search" srcset="" />
					<input
						className="Search_Input"
						type="text"
						placeholder="Filter by title, companies, expertise…"
						name="type"
						value={type}
						onChange={(e) => setType(e.target.value)}
					/>
					<input
						className="Search_Input"
						type="text"
						placeholder="Filter by location…"
						name="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
					<label class="Search_container">
						<p>Fulltime Only</p>
						<input
							className="Search_Input"
							type="checkbox"
							name="fulltime"
							value={fulltime}
							onChange={(e) => setFulltime(!!!fulltime)}
						/>
						<span class="checkmark"></span>
					</label>

					<button type="submit">Search</button>
				</form>
			</div>
		</>
	);
};

export default SearchBar;

import React from "react";

import "./css/search.css";
import Search from "./images/icons/search_MandT.svg";
import LocationIcon from "./images/icons/location.svg";

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
					<label>
						<img className="search-icons" src={Search} alt="search" srcset="" />
						<input
							className="search_Input"
							type="text"
							placeholder="Filter by title, companies, expertise…"
							name="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
						/>
					</label>
					<label>
						<img
							className="search-icons"
							src={LocationIcon}
							alt="LocationIcon"
							srcset=""
						/>
						<input
							className="Search_Input"
							type="text"
							placeholder="Filter by location…"
							name="location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</label>
					<label className="Search_container">
						<span className="Search_FullTime">Fulltime</span>
						<input
							className="Search_Input"
							type="checkbox"
							name="fulltime"
							value={fulltime}
							onChange={(e) => setFulltime(!!!fulltime)}
						/>

						<span className="checkmark"></span>
					</label>

					<button className="btn btn-search" type="submit">
						Search
					</button>
				</form>
			</div>
		</>
	);
};

export default SearchBar;

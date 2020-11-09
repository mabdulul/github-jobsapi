import React from "react";
import { useState } from "react";
import "./css/search.css";
import Search from "./images/icons/search_MandT.svg";
import LocationIcon from "./images/icons/location.svg";

import drilldown from "./images/icons/drilldown.svg";
import searchWhite from "./images/icons/white_search.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const SearchBar = ({
	onSubmit,
	location,
	fulltime,
	type,
	setType,
	setLocation,
	setFulltime,
}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<div className="SearchBar-wrapper">
				<form onSubmit={onSubmit} className="SearchBar">
					<div className="mobile-search-holder">
						<img
							className="search-icons only-display-on-tablet-and-Desktop"
							src={Search}
							alt="search"
							srcset=""
						/>
						<div className="search_Input-holder">
							<input
								className="search_Input"
								type="text"
								placeholder="Filter by title..."
								name="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
							/>
						</div>
						<div className="search_drilldown-holder search-holder">
							<Button className="btn-modal" onClick={handleShow}>
								<img src={drilldown} alt="drilldown" srcset="" />
							</Button>
						</div>
						<div className="search-holder search-holder-white">
							<button className="btn btn-search" type="submit">
								<img
									className="search-icons"
									src={searchWhite}
									alt="search"
									srcset=""
								/>
							</button>
						</div>
					</div>

					<Modal show={show} onHide={handleClose}>
						<div>
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
						</div>
					</Modal>
				</form>
			</div>
		</>
	);
};

export default SearchBar;

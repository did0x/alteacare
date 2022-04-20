import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

class Loader extends React.Component {
	render() {
		const { loader } = this.props;
		return (
			<div className={`overlay ${loader ? "active" : ""}`}>
				{loader ? <img src={require("./puff.svg").default} alt="" className="img" /> : ""}
			</div>
		);
	}
}

Loader.defaultProps = {
	loader: false
};

Loader.propTypes = {
	loader: PropTypes.bool
};
export default Loader;

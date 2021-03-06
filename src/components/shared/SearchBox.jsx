import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = (props) => {
  const onChangeSearchText = (e) => {
    const text = e.target.value.trim();
    props.changeSearchTextHandler(text);
  };

  return (
    <div>
      <input
        placeholder={props.placeholder}
        className="form-control form-control-sm"
        type="text"
        onChange={onChangeSearchText}
      />
    </div>
  );
};

SearchBox.propTypes = {
  changeSearchTextHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBox.defaultProps = {
  placeholder: 'Please enter something...',
};

export default SearchBox;

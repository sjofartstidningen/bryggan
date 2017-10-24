import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YearComp from './Year';

function YearView({ years, translateTitle }) {
  return (
    <div>
      {years.length > 0 &&
        years.map(year => (
          <YearComp
            key={year.id}
            year={year.name}
            translateTitle={translateTitle}
          />
        ))}
    </div>
  );
}

YearView.propTypes = {
  years: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string,
    }),
  ).isRequired,
  translateTitle: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  years: state.tidningen.years,
});

export default connect(mapStateToProps)(YearView);

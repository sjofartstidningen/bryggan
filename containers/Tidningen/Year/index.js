import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YearComp from './Year';
import MainTitle from '../components/MainTitle';

class YearView extends Component {
  static propTypes = {
    years: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        path: PropTypes.string,
      }),
    ).isRequired,
  };

  state = { translateTitle: 0 };

  getTitleWidth = ref => {
    if (ref) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ translateTitle: width }));
    }
  };

  render() {
    const { years } = this.props;
    const { translateTitle } = this.state;

    return (
      <div>
        <MainTitle key="title">
          <span ref={this.getTitleWidth}>Tidningen</span>
        </MainTitle>

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
}

const mapStateToProps = state => ({
  years: state.tidningen.years,
});

export default connect(mapStateToProps)(YearView);

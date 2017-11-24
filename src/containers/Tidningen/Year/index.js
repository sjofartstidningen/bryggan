import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getYears } from '../../../store/tidningen/actions';
import YearComp from './Year';
import Title from '../../../components/Typography/Title';

class Year extends Component {
  state = {
    translateTitle: 0,
  };

  componentDidMount() {
    this.props.getYears();
  }

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
        <Title to="/tidningen">
          <span ref={this.getTitleWidth}>Tidningen</span>
        </Title>

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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getYears }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Year);

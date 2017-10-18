// @flow
import React from 'react';
import { connect } from 'react-redux';
import YearComp from './Year';
import type { Year } from '../../../store/tidningen/types';

type Props = {
  years: Year[],
  translateTitle: number,
};

function YearView(props: Props) {
  const { years, translateTitle } = props;
  return (
    <div className="years">
      {years.length > 0 &&
        years.map(year => (
          <YearComp year={year.name} translateTitle={translateTitle} />
        ))}
    </div>
  );
}

const mapStateToProps = state => ({
  years: state.tidningen.years,
  issues: state.tidningen.issues,
});

// $FlowFixMe
export default connect(mapStateToProps)(YearView);

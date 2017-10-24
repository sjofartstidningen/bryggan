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

const mapStateToProps = state => ({
  years: state.tidningen.years,
});

// $FlowFixMe
export default connect(mapStateToProps)(YearView);

// @flow
import React, { Component, Fragment } from 'react';
import { Subscribe } from 'unstated';
import { Route } from 'react-router-dom';
import { join } from 'path';
import type { Location, Match } from 'react-router-dom';
import type { Route as RouteType } from '../../types';
import MagazineContainer from '../../states/MagazineContainer';
import { sortByName } from '../../utils';
import ProgressBar from '../../atoms/ProgressBar';
import Breadcrumbs from '../../molecules/Breadcrumbs';
import IssueList from './IssueList';

type WithSubroutes = {
  routes?: Array<RouteType>,
};

type Routes = Array<RouteType & WithSubroutes>;

type Props = {
  location: Location,
  match: Match,
  fetchAllYears: () => Promise<void>,
};

type State = {
  state: 'loading' | 'loaded',
  breadcrumbs: Routes,
};

class Tidningen extends Component<Props, State> {
  state = {
    state: 'loading',
    breadcrumbs: [
      { path: '/:root', title: 'Tidningen' },
      { path: '/:root/:year', title: ({ year }: Object) => year },
      { path: '/:root/:year/:issue', title: ({ issue }: Object) => issue },
    ],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.fetchAllYears();
    this.setState(() => ({ state: 'loaded' }));
  };

  render() {
    const { location, match } = this.props;
    const { state, breadcrumbs } = this.state;

    return (
      <Subscribe to={[MagazineContainer]}>
        {magazine => (
          <Fragment>
            <Breadcrumbs location={location} routes={breadcrumbs} />

            {state === 'loading' && <ProgressBar delay={1000} />}

            {state === 'loaded' && (
              <Fragment>
                <Route
                  path={match.url}
                  exact
                  render={() =>
                    magazine.state.years
                      .sort((a, b) => -sortByName(a, b))
                      .map(year => (
                        <Fragment key={year.id}>
                          <h1>{year.name}</h1>
                          <IssueList
                            baseUrl={match.url}
                            expectedLength={11}
                            issues={magazine.getIssuesForYear({
                              year: year.name,
                            })}
                            fetchIssues={() =>
                              magazine.fetchIssuesByYear({ year: year.name })
                            }
                          />
                        </Fragment>
                      ))
                  }
                />

                <Route
                  path={join(match.url, ':year')}
                  exact
                  render={({ match: { params } }) => (
                    <IssueList
                      baseUrl={match.url}
                      expectedLength={11}
                      issues={magazine.getIssuesForYear({
                        year: params.year || '',
                      })}
                      fetchIssues={() =>
                        magazine.fetchIssuesByYear({ year: params.year || '' })
                      }
                    />
                  )}
                />

                <Route
                  path={join(match.url, ':year', ':issue')}
                  exact
                  render={({ match: { params } }) => (
                    <IssueList
                      baseUrl={match.url}
                      push
                      expectedLength={62}
                      issues={magazine.getPagesForIssue({
                        year: params.year || '',
                        issue: params.issue || '',
                      })}
                      fetchIssues={() =>
                        magazine.fetchPagesByIssue({
                          year: params.year || '',
                          issue: params.issue || '',
                        })
                      }
                    />
                  )}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </Subscribe>
    );
  }
}

function Wrapped({ location, match }: { location: Location, match: Match }) {
  return (
    <Subscribe to={[MagazineContainer]}>
      {magazine => (
        <Tidningen
          location={location}
          match={match}
          fetchAllYears={magazine.fetchAllYears}
        />
      )}
    </Subscribe>
  );
}

export { Wrapped as default };

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
import PagePreview from './PagePreview';
import OnMount from '../../components/OnMount';
import { MainContentWrapper } from '../../molecules/Grid';
import { Heading1 } from '../../atoms/Text';
import ErrorMessage from '../../atoms/ErrorMessage';

type WithSubroutes = {
  routes?: Array<RouteType>,
};

type Routes = Array<RouteType & WithSubroutes>;

type Props = {
  location: Location,
  match: Match,
};

type State = {
  state: 'loading' | 'loaded' | 'error',
  breadcrumbs: Routes,
};

class Tidningen extends Component<Props, State> {
  state = {
    state: 'loading',
    breadcrumbs: [
      { path: '/:root', title: 'Tidningen' },
      { path: '/:root/:year', title: ({ year }: Object) => year },
      { path: '/:root/:year/:issue', title: ({ issue }: Object) => issue },
      { path: '/:root/:year/:issue/:page', title: ({ page }: Object) => page },
    ],
  };

  componentDidCatch() {
    this.setState(() => ({ state: 'error' }));
  }

  render() {
    const { location, match } = this.props;
    const { state, breadcrumbs } = this.state;

    return (
      <Subscribe to={[MagazineContainer]}>
        {magazine => (
          <MainContentWrapper>
            <OnMount
              onMount={async () => {
                await magazine.fetchYears();
                this.setState(() => ({ state: 'loaded' }));
              }}
            />

            <Breadcrumbs location={location} routes={breadcrumbs} />

            {state === 'loading' && <ProgressBar delay={1000} />}

            {(state === 'error' || magazine.state.error) && (
              <ErrorMessage
                message={`Det gick inte att hämta data för ${
                  location.pathname
                }`}
              />
            )}

            {state === 'loaded' &&
              !magazine.state.error && (
                <Fragment>
                  <Route
                    path={match.url}
                    exact
                    render={() =>
                      magazine.state.years
                        .sort((a, b) => -sortByName(a, b))
                        .map(year => (
                          <Fragment key={year.id}>
                            <Heading1>{year.name}</Heading1>
                            <IssueList
                              baseUrl={match.url}
                              expectedLength={11}
                              issues={magazine.getIssues({ year: year.name })}
                              fetchIssues={() =>
                                magazine.fetchIssues({ year: year.name })
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
                        issues={magazine.getIssues({
                          year: params.year || '',
                        })}
                        fetchIssues={() =>
                          magazine.fetchIssues({ year: params.year || '' })
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
                        issues={magazine.getPages({
                          year: params.year || '',
                          issue: params.issue || '',
                        })}
                        fetchIssues={() =>
                          magazine.fetchPages({
                            year: params.year || '',
                            issue: params.issue || '',
                          })
                        }
                      />
                    )}
                  />

                  <Route
                    path={join(match.url, ':year', ':issue', ':page')}
                    exact
                    render={({ history, match: { params } }) => {
                      const pages = magazine
                        .getPages({
                          year: params.year || '',
                          issue: params.issue || '',
                        })
                        .map(p => (p.src ? { name: p.name, src: p.src } : null))
                        .filter(Boolean);

                      return (
                        <PagePreview
                          fetchPages={() =>
                            magazine.fetchPages({
                              year: params.year || '',
                              issue: params.issue || '',
                            })
                          }
                          pages={pages}
                          total={pages.length}
                          current={params.page || ''}
                          history={history}
                        />
                      );
                    }}
                  />
                </Fragment>
              )}
          </MainContentWrapper>
        )}
      </Subscribe>
    );
  }
}

export { Tidningen as default };

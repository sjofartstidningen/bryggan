import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { join } from 'path';
import { sortByName } from '../../utils';
import Breadcrumbs from '../../molecules/Breadcrumbs';
import PagePreview from './PagePreview';
import { MainContentWrapper } from '../../molecules/Grid';
import { Heading1 } from '../../atoms/Text';
import FolderView from '../../molecules/FolderView';
import { FilesListFolder } from '../../components/Fetch/dropbox';

class Tidningen extends Component<Props, State> {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    breadcrumbs: [
      { path: '/:root', title: 'Tidningen' },
      { path: '/:root/:year', title: ({ year }) => year },
      { path: '/:root/:year/:issue', title: ({ issue }) => issue },
      { path: '/:root/:year/:issue/:page', title: ({ page }) => page },
    ],
  };

  render() {
    const { location, match } = this.props;
    const { breadcrumbs } = this.state;

    return (
      <MainContentWrapper>
        <Breadcrumbs location={location} routes={breadcrumbs} />

        <Route
          path={match.url}
          exact
          render={() => (
            <FilesListFolder path="/">
              {({ response }) =>
                response &&
                response
                  .sort((a, b) => -sortByName(a, b))
                  .map(year => (
                    <Fragment key={year.id}>
                      <Heading1>{year.name}</Heading1>
                      <FolderView
                        path={year.name}
                        baseUrl={match.url}
                        expectedLength={11}
                      />
                    </Fragment>
                  ))
              }
            </FilesListFolder>
          )}
        />

        <Route
          path={join(match.url, ':year')}
          exact
          render={({ match: { params } }) =>
            params.year && (
              <FolderView
                path={params.year}
                baseUrl={match.url}
                expectedLength={11}
              />
            )
          }
        />

        <Route
          path={join(match.url, ':year', ':issue')}
          exact
          render={({ match: { params } }) =>
            params.year &&
            params.issue && (
              <FolderView
                path={join(params.year, params.issue)}
                baseUrl={match.url}
                expectedLength={68}
                issue
              />
            )
          }
        />

        <Route
          path={join(match.url, ':year', ':issue', ':page')}
          exact
          render={({ history, match: { params } }) =>
            params.year &&
            params.issue && (
              <FilesListFolder path={join(params.year, params.issue)}>
                {({ response }) =>
                  response && (
                    <PagePreview
                      pages={response}
                      total={response.length}
                      current={params.page || ''}
                      history={history}
                    />
                  )
                }
              </FilesListFolder>
            )
          }
        />
      </MainContentWrapper>
    );
  }
}

export { Tidningen as default };

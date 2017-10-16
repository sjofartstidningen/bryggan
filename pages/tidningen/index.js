// @flow
import React, { Component } from 'react';
import { filesListFolder } from '../../utils/api/dropbox';
import Layout from '../../components/Layout';
import Folder from '../../components/Dropbox/Folder';
import Thumbnail from '../../components/Dropbox/Thumbnail';

type Entries = Array<FileMetaData | FolderMetaData>;

type Props = {
  entries?: Entries,
  error?: ?{
    message: string,
    status?: number,
  },
};

export default class Tidningen extends Component<Props, *> {
  static async getInitialProps() {
    if (!process.env.DROPBOX_ACCESS_TOKEN) return {};

    try {
      const { data } = await filesListFolder({ path: '/Bryggan' });
      return { entries: data.entries };
    } catch (e) {
      if (e.response) {
        const { response } = e;
        return { error: { message: response.data, status: response.status } };
      }

      return { error: { message: e.message } };
    }
  }

  static defaultProps = {
    entries: [],
    error: null,
  };

  render() {
    const { entries: years, error } = this.props;
    return (
      <Layout title="Tidningen – Bryggan" activeLink="/tidningen">
        <h1>Tidningen</h1>
        <div className="error">{error && error.message}</div>
        <div className="years">
          {years &&
            years.map((year, i) => (
              <section key={year.id}>
                <h2>{year.name}</h2>
                {i === 0 && (
                  <Folder
                    path={year.path_lower}
                    loading={() => 'loading entries'}
                    render={({ entries }) =>
                      entries.map(entry => {
                        const previewUrl = `${entry.path_lower}/${year.name}-${entry.name}-001.jpg`;
                        return (
                          <Thumbnail
                            path={previewUrl}
                            size="w640h480"
                            render={({ src }) => <img src={src} alt="" />}
                          />
                        );
                      })}
                  />
                )}
              </section>
            ))}
        </div>
      </Layout>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { filesListFolder } from '../../utils/api/dropbox';
import Layout from '../../components/Layout';
import DropboxPreview from '../../components/DropboxPreview';

type Entry = {
  '.tag': 'folder' | 'file',
  name: string,
  path_lower: string,
  path_display: string,
  id: string,
};

type Props = {
  entries?: Array<Entry>,
  error?: {
    message: string,
    status?: number,
  },
};

export default class Tidningen extends Component<Props, *> {
  state = {
    issues: {},
  };

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

  componentDidMount() {
    const [lastYear] = this.props.entries || [];
    if (lastYear) this.getIssues(lastYear);
  }

  getIssues = async (entry: Entry) => {
    if (!process.env.DROPBOX_ACCESS_TOKEN) return {};
    const { path_lower, name } = entry;
    const { issues } = this.state;

    try {
      const { data } = await filesListFolder({ path: path_lower });
      const updatedIssues = {
        ...issues,
        [name]: data.entries,
      };

      this.setState(() => ({ issues: updatedIssues }));
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { entries, error } = this.props;
    return (
      <Layout title="Tidningen – Bryggan" activeLink="/tidningen">
        <h1>Tidningen</h1>
        <div className="error">{error && error.message}</div>
        <div className="years">
          {entries &&
            entries.map(entry => {
              const issues = this.state.issues[entry.name];

              return (
                <section key={entry.id}>
                  <h2>{entry.name}</h2>
                  {issues && (
                    <ul>
                      {issues.map(issue => (
                        <li key={issue.id}>
                          {issue.name}
                          <DropboxPreview
                            path={`${issue.path_lower}/${entry.name}-${issue.name}-001.jpg`}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
        </div>
      </Layout>
    );
  }
}

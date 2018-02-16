// @flow
import React, { PureComponent } from 'react';
import type { Match } from 'react-router-dom';
import dropbox from '../../api/dropbox';
import { compareByDesc } from '../../utils';

type Props = {
  match: Match,
};

type State = {
  years: Array<{
    id: string,
    name: string,
    url: string,
    cover: string,
  }>,
};

class MagazineYears extends PureComponent<Props, State> {
  ref: HTMLDivElement;

  state = {
    years: [],
  };

  componentDidMount() {
    this.fetchYears();
  }

  fetchYears = async () => {
    const { match } = this.props;
    const { data } = await dropbox.filesListFolder({ folder: '/' });

    const { width } = this.ref.getBoundingClientRect();
    const thumbnailSize = dropbox.getThumbnailSize(width / 4);

    const years = data.entries.reduce((acc, entry) => {
      switch (entry['.tag']) {
        case 'folder':
          return [
            ...acc,
            {
              id: entry.id,
              name: entry.name,
              url: `${match.url}/${entry.name}`,
              cover: dropbox.getThumbUrl({
                file: `${entry.name}/01/${entry.name}-01-001.pdf`,
                size: thumbnailSize,
              }),
            },
          ];
        default:
          return acc;
      }
    }, []);

    this.setState(() => ({ years: years.sort(compareByDesc('name')) }));
  };

  setRef = (ref: ?HTMLDivElement) => {
    if (ref) this.ref = ref;
  };

  render() {
    return (
      <div ref={this.setRef}>
        {this.state.years.map(year => (
          <p key={year.id}>
            <img src={year.cover} alt="" />
            {year.name}
          </p>
        ))}
      </div>
    );
  }
}

export default MagazineYears;

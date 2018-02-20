// @flow
import React, { PureComponent } from 'react';
import type { Match } from 'react-router-dom';
import dropbox from '../../api/dropbox';
import { compareBy, compareByDesc } from '../../utils';
import InitialLoadingScreen from '../../components/InitialLoadingScreen';
import MagazineCoverView from './MagazineCoverView';
import type { MagazineEntry } from '../../types';

type Props = {
  folder: string,
  match: Match,
  pages?: boolean,
};

type State = {
  fetching: boolean,
  entries: Array<MagazineEntry>,
};

class MagazineList extends PureComponent<Props, State> {
  ref: ?HTMLDivElement;

  state = {
    fetching: true,
    entries: [],
  };

  componentDidMount() {
    this.fetchYears();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.folder !== prevProps.folder) this.fetchYears();
  }

  getName = (name: string): string => {
    if (!name.endsWith('.pdf')) return name;
    const re = /(\d{4})-(\d{2})-(\d{2,3})\.pdf/g;
    const [, , , page] = re.exec(name);
    return page;
  };

  fetchYears = async () => {
    const { folder, match, pages } = this.props;
    this.setState(() => ({ fetching: true }));

    const { data } = await dropbox.filesListFolder({
      folder,
    });

    const { width } = this.ref
      ? this.ref.getBoundingClientRect()
      : { width: window.innerWidth };

    const thumbnailSize = dropbox.getThumbnailSize(width / 4);

    const entries = data.entries.reduce((acc, entry) => {
      const name = this.getName(entry.name);
      return [
        ...acc,
        {
          id: entry.id,
          name,
          url: `${match.url}/${name}`,
          cover: dropbox.getCoverUrlFromPath(
            `${match.url}/${name}`,
            thumbnailSize,
          ),
          caption: name,
        },
      ];
    }, []);

    this.setState(() => ({
      entries: entries
        .sort(pages ? compareBy('name') : compareByDesc('name'))
        .slice(0, pages ? -1 : Infinity),
      fetching: false,
    }));
  };

  setRef = (ref: ?HTMLDivElement) => {
    if (ref) this.ref = ref;
  };

  render() {
    const { pages } = this.props;
    const { fetching, entries } = this.state;

    return (
      <div ref={this.setRef}>
        {fetching ? (
          <InitialLoadingScreen />
        ) : (
          <MagazineCoverView covers={entries} pages={pages} />
        )}
      </div>
    );
  }
}

export default MagazineList;

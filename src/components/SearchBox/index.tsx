import '@reach/combobox/styles.css';
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { Link, useHistory } from 'react-router-dom';
import { useEventListener } from '@fransvilhelm/hooks';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { size, font, spacing, color } from '../../styles/theme';
import { animated, fadeIn } from '../../styles/animations';
import { transition } from '../../styles/utils';
import { generateFileUrl, extractFileInfo } from '../../utils/files';
import { Loader } from '../Loader';
import { DropboxPreview } from '../DropboxPreview';
import { ChevronRight, AlertCircle } from '../Icons';
import { Spinner } from '../Spinner';
import { Intersect } from '../Intersect';
import { useSearch } from './use-search';

/**
 * Display a search box with the ability to search for pdf content and navigate
 * to that page in the application
 */
export const SearchBox: React.FC = () => {
  /**
   * The component in itself only cares about keeping track of the current
   * input query and displaying the results to the user – the search happens
   * in `useSearch`.
   */
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, { loading, error, searchMore }] = useSearch(query);
  const history = useHistory();

  const handleQueryChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setQuery(evt.currentTarget.value.replace(/^\//, ''));
  };

  useEventListener('keydown', (evt: KeyboardEvent) => {
    if ((evt.key === 'ArrowUp' || evt.key === 'ArrowDown') && listRef.current) {
      const activeChild = listRef.current.querySelector<HTMLElement>(
        '[data-highlighted]',
      );

      if (activeChild) {
        activeChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  });

  useEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.key === '/' && inputRef.current) inputRef.current.focus();
  });

  const searchResult = data?.search;

  return (
    <div>
      <Combobox>
        <StyledComboboxInput
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Search in pdfs (press '/' to focus)"
          autocomplete={false}
          aria-label="Search pdf content"
          onChange={handleQueryChange}
        />
        <SyledComboboxPopover>
          {loading && !searchResult && (
            <MessageWrapper>
              <Loader />
            </MessageWrapper>
          )}
          {!loading && error && (
            <MessageWrapper>
              <ErrorMessage>
                <AlertCircle />
              </ErrorMessage>
              <ErrorMessage>{error.message}</ErrorMessage>
            </MessageWrapper>
          )}
          {searchResult && (
            <StyledComboboxList ref={listRef} data-testid="search-result">
              {searchResult.edges.map(edge => {
                const page = edge.node;
                if (page.__typename === 'FolderMetadata') return null;

                const link = generateFileUrl(page.name);
                const meta = extractFileInfo(page.name);

                return (
                  <StyledComboboxOption
                    key={page.id}
                    value={page.id}
                    role="link"
                    data-testid="search-result-item"
                    onClick={() => {
                      setQuery('');
                      history.push(link);
                    }}
                  >
                    {page.thumbnail && (
                      <DropboxPreview
                        src={page.thumbnail.url}
                        size={page.thumbnail.size}
                      />
                    )}
                    <ResultDetail>
                      <ResultFile>
                        <Link to="/">
                          <span>
                            {meta.year} <ChevronRight />
                          </span>
                          <span>
                            {meta.issue} <ChevronRight />
                          </span>
                          <span>{meta.page}</span>
                        </Link>
                      </ResultFile>
                      <ResultMeta>{page.pathDisplay}</ResultMeta>
                    </ResultDetail>
                  </StyledComboboxOption>
                );
              })}

              {searchResult.pageInfo.hasNextPage && (
                <Intersect
                  as="li"
                  style={{ width: '100%', height: 'auto' }}
                  onEnter={() => searchMore()}
                >
                  <LoadMore>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <LoadMoreButton
                        type="button"
                        onClick={() => searchMore()}
                      >
                        Load more
                      </LoadMoreButton>
                    )}
                  </LoadMore>
                </Intersect>
              )}
            </StyledComboboxList>
          )}
        </SyledComboboxPopover>
      </Combobox>
    </div>
  );
};

const StyledComboboxInput = styled(ComboboxInput)`
  height: ${spacing('10')};
  width: 100%;
  border: 2px solid ${color('white')};
  border-radius: 0.25rem;
  padding: ${spacing('2')};
  font-family: ${font('body')};
  font-size: ${size('base')};
  color: ${color('black')};
  transition: border 0.3s ease-in-out;

  ${animated(fadeIn)};

  &::placeholder {
    color: ${color('black')};
    opacity: 0.75;
  }

  &:focus {
    outline: none;
    border-color: ${color('highlight')};
  }
`;

const SyledComboboxPopover = styled(ComboboxPopover)`
  && {
    border: none;
    background-color: transparent;
  }
`;

const listStyle = () => css`
  min-height: ${spacing('32')};
  max-height: calc(${spacing('64')} * 1.5);
  border: 1px solid ${color('shade')};
  border-radius: 4px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${color('white')};

  @supports (backdrop-filter: blur(2px)) {
    background-color: ${p => transparentize(0.025, color('white')(p))};
    backdrop-filter: blur(2px);
  }
`;

const StyledComboboxList = styled(ComboboxList)`
  ${listStyle}
`;

const MessageWrapper = styled.div`
  ${listStyle}

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: ${spacing('32')};
`;

const ErrorMessage = styled.p`
  margin: 0;
  text-align: center;
  vertical-align: middle;
  color: ${color('warning')};

  &:first-child {
    margin-bottom: ${spacing('4')};
    font-size: ${size('xl')};
  }
`;

const StyledComboboxOption = styled(ComboboxOption)`
  display: flex;
  align-items: center;
  min-height: ${spacing('32')};
  border-bottom: 1px solid ${color('shade')};
  cursor: pointer;

  ${transition('background')};

  && {
    padding: ${spacing('4')};
  }

  &:hover,
  &[data-highlighted] {
    background-color: ${color('shade')};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultDetail = styled.div`
  margin-left: ${spacing('4')};
  color: ${color('black')};
  font-size: ${size('base')};

  & p {
    margin: 0;
  }
`;

const ResultFile = styled.div`
  margin-bottom: ${spacing('2')};

  & a {
    color: inherit;
    text-decoration: none;
  }

  & > a > span:nth-child(1),
  & > a > span:nth-child(2) {
    color: ${p => transparentize(0.5, color('black')(p))};
  }
`;

const ResultMeta = styled.p`
  font-size: ${size('xs')};
  color: ${p => transparentize(0.5, color('black')(p))};
`;

const LoadMore = styled.p`
  width: 100%;
  font-family: ${font('body')};
  font-size: ${size('base')};
  text-align: center;
  color: ${p => transparentize(0.5, color('black')(p))};
`;

const LoadMoreButton = styled.button`
  margin: 0;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;

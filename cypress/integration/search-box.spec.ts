import nanoid from 'nanoid';

const generateSearchEdge = (year: string, issue: string, page: string) => ({
  node: {
    name: `${year}-${issue}-${page}.pdf`,
    id: `id:${nanoid(22)}`,
    pathDisplay: `/Bryggan/${year}/${issue}/${year}-${issue}-${page}.pdf`,
    clientModified: '2020-10-01T00:00:00Z',
    serverModified: '2020-10-01T00:00:00Z',
    __typename: 'FileMetadata',
  },
  __typename: 'MetadataEdge',
});

const generatePageInfo = (hasNextPage = false, cursor?: string) => ({
  hasNextPage,
  cursor: hasNextPage ? cursor ?? nanoid() : null,
  __typename: 'PageInfo',
});

describe('Search Box', () => {
  it('should be hidden on smaller screens', () => {
    cy.visit('/');
    cy.viewport('iphone-6');
    cy.queryByLabelText(/search/).should('not.exist');
  });

  it('should search for content with the search box', () => {
    cy.mockGraphqlOps({
      operations: {
        Search: {
          search: {
            __typename: 'MetadataConnection',
            pageInfo: generatePageInfo(),
            edges: [
              generateSearchEdge('2019', '01', '001'),
              generateSearchEdge('2019', '01', '002'),
              generateSearchEdge('2019', '01', '003'),
              generateSearchEdge('2019', '01', '004'),
              generateSearchEdge('2019', '01', '005'),
            ],
          },
        },
      },
    });

    cy.visit('/');
    cy.search('stena line');
    cy.findByText('/Bryggan/2019/01/2019-01-001.pdf').should('exist');
  });

  it('should be possible to search more content', () => {
    const cursor = nanoid();
    cy.mockGraphqlOps({
      operations: {
        Search: {
          search: (_: any, args: any) => {
            if (args?.options?.after !== cursor) {
              return {
                __typename: 'MetadataConnection',
                pageInfo: generatePageInfo(true, cursor),
                edges: [
                  generateSearchEdge('2019', '01', '001'),
                  generateSearchEdge('2019', '01', '002'),
                  generateSearchEdge('2019', '01', '003'),
                  generateSearchEdge('2019', '01', '004'),
                  generateSearchEdge('2019', '01', '005'),
                ],
              };
            }

            return {
              __typename: 'MetadataConnection',
              pageInfo: generatePageInfo(false),
              edges: [
                generateSearchEdge('2019', '01', '006'),
                generateSearchEdge('2019', '01', '007'),
                generateSearchEdge('2019', '01', '008'),
                generateSearchEdge('2019', '01', '009'),
                generateSearchEdge('2019', '01', '010'),
              ],
            };
          },
        },
      },
    });

    cy.visit('/');
    cy.search('stena line');
    cy.findByText(/load more/i).scrollIntoView();
    cy.findAllByTestId(/search-result-item/i).should('have.length', 10);
    cy.findByText('/Bryggan/2019/01/2019-01-010.pdf');
  });

  it('should remove search result on blur', () => {
    cy.mockGraphqlOps({
      operations: {
        Search: {
          search: {
            __typename: 'MetadataConnection',
            pageInfo: generatePageInfo(),
            edges: [
              generateSearchEdge('2019', '01', '001'),
              generateSearchEdge('2019', '01', '002'),
              generateSearchEdge('2019', '01', '003'),
              generateSearchEdge('2019', '01', '004'),
              generateSearchEdge('2019', '01', '005'),
            ],
          },
        },
      },
    });

    cy.visit('/');
    cy.search('stena line').should('be.visible');
    cy.findByLabelText(/search/i).blur();
    cy.queryByTestId(/^search-result$/i).then(el => Cypress.dom.isHidden(el));
  });
});

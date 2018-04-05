// @flow
import React, { Component } from 'react';
import type { Location } from 'react-router-dom';
import { Formik } from 'formik';
import format from 'date-fns/format';
import type { Breadcrumbs as BreadcrumbsType } from '../../types';
import Breadcrumbs from '../../molecules/Breadcrumbs';
import { MainContentWrapper } from '../../molecules/Grid';
import {
  Form,
  FormFieldset,
  FormGroup,
  FormInputLabel,
  FormInput,
} from '../../atoms/Form';
import { Section } from './components';
import { Button } from '../../atoms/Button';
import ButtonCard from '../../atoms/Button/ButtonCard';
import { Paragraph, Tinted, Heading2 } from '../../atoms/Text';
import { Download } from '../../atoms/Icon';
import { ExternalLink } from '../../atoms/Link';
import { version, bugs } from '../../../package.json';
import { UserConsumer } from '../../contexts/User';
import { getEnv } from '../../utils';

type Props = {
  location: Location,
};

type State = {
  breadcrumbs: BreadcrumbsType,
  repos: Array<{ name: string, url: string }>,
};

class Installningar extends Component<Props, State> {
  state = {
    breadcrumbs: [{ path: '/:root', title: 'Inställningar' }],
    repos: [
      {
        name: 'SST InDesign Export',
        url:
          'https://github.com/sjofartstidningen/sst-indesign-export/releases',
      },
    ],
  };

  handleDownload = (repo: { name: string, url: string }) => {
    window.open(repo.url);
  };

  parseDate = (date: string): string => {
    try {
      const d = format(date, 'YYYY-MM-DD HH:mm:ss');
      if (d === 'Invalid Date') return '-';

      return d;
    } catch (err) {
      return '-';
    }
  };

  render() {
    const { location } = this.props;
    const { breadcrumbs, repos } = this.state;
    return (
      <MainContentWrapper>
        <Breadcrumbs location={location} routes={breadcrumbs} />

        <UserConsumer>
          {({ user, updateUser }) => (
            <Section>
              <Heading2>Användare</Heading2>

              <Formik
                initialValues={{ name: user ? user.displayName : '' || '' }}
                onSubmit={({ name }, { setSubmitting }) =>
                  updateUser({ displayName: name }).then(
                    () => setSubmitting(false),
                    () => setSubmitting(false),
                  )
                }
                render={({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormFieldset>
                      <FormGroup>
                        <FormInputLabel>Namn</FormInputLabel>
                        <FormInput
                          type="text"
                          name="name"
                          id="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoCorrect="on"
                          autoCapitalize="on"
                          autoComplete="name"
                        />
                      </FormGroup>
                    </FormFieldset>

                    <FormFieldset>
                      <FormGroup>
                        <Button
                          type="submit"
                          modifiers={['brand']}
                          disabled={isSubmitting}
                        >
                          Spara
                        </Button>
                        <Button onClick={handleReset}>Ångra</Button>
                      </FormGroup>
                    </FormFieldset>
                  </Form>
                )}
              />
            </Section>
          )}
        </UserConsumer>

        <Section>
          <Heading2>Nedladdningar</Heading2>

          {repos.map(repo => (
            <ButtonCard
              key={repo.name}
              title={repo.name}
              label="Ladda ner"
              icon={() => <Download />}
              onClick={() => this.handleDownload(repo)}
            />
          ))}
        </Section>
        <Section>
          <Heading2>Information</Heading2>

          <Paragraph>
            <Tinted>Aktuell version:</Tinted> {version} <br />
            <Tinted>Uppdaterad:</Tinted>{' '}
            {this.parseDate(getEnv('BUILD_DATE', ''))}
            <br />
            <ExternalLink to={bugs.url}>Rapportera ett fel</ExternalLink>
          </Paragraph>
        </Section>
      </MainContentWrapper>
    );
  }
}

export { Installningar as default };

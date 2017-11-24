import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../../components/Typography/SectionTitle';
import { Description } from '../../../../components/Typography';
import { ButtonPrimary } from '../../../../components/Button';
import dropboxLogotype from './dropbox.svg';
import mailchimpLogotype from './mailchimp.svg';

const ProvidersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.children.length}, 1fr);
  grid-column-gap: ${modularScale(0)};
`;

const ProviderContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 4px;
  padding: ${modularScale(2)};
`;

const ProviderImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: ${modularScale(2)};
`;

const ProviderButton = ButtonPrimary.withComponent(Link);

function Providers({ translateTitle }) {
  return (
    <section>
      <SectionTitle translateTitle={translateTitle}>{['Länkar']}</SectionTitle>

      <Description>
        För att Bryggan ska fungera korrekt krävs det att ditt konto länkas till
        både Dropbox och Mailchimp.
      </Description>

      <ProvidersContainer>
        <ProviderContainer>
          <ProviderImg src={dropboxLogotype} alt="Dropbox logotype" />
          <ProviderButton to="/">Länka Dropbox</ProviderButton>
        </ProviderContainer>

        <ProviderContainer>
          <ProviderImg src={mailchimpLogotype} alt="Mailchimp logotype" />
          <ProviderButton to="/">Länka Mailchimp</ProviderButton>
        </ProviderContainer>
      </ProvidersContainer>
    </section>
  );
}

Providers.propTypes = {
  translateTitle: PropTypes.number.isRequired,
};

export { Providers as default };

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import * as typo from './index';

storiesOf('Typography', module)
  .addDecorator(story => <div style={{ padding: '1em' }}>{story()}</div>)
  .add('headings', () => (
    <div>
      <typo.MainHeading>main heading</typo.MainHeading>
      <typo.SubpageTitle>subpage title</typo.SubpageTitle>
      <typo.SectionHeader>section header</typo.SectionHeader>
      <typo.SubSectionHeading>sub section heading</typo.SubSectionHeading>
    </div>
  ))
  .add('body', () => (
    <div>
      <typo.SubSectionHeading>Body content</typo.SubSectionHeading>
      <typo.BodyContent>
        Humblebrag biodiesel cliche, hashtag brooklyn marfa cred adaptogen
        hammock deep v shoreditch next level photo booth chambray. Fingerstache
        knausgaard ramps pickled XOXO woke shaman cliche aesthetic tumblr
        post-ironic vegan everyday carry twee selfies. Quinoa 90s drinking.
      </typo.BodyContent>

      <typo.SubSectionHeading>Meta content</typo.SubSectionHeading>
      <typo.MetaContent>
        Humblebrag biodiesel cliche, hashtag brooklyn marfa cred adaptogen
        hammock deep v shoreditch next level photo booth chambray. Fingerstache
        knausgaard ramps pickled XOXO woke shaman cliche aesthetic tumblr
        post-ironic vegan everyday carry twee selfies. Quinoa 90s drinking.
      </typo.MetaContent>
    </div>
  ));

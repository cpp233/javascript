import { useUser } from '@clerk/shared/react';

import { useEnvironment } from '../../contexts';
import { Col, descriptors, localizationKeys } from '../../customizables';
import { Card, Header, useCardState, withCardStateProvider } from '../../elements';
import { NavbarMenuButtonRow } from '../../elements/Navbar';
import { ConnectedAccountsSection } from './ConnectedAccountsSection';
import { EmailsSection } from './EmailsSection';
import { EnterpriseAccountsSection } from './EnterpriseAccountsSection';
import { PhoneSection } from './PhoneSection';
import { UsernameSection } from './UsernameSection';
import { UserProfileSection } from './UserProfileSection';
import { Web3Section } from './Web3Section';

export const AccountPage = withCardStateProvider(() => {
  const { attributes, saml, social } = useEnvironment().userSettings;
  const card = useCardState();
  const { user } = useUser();
  const showUsername = attributes.username.enabled;
  const showEmail = attributes.email_address.enabled;
  const showPhone = attributes.phone_number.enabled;
  const showConnectedAccounts = social && Object.values(social).filter(p => p.enabled).length > 0;
  const showSamlAccounts = saml && saml.enabled && user && user.samlAccounts.length > 0;
  const showWeb3 = attributes.web3_wallet.enabled;

  return (
    <Col
      elementDescriptor={descriptors.page}
      sx={t => ({ gap: t.space.$8 })}
    >
      <NavbarMenuButtonRow />
      <Card.Alert>{card.error}</Card.Alert>
      <Col
        elementDescriptor={descriptors.profilePage}
        elementId={descriptors.profilePage.setId('account')}
      >
        <Header.Root>
          <Header.Title
            localizationKey={localizationKeys('userProfile.start.headerTitle__account')}
            sx={t => ({ marginBottom: t.space.$4 })}
            textVariant='h2'
          />
        </Header.Root>

        <UserProfileSection />
        {showUsername && <UsernameSection />}
        {showEmail && <EmailsSection />}
        {showPhone && <PhoneSection />}
        {showConnectedAccounts && <ConnectedAccountsSection />}
        {showSamlAccounts && <EnterpriseAccountsSection />}
        {showWeb3 && <Web3Section />}
      </Col>
    </Col>
  );
});

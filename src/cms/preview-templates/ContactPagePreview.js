import React from 'react';
import { ContactPageTemplate } from '../../templates/contact-page';

const ContactPagePreview = ({ entry, widgetFor, getAsset }) => {
  // Extracting data from the `entry` object
  const phone = entry.getIn(['data', 'phone']);
  const email = entry.getIn(['data', 'email']);
  const address = entry.getIn(['data', 'address']);
  const facebook = entry.getIn(['data', 'facebook']);
  const instagram = entry.getIn(['data', 'instagram']);

  return (
    <div>
      <ContactPageTemplate
        phone={phone}
        email={email}
        address={address}
        facebook={facebook}
        instagram={instagram}
      />
    </div>
  );
};

export default ContactPagePreview;

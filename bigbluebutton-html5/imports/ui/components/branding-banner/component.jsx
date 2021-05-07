import React from 'react';
import styles from './styles';
import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';

export default class BrandingBanner extends React.Component {
  constructor() {
    super();

    this.state = {
      url: null,
    };
  }

  componentDidMount() {
    const { metadataProp } = Meetings.findOne({ meetingId: Auth.meetingID },
      { fields: { metadataProp: 1 } });

    if (metadataProp.metadata['branding-banner']) {
      this.setState({ url: metadataProp.metadata['branding-banner'] });
    }
  }

  render() {
    const { url } = this.state;
    if (url) {
      return (
        <div  className={styles.bannerContainer}>
          <img className={styles.bannerImage} src={url} alt="Branding Banner" />
        </div>
      );
    }

    return (null);
  }
}
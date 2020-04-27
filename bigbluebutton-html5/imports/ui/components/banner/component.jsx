import React from 'react';
import styles from './styles';
// import Meetings from '/imports/api/meetings';

export default class Banner extends React.Component {
  /* constructor() {
        super();

        this.state = {
            banner: null
        }
    }

    componentDidMount() {
        const { metadataProps } = Meetings.findOne({ meetingId: Auth.meetingID },
            { fields: { metadataProp: 1 } })
    } */

  render() {
    // if (banner) {
    return (
      <div className={styles.bannerContainer}>
        <img className={styles.bannerImage} src="https://cvm.it/fascia.png" />
      </div>
    );
    // }

    // return <div />
  }
}

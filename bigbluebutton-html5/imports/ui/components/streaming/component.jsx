import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';
import { Session } from 'meteor/session';
import { styles } from './styles.scss';

const intlMessages = defineMessages({
  dismissLabel: {
    id: 'app.about.dismissLabel',
    description: 'Dismiss button label',
  },
  dismissDesc: {
    id: 'app.about.dismissDesc',
    description: 'adds descriptive context to dissmissLabel',
  },
});

class StreamingComponent extends React.Component {
  handleWebcamsOnly() {
    const streaming = Session.get('streaming');
    Session.set('streaming', streaming !== 'webcamsOnly' ? 'webcamsOnly' : '');
  }

  handleChromaKey() {
    const streaming = Session.get('streaming');
    Session.set('streaming', streaming !== 'chromaKey' ? 'chromaKey' : '');
  }

  handlePresentationOnly() {
    const streaming = Session.get('streaming');
    Session.set('streaming', streaming !== 'presentationOnly' ? 'presentationOnly' : '');
  }

  render() {
    const { intl, streaming } = this.props;

    return (
      <Modal
        title="Streaming"
        dismiss={{
          label: intl.formatMessage(intlMessages.dismissLabel),
          description: intl.formatMessage(intlMessages.dismissDesc),
        }}
      >
        <Button
          className={styles.buttonMargin}
          label="Totale Webcam"
          onClick={this.handleWebcamsOnly}
          color={streaming === 'webcamsOnly' ? 'danger' : 'primary'}
          size="lg"
        />
        <Button
          className={styles.buttonMargin}
          label="Chroma Key"
          onClick={this.handleChromaKey}
          color={streaming === 'chromaKey' ? 'danger' : 'primary'}
          size="lg"
        />
        <Button
          label="Presentation Only"
          onClick={this.handlePresentationOnly}
          color={streaming === 'presentationOnly' ? 'danger' : 'primary'}
          size="lg"
        />
      </Modal>
    );
  }
}

export default injectIntl(StreamingComponent);

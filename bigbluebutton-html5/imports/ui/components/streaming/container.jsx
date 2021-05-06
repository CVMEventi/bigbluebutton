import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import StreamingComponent from './component';

const StreamingContainer = props => (
    <StreamingComponent {...props} />
  );

export default withTracker((props) => {
return {
    streaming: Session.get('streaming'),
};
})(StreamingContainer);

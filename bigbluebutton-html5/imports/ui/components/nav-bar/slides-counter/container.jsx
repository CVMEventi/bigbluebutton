import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SlidesCounter from './component';
import PresentationToolbarService from '../../presentation/presentation-toolbar/service';
import PresentationAreaService from '../../presentation/service';

const SlidesCounterContainer = props => (
  <SlidesCounter {...props} />
);

export default withTracker(() => {
  const podId = 'DEFAULT_PRESENTATION_POD';

  const currentSlide = PresentationAreaService.getCurrentSlide(podId);
  const currentSlideNum = currentSlide ? currentSlide.num : 0;
  const numberOfSlides = currentSlide ? PresentationToolbarService.getNumberOfSlides(
    podId,
    currentSlide.presentationId,
  ) : 0;

  return {
    currentSlideNum,
    numberOfSlides,
  };
})(SlidesCounterContainer);

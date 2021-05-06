import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const propTypes = {
  currentSlideNum: PropTypes.number.isRequired,
  numberOfSlides: PropTypes.number.isRequired,
};

class SlidesCounter extends PureComponent {
  render() {
    const { currentSlideNum, numberOfSlides } = this.props;

    return (
      <Fragment>
        <span className={styles.presentationTitleSeparator} aria-hidden>|</span>
        <div className={styles.slidesCounter}>{`Slide: ${currentSlideNum}/${numberOfSlides}`}</div>
      </Fragment>
    );
  }
}

SlidesCounter.propTypes = propTypes;

export default SlidesCounter;
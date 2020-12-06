import React, { useEffect, useState } from "react";
// Style
import "./carousel.scss";
import LeftArrow from "./left-arrow.png";
import RightArrow from "./right-arrow.png";

const Carousel = (props) => {

  const { slideCount = 0 } = props;

  const [currentLeftIndex, setCurrentLeftIndex] = useState(0);
  const [currentRightIndex, setCurrentRightIndex] = useState(0);
  const [current, setCurrent] = useState(-10);
  const [viewableSlides, setViewableSlides] = useState([]);
  const [slides, setSlides] = useState([]);

  const _navigateLeft = () => {
    _appendNewSlide("left");
  };

  const _navigateRight = () => {
    _appendNewSlide("right");
    setCurrent(current - 1);
  };

  const _appendNewSlide = (side) => {
    if (side === "right") {
      // Append a slide at the right
      let _viewableSlides = [...viewableSlides];
      let _currentRightIndex = currentRightIndex;
      _viewableSlides = [...viewableSlides, slides[_currentRightIndex]];
      // Update right index indicator
      _currentRightIndex = currentRightIndex + 1;
      if (_currentRightIndex === slides.length) {
        _currentRightIndex = 0;
      }
      setCurrentRightIndex(_currentRightIndex);
      // Remove a slide from left side
      setViewableSlides(_viewableSlides);
    } else {
      // Left side
      // Append a slide at the left
      let _viewableSlides = [...viewableSlides];
      let _currentLeftIndex = currentLeftIndex;
      _viewableSlides = [slides[_currentLeftIndex], ...viewableSlides];
      // Update left index indicator
      _currentLeftIndex = _currentLeftIndex - 1;
      if (_currentLeftIndex < 0) {
        _currentLeftIndex = slides.length - 1;
      }
      setViewableSlides(_viewableSlides);
      setCurrentLeftIndex(_currentLeftIndex);
    }
  };

  const _getAdditionalSlides = (slides, slidesLength, order) => {
    const additionalSlides = [];
    if (order === "backward") {
      let j = slides.length - 1;
      for (let i = slidesLength - 1; i >= 0; i--) {
        additionalSlides[i] = slides[j];
        if (j === 0) {
          j = slides.length - 1;
        } else {
          j--;
        }
      }
      setCurrentLeftIndex(j);
    } else {
      // Forward
      let j = 0;
      for (let i = 0; i < slidesLength; i++) {
        additionalSlides[i] = slides[j];
        if (j === slides.length - 1) {
          j = 0;
        } else {
          j++;
        }
      }
      setCurrentRightIndex(j);
    }
    return additionalSlides;
  };

  const _prepareInitialViewableSlides = () => {
    const slides = Array.from({length: slideCount}, (_, i) => i + 1)
    const additionalPrevSlides = _getAdditionalSlides(slides, 10, "backward");
    const additionalNextSlides = _getAdditionalSlides(slides, 10, "forward");
    setSlides(slides);
    setViewableSlides([
      ...additionalPrevSlides,
      ...slides,
      ...additionalNextSlides,
    ]);
  };

  const _getCurrentOffset = () => {
    return 430 * current;
  };

  useEffect(() => {
    _prepareInitialViewableSlides();
  }, []);

  const _renderSlides = () => {
    let currentoffSet = _getCurrentOffset();
    return (
      <div
        className="carouselBody"
        style={{
          transform: `translateX(${currentoffSet}px)`,
          width: 430 * viewableSlides.length,
        }}
      >
        {viewableSlides.map((slide, slideIndex) => (
          <div className="slide" key={slideIndex}>
            <p>{slide}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="carouselOuterWrapper">
        <div className="leftNavigator" onClick={_navigateLeft}>
          <img src={LeftArrow} alt="" />
        </div>
        <div className="carouselInnerWrapper">{_renderSlides()}</div>
        <div className="rightNavigator" onClick={_navigateRight}>
          <img src={RightArrow} alt="" />
        </div>
      </div>
    </>
  );
};

export default Carousel;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { transition } from '@cloudinary/url-gen/actions/effect';

function Carrousel({ images }) {
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(3000);
  const [direction, setDirection] = useState('right');
  const prevIndex = index === 0 ? images.length - 1 : index - 1;
  const nextIndex = index === images.length - 1 ? 0 : index + 1;
  const slideVariants = {
    moveLeft: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
    moveRight: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
    center: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exitRight: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
    exitLeft: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
  };

  function handleNext() {
    setDirection('right');
    setTimer(3000);
    console.log(direction);
    index + 1 === images.length ? setIndex(0) : setIndex(index + 1);
  }
  function handlePrev() {
    setDirection('left');
    console.log(direction);
    index - 1 < 0 ? setIndex(images.length - 1) : setIndex(index - 1);
  }

  setTimeout(() => {
    handleNext();
  }, timer);

  return (
    <div className="carrousel bg-tertiary w-full flex flex-col justify-center items-center overflow-hidden py-5">
      <div className="carrousel-title text-2xl font-poppins text-primary">
        <h4>
          ¡Bienvenido al catálogo de{' '}
          <span className="text-accent font-bold">LIFE STYLE</span>!
        </h4>
      </div>
      <div className="carrousel-btns w-full z-2 flex justify-around items-center relative top-50">
        <button
          onClick={handlePrev}
          className="bg-accent/80 text-primary w-10 h-10 rounded-full cursor-pointer hover:scale-110 hover:bg-accent transition-all duration-300"
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button
          onClick={handleNext}
          className="bg-accent/80 text-primary w-10 h-10 rounded-full cursor-pointer hover:scale-110 hover:bg-accent transition-all duration-300"
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
      <div className="carrousel-slide w-2/3 flex justify-center items-center relative z-1 p-15">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            variants={slideVariants}
            initial={direction === 'right' ? 'moveRight' : 'moveLeft'}
            animate="center"
            exit={direction === 'right' ? 'exitRight' : 'exitLeft'}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>
        <div className="actual-slide z-10 w-full h-70 overflow-hidden "></div>
      </div>
    </div>
  );
}

export default Carrousel;

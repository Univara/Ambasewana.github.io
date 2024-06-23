import { useState, useEffect } from 'react';

import Hero from '../components/hero';

// import { MdBoy, MdConstruction } from 'react-icons/md';
// import { LuConstruction } from 'react-icons/lu';
import Transition from '../components/Transition';

function Pages() {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hide the Transition component after 3 seconds
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000);

    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {showTransition && <Transition />}
      <Hero />
    </div>
  );
}

export default Pages;

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const CountUp = ({ max = 10, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
    let interval;
    if (inView) {
      let current = 0;
      const stepTime = duration / max;

      interval = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= max) clearInterval(interval);
      }, stepTime);
    } else {
      setCount(0);
    }

    return () => clearInterval(interval);
  }, [inView, max, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-center">
      {count}
    </div>
  );
};

export default CountUp;

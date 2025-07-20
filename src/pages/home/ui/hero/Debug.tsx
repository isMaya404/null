import { useState, useEffect, useRef } from "react";

const Debug = ({
  index,
  totalIndex,
}: {
  index: number;
  totalIndex: number;
}) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const debugRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debugRef.current) clearInterval(debugRef.current);
    const now = Date.now();
    setStartTime(now);
    setNow(now);
    debugRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);

    return () => clearInterval(debugRef.current!);
  }, [index]);

  return (
    <div
      className={`text-white flex-between bg-prim/60 rounded-md absolute z-99 top-[45%] left-1/2 -translate-x-1/2 flex justify-between w-[85%] p-2 font-bold`}
    >
      <h1 className="text-xl font-mono">
        {startTime &&
          now &&
          `Start Time: ${((now - startTime) / 1000).toFixed(2)}s`}
      </h1>
      <span>
        {index + 1} / {totalIndex}
      </span>
    </div>
  );
};
export default Debug;

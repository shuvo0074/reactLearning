import { useState, useEffect, useMemo, memo } from "react";

// https://blog.logrocket.com/react-memo-vs-usememo/



import { useRef } from "react";
function Counterss({ memoizedValue }) {
  const renderCount = useRef(0);
  return (
    <div className="mt-3">
      <p className="dark:text-white">
        Nothing has changed here but I've now rendered:{" "}
        <span className="dark:text-green-300 text-grey-900">
          {memoizedValue} time(s)
        </span>
      </p>
    </div>
  );
}

const Counts = memo(Counterss)


const constants = { MOZARELLA: "MOZARELLA", CHEDDAR: "CHEDDAR", PARMESAN: "PARMESAN", CABERNET: "CABERNET", CHARDONAY: "CHARDONAY", MERLOT: "MERLOT" }
export default function ParentComponent() {
  const { MOZARELLA, CHEDDAR, PARMESAN, CABERNET, CHARDONAY, MERLOT } = constants;
  const [times, setTimes] = useState(0);
  const useMemoRef = useRef(0);

  const incrementUseMemoRef = () => useMemoRef.current++;
  const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);

  const [cheeseType, setCheeseType] = useState("");
  const [wine, setWine] = useState("");
  const whichWineGoesBest = () => {
    switch (cheeseType) {
      case MOZARELLA:
        return setWine(CABERNET);
      case CHEDDAR:
        return setWine(CHARDONAY);
      case PARMESAN:
        return setWine(MERLOT);
      default:
        return CHARDONAY;
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      whichWineGoesBest();
    }
    return () => (mounted = false);
  }, [cheeseType]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-center dark:text-gray-400 mt-10">
        Without React.memo() or useMemo()
      </h3>
      <h1 className="font-semibold text-2xl dark:text-white max-w-md text-center">
        Select a cheese and we will tell you which wine goes best!
      </h1>
      <div className="flex flex-col gap-4 mt-10">
        <button className="bg-indigo-200 py-2 px-10 rounded-md" text={MOZARELLA} onClick={() => setCheeseType(MOZARELLA)} />
        <button className="bg-indigo-200 py-2 px-10 rounded-md" text={CHEDDAR} onClick={() => setCheeseType(CHEDDAR)} />
        <button className="bg-indigo-200 py-2 px-10 rounded-md" text={PARMESAN} onClick={() => setCheeseType(PARMESAN)} />
      </div>
      {cheeseType && (
        <p className="mt-5 dark:text-green-400 font-semibold">
          For {cheeseType}, <span className="dark:text-yellow-500">{wine}</span>{" "}
          goes best.
        </p>
      )}
      <button
        className="bg-indigo-200 py-2 px-10 rounded-md"
        onClick={() => setTimes(times + 1)}
      >
        Force render
      </button>
      {/* <Counts /> */}
      <Counterss memoizedValue={memoizedValue} />
    </div>
  );
}

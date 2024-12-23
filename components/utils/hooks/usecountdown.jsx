import { useState, useEffect } from "react";

const initTime = {
	hoursNum: 0,
	minutesNum: 0,
	secondsNum: 0,
	millisecondsNum: 0,
	hoursStr: "00",
	minutesStr: "00",
	secondsStr: "00",
	millisecondsStr: "000",
};

const useCountdownTimer = (futureTimestampOrDatetime, onCountdownEnd) => {
	const _futureTimestamp =
		typeof futureTimestampOrDatetime === "number"
			? futureTimestampOrDatetime
			: new Date(futureTimestampOrDatetime).getTime();

	const [futureTimestamp, setFutureTimestamp] = useState(_futureTimestamp);

	const [remainingTime, setRemainingTime] = useState(initTime);

	function reset(_ts) {
		setFutureTimestamp(_ts);
		setRemainingTime(initTime);
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			const currentTime = new Date().getTime();
			const timeDifference = futureTimestamp - currentTime;

			if (timeDifference <= 0) {
				clearInterval(intervalId);
				setRemainingTime(initTime);

				if (typeof onCountdownEnd === "function") {
					onCountdownEnd();
				}

				return;
			}

			const hoursNum = Math.max(0, Math.floor(timeDifference / (1000 * 60 * 60)));
			const minutesNum = Math.max(0, Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
			const secondsNum = Math.max(0, Math.floor((timeDifference % (1000 * 60)) / 1000));
			const millisecondsNum = timeDifference % 1000;

			const hoursStr = String(hoursNum).padStart(2, "0");
			const minutesStr = String(minutesNum).padStart(2, "0");
			const secondsStr = String(secondsNum).padStart(2, "0");
			const millisecondsStr = String(millisecondsNum).padStart(3, "0");

			setRemainingTime({
				hoursNum,
				minutesNum,
				secondsNum,
				millisecondsNum,
				hoursStr,
				minutesStr,
				secondsStr,
				millisecondsStr,
			});
		}, 10); // Update every 10 milliseconds

		return () => clearInterval(intervalId);
	}, [futureTimestamp, onCountdownEnd]);

	return {
		remainingTime,
		setFutureTimestamp,
		reset,
		countEnded:
			remainingTime.hoursNum === 0 &&
			remainingTime.minutesNum === 0 &&
			remainingTime.secondsNum === 0 &&
			remainingTime.millisecondsNum === 0,
	};
};

export default useCountdownTimer;

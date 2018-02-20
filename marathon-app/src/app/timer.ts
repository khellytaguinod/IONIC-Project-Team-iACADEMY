export class Timer {
	private hours: number = 0;
	private minutes: number = 0;
	private seconds: number = 0;
	private timer;

	start() {
		this.timer = setInterval(() => {
			this.seconds++;
			if (this.seconds >= 60) {
				this.seconds = 0;
				this.minutes++;
				if (this.minutes >= 60) {
					this.minutes = 0;
					this.hours++;
				}
			}
		}, 1000);
	}

	stop() {
		clearInterval(this.timer);
	}

	reset() {
		this.hours = this.minutes = this.seconds = 0;
	}
}

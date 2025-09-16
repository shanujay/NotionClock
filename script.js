// Seven-segment display patterns for digits 0-9
        const segmentPatterns = {
            0: [1, 1, 1, 0, 1, 1, 1], // top, top-left, top-right, middle, bottom-left, bottom-right, bottom
            1: [0, 0, 1, 0, 0, 1, 0],
            2: [1, 0, 1, 1, 1, 0, 1],
            3: [1, 0, 1, 1, 0, 1, 1],
            4: [0, 1, 1, 1, 0, 1, 0],
            5: [1, 1, 0, 1, 0, 1, 1],
            6: [1, 1, 0, 1, 1, 1, 1],
            7: [1, 0, 1, 0, 0, 1, 0],
            8: [1, 1, 1, 1, 1, 1, 1],
            9: [1, 1, 1, 1, 0, 1, 1]
        };

        function setDigit(digitId, number) {
            const digit = document.getElementById(digitId);
            const segments = digit.querySelectorAll('.segment');
            const pattern = segmentPatterns[number];

            segments.forEach((segment, index) => {
                if (pattern[index]) {
                    segment.classList.add('active');
                } else {
                    segment.classList.remove('active');
                }
            });
        }

        function getScheduleCategory(hour) {
            if (hour >= 16 || hour < 0) {
                // 4PM (16) to 11:59PM (23) - Work Time
                return { text: "Work Time", class: "work-time" };
            } else if (hour >= 0 && hour < 6) {
                // 12AM (0) to 5:59AM (5) - Sleep Time
                return { text: "Sleep Time", class: "sleep-time" };
            } else {
                // 6AM (6) to 3:59PM (15) - Study Time
                return { text: "Study Time", class: "study-time" };
            }
        }

        function updateClock() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();

            // Get schedule category based on 24-hour format
            const schedule = getScheduleCategory(hours);
            const categoryElement = document.getElementById('scheduleCategory');
            categoryElement.textContent = schedule.text;
            categoryElement.className = `schedule-category ${schedule.class}`;

            // Convert to 12-hour format for display
            hours = hours % 12;
            if (hours === 0) hours = 12;

            // Format time with leading zeros
            const timeString = String(hours).padStart(2, '0') + String(minutes).padStart(2, '0');

            // Update each digit
            setDigit('hour1', parseInt(timeString[0]));
            setDigit('hour2', parseInt(timeString[1]));
            setDigit('minute1', parseInt(timeString[2]));
            setDigit('minute2', parseInt(timeString[3]));
        }

        // Update clock immediately and then every second
        updateClock();
        setInterval(updateClock, 1000);
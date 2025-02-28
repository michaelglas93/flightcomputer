document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const trueAirspeed = parseFloat(document.getElementById("trueAirspeed").value);
        const windSpeed = parseFloat(document.getElementById("windSpeed").value);
        const trueCourse = parseFloat(document.getElementById("trueCourse").value);
        const windDirection = parseFloat(document.getElementById("windDirection").value);
        const deviation = parseFloat(document.getElementById("deviation").value); // New field for deviation

        // Convert degrees to radians
        const windDirectionRad = windDirection * (Math.PI / 180);
        const trueCourseRad = trueCourse * (Math.PI / 180);

        // Wind Correction Angle (in degrees)
        let windCorrectionAngleRad = Math.asin((windSpeed * Math.sin(windDirectionRad - trueCourseRad)) / trueAirspeed);
        let windCorrectionAngle = (windCorrectionAngleRad * 180 / Math.PI).toFixed(2); // Convert to degrees

        // Heading (True Heading corrected for wind)
        // Convert windCorrectionAngle back to a float before adding
        let heading = Math.round(trueCourse + parseFloat(windCorrectionAngle));

        // Ground Speed (Law of Cosines)
        let groundSpeed = Math.sqrt(
            Math.pow(trueAirspeed, 2) + Math.pow(windSpeed, 2) -
            (2 * trueAirspeed * windSpeed * Math.cos(windDirectionRad - trueCourseRad))
        ).toFixed(2);

        // Calculate Magnetic Heading (MH)
        // Assuming deviation is positive for East and negative for West,
        // Magnetic Heading = Heading - Deviation
        let magneticHeading = Math.round(heading - deviation);

        // Display results
        document.getElementById("windOutput").innerHTML = windCorrectionAngle;
        document.getElementById("headingOutput").innerHTML = heading;
        document.getElementById("groundSpeedOutput").innerHTML = groundSpeed;
        document.getElementById("magneticHeadingOutput").innerHTML = magneticHeading;
    });
});

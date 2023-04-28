export default function (slPolyline: number[]): number[][] {
	/**
	 * struncture of slPolyline:
	 * [startLat, startLng, adjusmentLat, adjusmentLng, ...]
	 *
	 * struncture of return value:
	 * [[startLat, startLng], [secondLat, secondLng], ...]
	 */

	const positions: number[][] = [];

	let lat = slPolyline[1];
	let lng = slPolyline[0];
	positions.push([lat, lng]);

	for (let i = 2; i < slPolyline.length; i += 2) {
		lat += slPolyline[i + 1];
		lng += slPolyline[i];
		positions.push([lat, lng]);
	}

	return positions;
}

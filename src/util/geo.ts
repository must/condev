export type Coordinate = {
  latitude: number;
  longitude: number;
}

export const centroid = (points: Coordinate[]) => {
  const center = {
    latitude: 0.0,
    longitude: 0.0
  };

  for (const point of points) {
    center.latitude += point.latitude;
    center.longitude += point.longitude;
  }

  const totalPoints = points.length;
  center.latitude = center.latitude / totalPoints;
  center.longitude = center.longitude / totalPoints;

  return center;
};

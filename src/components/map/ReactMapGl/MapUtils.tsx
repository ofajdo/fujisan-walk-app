import {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "maplibre-gl";
import { CompassControl } from "maplibre-gl-compass";

export const MapUtils = (mapRef: any) => {
  if (!mapRef.current) return null;
  const map = mapRef.current.getMap();

  if (!map) return;

  map.addControl(
    new NavigationControl({
      visualizePitch: true,
      showZoom: false,
      showCompass: true,
    }),
    "bottom-right",
  );

  map.addControl(new FullscreenControl(), "bottom-right");

  const geolocate = new GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserLocation: true,
    showAccuracyCircle: true,
    fitBoundsOptions: { maxZoom: 17 },
  });
  map.addControl(geolocate, "bottom-right");

  const compass = new CompassControl();
  map.addControl(compass, "bottom-right");

  let isOperating = false;
  map.on("touchstart", () => (isOperating = true));
  map.on("touchend", () => (isOperating = false));

  compass.on("turnon", () => {
    if ((geolocate as any)._watchState !== "ACTIVE_LOCK") {
      geolocate.trigger();
    }
  });

  geolocate.on("userlocationlostfocus", () => {
    if (!isOperating) {
      geolocate.trigger();
    }
  });
  return map;
};

export const toLngLat = (
  place: { latitude: string; longitude: string } | null,
) => [
  Number(place?.longitude || "138.621"),
  Number(place?.latitude || "35.222"),
];

import type { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import { registerMap } from 'echarts/core';

const MAP_NAME = 'japan';
let isRegistered = false;

const mapSources: Record<string, GeoJSONSourceInput> = {};

export const ensureJapanMap = async () => {
  if (isRegistered) {
    return MAP_NAME;
  }

  if (!mapSources[MAP_NAME]) {
    const response = await fetch('https://fastly.jsdelivr.net/npm/echarts@5/map/json/japan.json');
    if (!response.ok) {
      throw new Error('Failed to load Japan map GeoJSON');
    }
    mapSources[MAP_NAME] = (await response.json()) as GeoJSONSourceInput;
  }

  registerMap(MAP_NAME, mapSources[MAP_NAME]);
  isRegistered = true;
  return MAP_NAME;
};

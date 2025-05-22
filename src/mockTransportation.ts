export const transportationData = {
  status: {},
  transportationNoise: {
    attomId: 184713191,
    lat: 39.77896,
    lon: -105.04771,
    road_noise: {
      level: 2,
      level_description: 'Busy traffic nearby',
      noise_sources: [
        {
          source_type: 'road',
          source_sub_type: 'motorway',
          source_description: '',
        },
        {
          source_type: 'road',
          source_sub_type: 'residential',
          source_description: 'Winona Court',
        },
        {
          source_type: 'road',
          source_sub_type: 'motorway_link',
          source_description: '',
        },
        {
          source_type: 'road',
          source_sub_type: 'primary',
          source_description: 'Sheridan Boulevard',
        },
        {
          source_type: 'road',
          source_sub_type: 'service',
          source_description: '',
        },
      ],
    },
    aviation_noise: {
      level: 0,
      level_description: 'No nearby airports',
    },
    emg_vehicle_noise: {
      level: 3,
      level_description: 'Possible frequent or loud ambulance or fire truck sirens',
      noise_sources: [
        {
          source_type: 'fire-station',
          source_description: 'Denver Fire Department Station 17',
          source_dist_km: 0.4,
        },
        {
          source_type: 'fire-station',
          source_description: 'Lakeside Fire Department Station 2',
          source_dist_km: 0.6,
        },
      ],
    },
    rail_whistle_noise: {
      level: 0,
      level_description: "There aren't any train crossings with whistles nearby",
      noise_sources: [
        {
          source_type: 'rail-whistle',
          source_description: 'BNSF Railway & Tennyson Street',
          source_dist_km: 2.8,
        },
        {
          source_type: 'rail-whistle',
          source_description: 'Union Pacific Railroad & Tennyson Street',
          source_dist_km: 2.9,
        },
        {
          source_type: 'rail-whistle',
          source_description: 'Union Pacific Railroad & Tennyson Street',
          source_dist_km: 2.9,
        },
        {
          source_type: 'rail-whistle',
          source_description: 'RTD & Tennyson Street',
          source_dist_km: 2.9,
        },
        {
          source_type: 'rail-whistle',
          source_description: 'RTD & Tennyson Street',
          source_dist_km: 2.9,
        },
      ],
    },
    rail_noise: {
      level: 1,
      level_description: 'Audible trains',
      noise_sources: [
        {
          source_type: 'rail',
          source_sub_type: 'rail',
          source_description: 'UP Moffat Tunnel Subdivision',
        },
        {
          source_type: 'rail',
          source_sub_type: 'rail',
          source_description: 'RTD G Line',
        },
        {
          source_type: 'rail',
          source_sub_type: 'rail',
          source_description: 'Golden Subdivision',
        },
        {
          source_type: 'rail',
          source_sub_type: 'rail',
          source_description: '',
        },
      ],
    },
    overall_summary:
      'Traffic noise is medium.  Also, there may be frequent ambulance traffic nearby.',
    disclaimer_text:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
}

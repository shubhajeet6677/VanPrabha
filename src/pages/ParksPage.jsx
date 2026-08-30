import React from 'react';
import TelemetryPage from '../components/TelemetryPage';
import { PARKS_LIST } from '../data/mockData';

export default function ParksPage() {
  return (
    <TelemetryPage
      siteType="parks"
      initialSites={PARKS_LIST}
      siteTitle="Parks"
      singleSiteTitle="Park"
      baseRoute="/parks"
    />
  );
}

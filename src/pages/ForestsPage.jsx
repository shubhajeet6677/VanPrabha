import React from 'react';
import TelemetryPage from '../components/TelemetryPage';
import { FORESTS_LIST } from '../data/mockData';

export default function ForestsPage() {
  return (
    <TelemetryPage
      siteType="forests"
      initialSites={FORESTS_LIST}
      siteTitle="Forests"
      singleSiteTitle="Forest"
      baseRoute="/forests"
    />
  );
}

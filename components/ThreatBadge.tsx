
import React from 'react';
import { ThreatLevel } from '../types';

interface Props {
  level: ThreatLevel;
}

const ThreatBadge: React.FC<Props> = ({ level }) => {
  const styles = {
    [ThreatLevel.SAFE]: "bg-emerald-100 text-emerald-700 border-emerald-200",
    [ThreatLevel.SUSPICIOUS]: "bg-amber-100 text-amber-700 border-amber-200",
    [ThreatLevel.HIGH_RISK]: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const icons = {
    [ThreatLevel.SAFE]: "fa-check-circle",
    [ThreatLevel.SUSPICIOUS]: "fa-triangle-exclamation",
    [ThreatLevel.HIGH_RISK]: "fa-circle-xmark",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold ${styles[level]}`}>
      <i className={`fas ${icons[level]}`}></i>
      {level}
    </div>
  );
};

export default ThreatBadge;

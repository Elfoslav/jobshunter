import React from 'react';
import { GlobeAmericas } from 'react-bootstrap-icons';

interface RemotePercentageProps {
  remotePercentage: number;
}

const RemotePercentage: React.FC<RemotePercentageProps> = ({
  remotePercentage,
}) => {
  return (
    <div className="d-flex align-items-center">
      <GlobeAmericas className="me-1" />
      <span>
        {remotePercentage && remotePercentage > 0
          ? `Remote ${remotePercentage}%`
          : 'On Site'}
      </span>
    </div>
  );
};

export default RemotePercentage;

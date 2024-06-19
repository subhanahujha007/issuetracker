"use client"
import React from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';


type HeatmapProp = {
    data: {
      date: string;
      count: number;
    }[]
  };
const panelcolours= {0: '#EBEDF0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127'}
const Demo = ({data}:HeatmapProp) => {
  return (
    <HeatMap
     value={Array.isArray(data) ? data : []}
      style={{borderRadius:"20px",padding:'0.51rem',backgroundColor:"#000",color:"#888"}}
      width={900}
      rectSize={14}
      startDate={new Date('2024/01/01')}
      panelColors={panelcolours}
      rectRender={(props, data) => {
        
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  )
};
export default Demo
import React, { useState, useEffect, useRef } from 'react';
import { Download, Play, Pause, Trash2, Database, Activity, Clock, ChevronLeft, ChevronRight, Users, Satellite, ChevronDown, Maximize, Share, UserPlus } from 'lucide-react';
import MissionControl from '../../launch-event-hub/components/MonitorControl';

const HeroSectionWithMonitor = () => {
  
  return (
    <MissionControl />
  );
};

export default HeroSectionWithMonitor;
// Google Analytics utility functions

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Predefined events for common actions
export const trackConnectSpotify = () => {
  event({
    action: 'click_connect_spotify',
    category: 'engagement',
    label: 'Connect Button',
  });
};

export const trackDownloadCSV = (playlistCount: number) => {
  event({
    action: 'download_csv',
    category: 'conversion',
    label: 'CSV Export',
    value: playlistCount,
  });
};

export const trackSelectPlaylist = (playlistId: string) => {
  event({
    action: 'select_playlist',
    category: 'engagement',
    label: playlistId,
  });
};

export const trackSearchPlaylist = (searchQuery: string) => {
  event({
    action: 'search_playlist',
    category: 'engagement',
    label: searchQuery,
  });
};

export const trackLanguageSwitch = (newLanguage: string) => {
  event({
    action: 'switch_language',
    category: 'engagement',
    label: newLanguage,
  });
};

export const trackViewTutorial = () => {
  event({
    action: 'view_tutorial',
    category: 'engagement',
    label: 'Tutorial Page',
  });
};


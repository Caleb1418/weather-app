
export interface WeatherCardProps {
    location: string;
    time: string;
    highTemp: number;
    lowTemp: number;
    icon: string;
    onPress?: () => void;
  }




 export interface HourlyWeatherProps {
    latitude: number;
    longitude: number;
  }
  
 export interface HourlyWeatherData {
    dt: number; 
    main: {
      temp: number; 
    };
    weather: {
      icon: string; 
      description: string;
    }[];
  }
  
 export interface SearchBarProps {
    showSearch: boolean;
    setShowSearch: (show: boolean) => void;
    onLocationSelect: (location: { name: string; lat: number; lon: number }) => void;
  }
  

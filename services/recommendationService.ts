import { WeatherData, OutfitRecommendation } from '../types';

// FR-04: Rule-based AI Logic
export const getOutfitRecommendation = (weather: WeatherData): OutfitRecommendation => {
  const { temperature, precipitationProb } = weather;

  // Logic defined in Spec 3 / FR-04
  if (temperature < 15) {
    return {
      text: "天氣寒冷，建議穿著羽絨衣並圍上圍巾。",
      iconType: 'cold'
    };
  } 
  
  if (temperature >= 15 && temperature <= 22) {
    return {
      text: "氣候舒適偏涼，建議穿著長袖上衣搭配薄外套。",
      iconType: 'cool'
    };
  }

  // Temp > 22
  if (temperature > 22) {
    if (precipitationProb > 50) {
      return {
        text: "天氣悶熱且有雨，建議穿著透氣短袖並攜帶雨具。",
        iconType: 'hot-rain'
      };
    } else {
      return {
        text: "天氣晴朗炎熱，請穿著短袖並注意防曬。",
        iconType: 'hot-sun'
      };
    }
  }

  // Fallback
  return {
    text: "天氣變化多端，請隨身攜帶外套。",
    iconType: 'cool'
  };
};
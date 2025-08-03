function getCurrentSeason(): "WINTER" | "SPRING" | "SUMMER" | "FALL" {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec

  if (month >= 0 && month <= 2) return "WINTER";
  if (month >= 3 && month <= 5) return "SPRING";
  if (month >= 6 && month <= 8) return "SUMMER";
  return "FALL";
}

function getCurrentSeasonYear() {
  const date = new Date();
  console.log(date.getFullYear(), getCurrentSeason());

  return {
    year: date.getFullYear(),
    season: getCurrentSeason(),
  };
}

getCurrentSeasonYear();

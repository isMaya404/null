import { MediaSeason } from "../anilist/gql/graphql";

export const getCurrentSeason = (): MediaSeason => {
    const month = new Date().getMonth(); // 0 = Jan

    if (month < 3) return MediaSeason.Winter;
    if (month < 6) return MediaSeason.Spring;
    if (month < 9) return MediaSeason.Summer;

    return MediaSeason.Fall;
};

export const getCurrentSeasonYear = (): string => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return getCurrentSeason() + currentYear;
};

export const getNextSeason = (): { season: MediaSeason; year: number } => {
    const month = new Date().getMonth(); // 0 = Jan
    const year = new Date().getFullYear();

    if (month < 3) return { season: MediaSeason.Spring, year };
    if (month < 6) return { season: MediaSeason.Summer, year };
    if (month < 9) return { season: MediaSeason.Fall, year };

    return { season: MediaSeason.Winter, year: year + 1 };
};

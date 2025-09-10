import { MediaSeason } from "../anilist/gql/graphql";

export const getSeasonFromMonthNumber = (monthNumber: number): MediaSeason => {
    if (monthNumber < 4) return MediaSeason.Winter;
    if (monthNumber < 7) return MediaSeason.Spring;
    if (monthNumber < 10) return MediaSeason.Summer;

    return MediaSeason.Fall;
};

export const getCurrentSeason = (): MediaSeason => {
    const month = new Date().getMonth() + 1;

    if (month < 4) return MediaSeason.Winter;
    if (month < 7) return MediaSeason.Spring;
    if (month < 10) return MediaSeason.Summer;

    return MediaSeason.Fall;
};

export const getCurrentSeasonYear = (): string => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return getCurrentSeason() + currentYear;
};

export const getNextSeason = (): MediaSeason => {
    const month = new Date().getMonth(); // 0 = Jan

    if (month < 4) return MediaSeason.Spring;
    if (month < 7) return MediaSeason.Summer;
    if (month < 10) return MediaSeason.Fall;

    return MediaSeason.Winter;
};

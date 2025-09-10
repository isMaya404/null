import { describe, it, expect, afterEach } from "vitest";
import mockdate from "mockdate";
import { formatAiringDateTime } from "@/components/card/CardPopup";
import type { Media } from "@/types/media";

afterEach(() => {
    mockdate.reset();
});

describe("formatAiringDateTime", () => {
    it("returns startSeason - endSeason for media/s that already aired and aired for multiple seasons within the same year", () => {
        mockdate.set("2025-09-01");

        const media: Media = {
            startDate: { year: 2014, month: 1 },
            endDate: { year: 2014, month: 10 },
        } as Media;

        const result = formatAiringDateTime(media);

        expect(result).toBe("Winter - Fall 2014");
    });

    it("returns startYear - endYear for media/s that already aired and aired for multiple years", () => {
        mockdate.set("2025-09-01");

        const media: Media = {
            startDate: { year: 2014, month: 9 },
            endDate: { year: 2017, month: 10 },
        } as Media;

        const result = formatAiringDateTime(media);

        expect(result).toBe("2014 - 2017");
    });

    it("returns countdown in days for currently airing episode", () => {
        mockdate.set("2025-09-01");

        const media: Media = {
            startDate: { year: 2025, month: 9 },
            endDate: { year: 2025, month: 10 },
            nextAiringEpisode: { episode: 7, timeUntilAiring: 8 * 86400 },
            // Add other required fields if Media type demands
        } as Media;

        const result = formatAiringDateTime(media);

        expect(result).toBe("Ep 7 airing in 8 days");
    });

    it("returns upcoming season format", () => {
        mockdate.set("2025-08-01");
        const media: Media = {
            startDate: { year: 2025, month: 12 },
        } as Media;

        const result = formatAiringDateTime(media);
        expect(result).toBe("Fall 2025");
    });

    it("returns upcoming season format 2", () => {
        mockdate.set("2025-08-01");
        const media: Media = {
            startDate: { year: 2026, month: 1 },
        } as Media;

        const result = formatAiringDateTime(media);
        expect(result).toBe("Winter 2026");
    });
});

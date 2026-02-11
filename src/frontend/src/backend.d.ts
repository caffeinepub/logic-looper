import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScoreEntry {
    principal: Principal;
    puzzleType: string;
    score: bigint;
    timestamp: Time;
    timeTaken: bigint;
}
export type Time = bigint;
export interface backendInterface {
    getLeaderboard(date: string): Promise<Array<ScoreEntry>>;
    submitScore(date: string, score: bigint, timeTaken: bigint, puzzleType: string): Promise<void>;
}

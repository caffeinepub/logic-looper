import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

actor {
  type ScoreEntry = {
    principal : Principal;
    score : Nat;
    timeTaken : Int;
    timestamp : Time.Time;
    puzzleType : Text;
  };

  module ScoreEntry {
    // Default: compare by score descending, then timeTaken ascending
    public func compareByScoreAndTime(a : ScoreEntry, b : ScoreEntry) : Order.Order {
      if (a.score > b.score) { return #less };
      if (a.score < b.score) { return #greater };
      if (a.timeTaken < b.timeTaken) { return #less };
      if (a.timeTaken > b.timeTaken) { return #greater };
      #equal;
    };
  };

  let dailyLeaderboards = Map.empty<Text, [ScoreEntry]>();

  public shared ({ caller }) func submitScore(date : Text, score : Nat, timeTaken : Int, puzzleType : Text) : async () {
    let entry : ScoreEntry = {
      principal = caller;
      score;
      timeTaken;
      timestamp = Time.now();
      puzzleType;
    };

    switch (dailyLeaderboards.get(date)) {
      case (?entries) {
        let allEntries = entries.concat([entry]);
        let sortedEntries = allEntries.sort(ScoreEntry.compareByScoreAndTime);
        dailyLeaderboards.add(date, sortedEntries.sliceToArray(0, Nat.min(sortedEntries.size(), 100)));
      };
      case (null) {
        dailyLeaderboards.add(date, [entry]);
      };
    };
  };

  public query ({ caller }) func getLeaderboard(date : Text) : async [ScoreEntry] {
    switch (dailyLeaderboards.get(date)) {
      case (?entries) { entries };
      case (null) { [] };
    };
  };
};

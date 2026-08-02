"use client";

import { useEffect, useState } from "react";
import { mockNatureTours, mockActivityTours } from "@/data/Mocktours";
import ActivityLikedCard from "./ActivityLikedCard";
import ActivityJoinedCard from "./ActivityJoinedCard";
import ActivityEmptyState from "./Activityemptystate";
import ActivityFeedback from "./Activityfeedback";
import { UserActivitiesService } from "@/services/userActivities.service";
import { IJoinedActivity, ILikedActivity } from "@/types/Activity";

type TabType = "liked" | "joined";

// TODO: backend hazır olanda bu mock dataları API call ilə əvəz et
// const likedTours = mockNatureTours;
const joinedTours = mockActivityTours;

const ActivityTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("liked");
  const [likedTours, setLikedTours] = useState<ILikedActivity[]>([]);
  const [joinedTours, setJoinedTours] = useState<IJoinedActivity[]>([]);
  const getUserLikedTours = async () => {
    try {
      const response = await UserActivitiesService.getLikedTours();

      console.log("Liked tours response:", response.data);
      return response.data; // Assuming the API returns an array of liked tours
    }
    catch (error) {
      console.error("Error fetching liked tours:", error);
      return []; // Return an empty array in case of an error
    }
  }

  const getUserJoinedTours = async () => {
    try {
      const response = await UserActivitiesService.getJoinedTours();
      return response.data; // Assuming the API returns an array of joined tours
    }
    catch (error) {
      console.error("Error fetching joined tours:", error);
      return []; // Return an empty array in case of an error
    }
  }

  useEffect(() => {
    getUserLikedTours().then((data) => {
      setLikedTours(data.data);
    }).catch((error) => {
      console.error("Error setting liked tours:", error);
    }
    )
    getUserJoinedTours().then((data) => {
      setJoinedTours(data.data);
    }).catch((error) => {
      console.error("Error setting joined tours:", error);
    }
    )

  }, [])
  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("liked")}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${activeTab === "liked"
            ? "border-transparent bg-[#0B3E35] text-white"
            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
            }`}
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
        >
          Bəyəndiyim Fəaliyyətlər
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("joined")}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${activeTab === "joined"
            ? "border-transparent bg-[#0B3E35] text-white"
            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
            }`}
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
        >
          Qatıldığım Fəaliyyətlər
        </button>
      </div>

      {/* Bəyəndiyim — mobile: 1 col → sm: 2 col → md: 3 col */}
      {activeTab === "liked" && (
        <div className="mt-6">
          {likedTours.length === 0 ? (
            <ActivityEmptyState title="Bəyəndiyin Fəaliyyətlər yoxdur" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {likedTours.map((tour) => (
                <ActivityLikedCard key={tour.id} data={tour} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Qatıldığım — mobile: 1 col → md: 2 col */}
      {activeTab === "joined" && (
        <div className="mt-6">
          {joinedTours.length === 0 ? (
            <ActivityEmptyState title="Qatıldığınız Fəaliyyətlər yoxdur" />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {joinedTours.map((tour) => (
                  <ActivityJoinedCard key={tour.id} tour={tour} />
                ))}
              </div>
              <ActivityFeedback />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityTabs;
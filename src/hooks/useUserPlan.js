
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";
export default function useUserPlan() {
  const { userId } = useAuth();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setPlan(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bynd-backend.onrender.com/userplan`, {
          params: { user_id: userId },
          withCredentials: true,
        });

        if (!cancelled) {
          setPlan(res.data.subscription);
        }
      } catch (e) {
        if (!cancelled) {
          console.error("[useUserPlan] Error:", e);
          setError(e);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPlan();

    // cleanup (important)
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const isFree =
    plan?.plan_type === "free";

  const isTrial =
    plan?.plan_type === "pro_trial" && plan?.is_trial_active;

  const isPro =
    plan?.plan_type === "pro_subscription" &&
    plan?.is_subscription_active;

  return {
    plan,
    loading,
    error,
    isFree,
    isTrial,
    isPro,
  };
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

export default function useUserPlan() {
  const { userId } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPlan = async () => {
      try {
        const res = await axios.get("https://bynd-backend.onrender.com/userplan", {
          params: { user_id: userId },
          withCredentials: true
        });

        console.log('[useUserPlan] API Response:', res.data.subscription);
        setPlan(res.data.subscription);
      } catch (e) {
        console.error('[useUserPlan]  Error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [userId]);

  const isFree = plan?.plan_type === "free";
  const isTrial = plan?.plan_type === "pro_trial" && plan?.is_trial_active;
  const isPro = plan?.plan_type === "pro_subscription" && plan?.is_subscription_active;

  return { plan, loading, isFree, isTrial, isPro };
}
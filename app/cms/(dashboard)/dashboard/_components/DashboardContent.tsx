"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CircleUserRound,
  FolderKanban,
  Mail,
} from "lucide-react";

import { apiRequest, ApiError } from "@/lib/api";
import { DashboardMetricCard } from "@/app/cms/(dashboard)/_components/DashboardMetricCard";
import { RecentMessages } from "./RecentMessages";
import { QuickActions } from "./QuickActions";

interface DashboardMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  received_at: string;
  is_read: boolean;
  is_archived: boolean;
}

interface DashboardResponse {
  total_projects: number;
  total_views: number;
  total_messages: number;
  last_updated: string | null;
  recent_messages: DashboardMessage[];
}

export function DashboardContent() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const result = await apiRequest<DashboardResponse>("/api/dashboard");

        setData(result);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Unable to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-5 text-sm text-text-secondary">
        Loading dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-6 py-5 text-sm text-red-400">
        {error || "Dashboard data is unavailable"}
      </div>
    );
  }

  const lastUpdated = data.last_updated ? new Date(data.last_updated) : null;

  const metrics = [
    {
      label: "Total Projects",
      value: data.total_projects.toLocaleString("en-US"),
      icon: FolderKanban,
    },
    {
      label: "Total Views",
      value: data.total_views.toLocaleString("en-US"),
      icon: CircleUserRound,
    },
    {
      label: "Messages",
      value: data.total_messages.toLocaleString("en-US"),
      icon: Mail,
    },
    {
      label: "Last Updated",
      value: lastUpdated
        ? lastUpdated.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
      detail: lastUpdated
        ? lastUpdated.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        : undefined,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-4 px-6 py-5">
      <section
        className="grid grid-cols-4 gap-4"
        aria-label="Portfolio summary"
      >
        {metrics.map((metric) => (
          <DashboardMetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid grid-cols-[0.76fr_1.34fr] gap-4">
        <RecentMessages messages={data.recent_messages} />
        <QuickActions />
      </section>
    </div>
  );
}

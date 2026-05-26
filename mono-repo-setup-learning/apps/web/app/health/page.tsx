"use client"
import {trpc} from "@/trpc/trpc"

export default function Health() {

    const healthQuery = trpc.health.useQuery();

    console.log(healthQuery)
    
  return (
    <div>
      <h1>Health Check</h1>
      <p>All systems are operational.</p>
    </div>
  );
}
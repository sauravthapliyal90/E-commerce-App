import React from 'react'
import {useQuery} from "@tanstack/react-query"
import {orderApi} from "../lib/api.js"
import { useUser } from '@clerk/react';

function DashboardPage() {
 const { isSignedIn, user } = useUser();

console.log(isSignedIn);
console.log(user);
  const {data, isLoading} = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll
  })
  console.log("order:",data)
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage
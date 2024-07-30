"use client"

import { admin } from "@/actions/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { useCurrentRole } from "@/hooks/use-current-role"
import { toast } from "sonner"


export default function AdminPage() {
  function onServerActionClick() {
    admin()
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        }

        if (data.success) {
          toast.success(data.success)
        }
      })
  }

  function onApiRouteClick() {
    fetch('/api/admin')
      .then((response) => {
        if (response.ok) {
          toast.success('Allowed API Route!')
        } else {
          toast.error('Forbidden API Route!')
        }
      })
  }
  return (
    <div className="w-full p-1 rounded-xl bg-blue-500 shadow-md">
      <div className="text-2xl font-semibold text-center mb-1">
      <RoleGate
        allowedRole={"ADMIN"}
      >
        <FormSuccess message="You are allowed to see this make an event!" />
      </RoleGate>
       
      </div>
      
    </div>
  )
}

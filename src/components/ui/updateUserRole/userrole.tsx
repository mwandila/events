import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const ChooseRole = () => {
  const [role, setRole] = useState('')
  const router = useRouter()
  const { data: session, update } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Call your API to update the user's role in the database
    const response = await fetch('/api/update-user-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, role }),
    })

    if (response.ok) {
      // Update the session with the new role
      await update({ ...session, user: { ...session.user, role } })

      // Redirect to the appropriate dashboard
      switch (role) {
        case 'SUPERADMIN':
          router.push('/superadmin/dashboard')
          break
        case 'ADMIN':
          router.push('/admin/dashboard')
          break
        case 'ORGANIZER':
          router.push('/organizer/dashboard')
          break
        case 'VENDOR':
          router.push('/vendor/dashboard')
          break
        case 'USER':
          router.push('/user/dashboard')
          break
        default:
          router.push('/')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select a role</option>
        <option value="SUPERADMIN">Super Admin</option>
        <option value="ADMIN">Admin</option>
        <option value="ORGANIZER">Organizer</option>
        <option value="VENDOR">Vendor</option>
        <option value="USER">User</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ChooseRole
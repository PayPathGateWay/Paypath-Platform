import { useAuthContext } from '@/Context/Auth/AuthProvider';

export default function NavBar() {
    const { state } = useAuthContext();

  return (
    <div>
        TokeN
    </div>
  )
}

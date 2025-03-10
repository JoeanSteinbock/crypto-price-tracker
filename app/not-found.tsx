import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been removed. Please check the URL is correct, or return to the homepage.
      </p>
      <Button asChild>
        <Link href="/" className="flex gap-2 items-center">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </Button>
    </div>
  )
} 
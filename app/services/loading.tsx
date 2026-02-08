import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Hero Section Skeleton */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
        </section>

        {/* Tabs Skeleton */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Skeleton className="h-12 w-full mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

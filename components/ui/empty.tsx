import { Frown, SearchX } from "lucide-react";

interface EmptyPageProps {
   title: string;
   description: string;
}

export default function EmptyPage({ title, description }: EmptyPageProps) {
   return (
      <div className="text-center py-8">
         <Frown className="h-6 w-6 text-gray-200 mx-auto mb-4 animate-pulse" />
         <div className="space-y-2">
            <p className="text-gray-500">{title}</p>
            <p className="text-sm text-gray-400">{description}</p>
         </div>
      </div>
   );
}

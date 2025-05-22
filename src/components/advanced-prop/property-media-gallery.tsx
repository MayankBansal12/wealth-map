import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ImageIcon, Camera } from 'lucide-react'

interface PropertyMediaGalleryProps {
  propertyData: any
}

export function PropertyMediaGallery({ propertyData }: PropertyMediaGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    propertyData.originalPhotos && propertyData.originalPhotos.length > 0
      ? propertyData.originalPhotos[0].mixedSources.jpeg[3].url
      : null
  )

  // Get all photos from the property data
  const photos = propertyData.originalPhotos || []
  const photoCount = propertyData.photoCount || 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Property Media
          </CardTitle>
          <CardDescription className="text-sm font-medium">
            {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedImage ? (
          <div className="relative w-full h-[400px] overflow-hidden rounded-md bg-muted">
            <img
              src={selectedImage || '/placeholder.svg'}
              alt="Property"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg?height=400&width=800'
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[400px] bg-muted rounded-md">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No images available</p>
            </div>
          </div>
        )}

        {photos.length > 0 && (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-4">
              {photos.map((photo: any, index: number) => (
                <div
                  key={index}
                  className={`relative shrink-0 cursor-pointer rounded-md overflow-hidden h-20 w-32 border-2 transition-all ${
                    selectedImage === photo.mixedSources.jpeg[3].url
                      ? 'border-primary'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedImage(photo.mixedSources.jpeg[3].url)}
                >
                  <img
                    src={photo.mixedSources.jpeg[0].url || '/placeholder.svg'}
                    alt={`Property ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg?height=80&width=120'
                    }}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {photos.length === 0 && photoCount > 0 && (
          <div className="p-4 text-center text-muted-foreground bg-muted/50 rounded-md">
            {photoCount} photos available but unable to load thumbnails.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

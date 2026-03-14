interface Props {
  image: string
}

export default function ProductGallery({ image }: Props) {
  return (
    <div className="section-panel flex w-full justify-center rounded-[2rem] p-6 sm:p-8">
      <div className="w-full rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(241,245,249,0.85),rgba(255,255,255,0.96))] p-4">
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Gallery preview</span>
          <span>High-resolution product image</span>
        </div>
      <img
        src={image}
        alt="Product image"
        className="aspect-square w-full max-w-[500px] object-contain"
        onError={(event) => {
          event.currentTarget.src = "https://placehold.co/600x600?text=Product"
        }}
      />
      </div>
    </div>
  )
}

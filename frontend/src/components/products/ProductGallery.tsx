interface Props {
  image: string
}

export default function ProductGallery({ image }: Props) {

  return (

    <div className="flex w-full justify-center rounded-2xl border bg-background p-6">

      <img
        src={image}
        className="aspect-square w-full max-w-[500px] object-contain"
        onError={(event) => {
          event.currentTarget.src = "https://placehold.co/600x600?text=Product"
        }}
      />

    </div>

  )

}

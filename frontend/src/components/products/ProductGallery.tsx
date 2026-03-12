interface Props {
  image: string
}

export default function ProductGallery({ image }: Props) {

  return (

    <div className="space-y-4">

      <img
        src={image}
        className="w-full rounded-xl"
      />

    </div>

  )

}
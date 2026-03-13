interface Props {
  image: string
}

export default function ProductGallery({ image }: Props) {

  return (

    <div className="w-full flex justify-center">

      <img
        src={image}
        className="w-[500px] h-[500px] object-contain"
      />

    </div>

  )

}
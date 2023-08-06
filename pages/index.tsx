import { useGetProductsQuery } from "@/redux/services/products"

export default function Home() {
  const { data, error, isLoading }: any = useGetProductsQuery('')
    console.log({ data, error, isLoading })
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between`}
    >
      HOME
    </main>
  )
}

import { useGetProductsQuery } from "@/redux/services/products"
import { useGetCartItemsQuery } from "@/redux/services/cart"
import { useGetAllColorsQuery } from "@/redux/services/color"
import Link from "next/link"

export default function Home() {
  const { data, error, isLoading }: any = useGetProductsQuery('')
  const { data: cartData , error: cartError, isLoading: isCartLoading }: any = useGetCartItemsQuery('', { skip: isLoading || error?.status === 401 })
  const { data: colors, error: colorError, isLoading: isColorLoading }: any = useGetAllColorsQuery('', { skip: isLoading || error?.status === 401 })

  return (
    <main
      className={`flex min-h-screen flex-col gap-0 items-center justify-between`}
    >
      <div className="flex flex-col">
        <span>Products</span>
        { data?.map((d: any, idx: any) => <span key={idx}>{ d?.name ?? '' }</span>) }
        <span>Carts</span>
        { cartData?.map((d: any, idx: any) => <span key={idx}>{ d?.name ?? '' }</span>) }
        <span>Colors</span>
        { colors?.map((d: any, idx: any) => <span key={idx}>{ d?.name ?? '' }</span>) }
        <Link href={'/products'}><button>Products</button></Link>
      </div>
    </main>
  )
}

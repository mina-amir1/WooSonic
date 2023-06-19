import WishList from "~/components/WishList";
import { Site_Title } from "~/config";

export const meta = () => {
  return {
    title: `My Wishtlist | ${Site_Title}`
  }
}

export default function wishlist() {
  return (
    <div>
      <WishList />
    </div>
  )
}